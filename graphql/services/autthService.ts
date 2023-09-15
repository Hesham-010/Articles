import { models } from "../../database/database";
import bcrypt from "bcryptjs";
import createToken from "../../utils/createToken";
import sendEmail from "../../utils/sendEmail";
import crypto from "crypto";
import { forgetPasswordValidation, loginValidation, resetPasswordValidation, signUpValidation } from "../schemaValidation/authSchemaValidation";

export const signUp = async (root, { singUpData }) => {
            signUpValidation (singUpData)
            singUpData.password = await bcrypt.hash(singUpData.password, 12);
            const user = await models.User.create(singUpData);
            const token = createToken(user.id);
            return token;
}

export const login = async (root, args) => {
            loginValidation (args.loginData)
            const user = await models.User.findOne({ where: { email: args.loginData.email } });
            if (!user || !(await bcrypt.compare(args.loginData.password, user.password))) {
                return new Error("Invalid Email or Password");
            }
            const token = createToken(user.id);

            return token;
}

export const forgetPassword = async (root, { email }) => {
            forgetPasswordValidation ({email})
            // 1- get user based on email
            const user = await models.User.findOne({
                where: { email: email },
            });
            if (!user) {
                throw new Error(`There is no user with this email ${email}`);
            }

            // 2- create hash Reset Code and saved in datebase
            const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedResetCode = crypto
                .createHash("sha256")
                .update(resetCode)
                .digest("hex");

            user.passwordResetCode = hashedResetCode;
            user.passwordResetExpiration = Date.now() + 10 * (60 * 1000);
            user.passwordResetVerified = false;
            await user.save();

            // 3- send the reset code via email
            const message = `Hi ${user.name}, \n ${resetCode} \n Enter this code to complete the reset.`;
            try {
                await sendEmail({
                    email: user.email,
                    subject: "your reset code valid for 10 min ",
                    message: message,
                });
            } catch (err) {
                user.passwordResetCode = undefined;
                user.passwordResetExpiration = undefined;
                user.passwordResetVerified = undefined;
                await user.save();
                throw new Error(`There is an error in sending email`);
            }
            return "Enter Reset Code From Your Email";
}

export const verifyResetCode = async (root, { resetCode }) => {
            const hashedResetCode = crypto
                .createHash("sha256")
                .update(resetCode)
                .digest("hex");

            // 1- get user based on passwordResetCode
            const user = await models.User.findOne({
                where: {
                    passwordResetCode: hashedResetCode,
                },
            });
            if (!user) {
                throw new Error("Invalid Reset Code");
            }
            if (user.passwordResetExpiration > Date.now()) {
                user.passwordResetVerified = true;
                await user.save();
            } else {
                throw new Error("Invalid Reset Code");
            }
            return "Reset Code is Verified";
}

export const resetPassword = async (root, args) => {
            resetPasswordValidation (args)
            const user = await models.User.findOne({
                where: { email: args.email },
            });
            if (!user) {
                throw new Error(`There is no user with this email ${args.email}`);
            }
            if (!user.passwordResetVerified) {
                throw new Error("This reset code is not verified ");
            }
            const newPassword = await bcrypt.hash(args.newPassword, 12);
            user.password = newPassword;
            user.passwordResetCode = undefined;
            user.passwordResetExpiration = undefined;
            user.passwordResetVerified = undefined;
            await user.save();
            return "Your Password is changed"      
}
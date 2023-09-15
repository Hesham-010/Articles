import { models } from "../../database/database";
import bcrypt from "bcryptjs";
import{changeLoggedUserPasswordValidation, createUserValidation, updateLoggedUserValidation, updateUserValidation} from '../schemaValidation/userSchemaValidation'

export const usersGet = async (_, __, context) => {
      if (context.role === "admin") {
        const document = await models.User.findAll();
        return document;
      } else {
        throw new Error("This route belongsTo admin");
      }
}
    
export const userGetById = async (root, args, context) => {
      context.role = "user";
      if (context.role === "admin") {
        const user = await models.User.findByPk(args.id);
        return user;
      } else {
        throw new Error("This route belongsTo admin");
      }
}

export const userCreate = async (root, {userData}, context) => {
      createUserValidation(userData)
      if (context.role === "admin") {
        userData.password = await bcrypt.hash(userData.password, 12);
        const document = await models.User.create(userData);
        return document;
      } else {
        throw new Error("This route belongsTo admin");
      }
}
    
export const userUpdate = async (root, args, context) => {
      updateUserValidation (args.userData)
      if (context.role === "admin") {
        const document = await models.User.update(
          {
            name: args.userData.name,
            email: args.userData.email,
            password:args.userData.password,
            phone: args.userData.phone,
            address: args.userData.address,
          },
          {
            where: { id: args.userData.id },
            returning: true,
            plain: true,
          }
        );
        return document[1];
      } else {
        throw new Error("This route belongsTo admin");
      }
}

export const userDelete = async (root, { id }, context) => {
      if (context.role === "admin") {
        await models.User.destroy({ where: { id } });
        return "Success";
      } else {
        throw new Error("This route belongsTo admin");
      }
}

// Logged User
export const getMyData = async (_, __, context) => {
      const user = await models.User.findByPk(context.id);
      if (!user) {
        return new Error("There is no user for this id");
      }
      return user;
}

export const updateMyData = async (root, args, context) => {
      updateLoggedUserValidation (args.userData)
      const user = await models.User.update(
        {
          name: args.userData.name,
          email: args.userData.email,
          phone: args.userData.phone,
          address: args.userData.address,
        },
        {
          where: { id: context.id },
          returning: true,
          plain: true,
        }
      );
      return user[1];
}

export const deleteMe = async (root, args, context) => {
      await models.User.destroy({ where: { id: context.id } });
      return "Success";
}

export const changeMyPassword = async (root, { password }, context) => {
      changeLoggedUserPasswordValidation(password);
      const newPassword = await bcrypt.hash(password, 12);
      await models.User.update(
        {
          password: newPassword,
          passwordChangedAt: Date.now(),
        },
        {
          where: { id: context.id },
          returning: true,
          plain: true,
        }
      );
      return "Success";
}
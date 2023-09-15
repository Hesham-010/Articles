import { signUp,login,forgetPassword, verifyResetCode, resetPassword } from "../services/autthService";

const authResolver = {
    Mutation: {
        signUp,
        login,
        forgetPassword,
        verifyResetCode,
        resetPassword
  },
};
export default authResolver;

import userRoute from "./userRoute";
import articleRoute from "./articleRoute";
import categoryRoute from "./categoryRoute";
import commentRoute from "./commentRoute";
import authRoute from "./authRoute";


export const routes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/articles", articleRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/comments", commentRoute);
};

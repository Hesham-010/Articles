const userRoute = require("./userRoute");
const articleRoute = require("./articleRoute");
const categoryRoute = require("./categoryRoute");
const commentRoute = require("./commentRoute");
const authRoute = require("./authRoute");

exports.routes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/articles", articleRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/comments", commentRoute);
};

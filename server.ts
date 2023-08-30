import express from "express";
import { sequelize } from "./configDb/database";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import { routes } from "./routes/index";
import { applyRelations } from "./configDb/applyRelations";

// Models
import User from "./models/userModel"
import Comment from "./models/commentModel"
import Category from "./models/categoryModel"
import Article from "./models/articleModel"

const models = [User, Comment, Category, Article]

for (let model of models) {
   model();
}
// User()
// Comment()
// Category()
// Article()

const app = express();
app.use(express.json({ limit: "10kb" }));

// Routes
routes(app);

const PORT = process.env.PORT;

// Sequielize Relations
applyRelations(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Successfull Connection");
    app.listen(PORT, () => {
      console.log(`App Running on port ${PORT}....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

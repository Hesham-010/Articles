import { express } from "express";
import  sequelize  from "./configDb/database";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import { routes } from "./routes/index";
import { applyRelations } from "./configDb/applyRelations";

// Models
const modelsModefiers = [
  require("./models/userModel"),
  require("./models/commentModel"),
  require("./models/categoryModel"),
  require("./models/articleModel"),
];
for (let model of modelsModefiers) {
  model(sequelize);
}

const app = express();
app.use(express.json({ limit: "10kb" }));

// Routes
routes(app);

const PORT = process.env.PORT

// Sequielize Relations
applyRelations(sequelize)
  sequelize.sync()
  .then(() => {
    console.log("Successfull Connection");
    app.listen(PORT, () => {
      console.log(`App Running on port ${PORT}....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const sequelize = require("./configDb/database");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const { routes } = require("./routes/index");
const { applyRelations } = require("./configDb/applyRelations");

// Models
const modelsModefiers = [
  require("./models/userModel"),
  require("./models/commentModel"),
  require("./models/categoryModel"),
  require("./models/articleModel"),
];
for (model of modelsModefiers) {
  model(sequelize);
}

const app = express();
app.use(express.json({ limit: "10kb" }));

// Routes
routes(app);

// Sequielize Relations
applyRelations(sequelize)
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

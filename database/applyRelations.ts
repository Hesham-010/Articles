export const applyRelations = (sequelize) => {
  const { User, Comment, Category, Article } = sequelize.models;

  User.hasMany(Article);
  Article.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

  User.hasMany(Comment);
  Comment.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

  Article.hasMany(Comment);
  Comment.belongsTo(Article, {
    constraints: true,
    onDelete: "CASCADE",
  });

  Category.hasMany(Article);
  Article.belongsTo(Category, {
    constraints: true,
    onDelete: "CASCADE",
  });
}

export default {applyRelations}

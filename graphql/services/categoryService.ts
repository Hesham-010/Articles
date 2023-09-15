import { models } from "../../database/database";
import { createCategoryValidation,updateCategoryValidation } from "../schemaValidation/categorySchemaValidation";

export const categoriesGet = async (root, args, context) => {
      const category = await models.Category.findAll();
         return category;
}
    
export const categoryGetById = async (root, args, context) => {
      const category = await models.Category.findByPk(args.id);
      if (!category) {
        throw new Error(`That is no category for this id ${args.id}`);
      }
        return category;
}
    
export const categoryCreate = async (root, args, context) => {
      createCategoryValidation (args.categoryData)
      if (context.role === 'admin') {
      const category = await models.Category.create(args.categoryData);
        return category;
        } else {
         throw new Error("can't access this route")
      }
}
    
export const categoryUpdate = async (root, args, context) => {
      updateCategoryValidation (args.categoryData)
      if (context.role === 'admin') {
      const category = await models.Category.update(
        {
          title: args.categoryData.title,
        },
        {
          where: { id: args.categoryData.id },
          returning: true,
          plain: true,
        }
      );
        return category[1];
        } else {
         throw new Error("can't access this route")
      }
}
    
export const categoryDelete = async (root, { id }, context) => {
      if (context.role === 'admin') {
      await models.Category.destroy({ where: { id } });
      return "Success";
       } else {
         throw new Error("can't access this route")
      }
    }
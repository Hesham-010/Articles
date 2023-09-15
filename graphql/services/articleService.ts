import { models } from "../../database/database";
import {createArticleValidation, updateArticleValidation} from '../schemaValidation/articleSchemaValidation'

let roles = ['admin','writer']
export const articleGetById = async (root, args, context) => {
      if (roles.includes(context.role) || context.role === 'reader') {
        console.log(context.role)
        const article = await models.Article.findByPk(args.id);
        return article;
      } else {
         throw new Error("can't access this route")
      }
}

export const articleGetByUserIdOrCategoryId = async (root, args, context) => {
      if (roles.includes(context.role) || context.role === 'reader') {
        let filter = {};
        if (args.UserId) filter = { UserId: args.UserId };
        if (args.CategoryId) filter = { CategoryId: args.CategoryId };
        const document = await models.Article.findAll({ where: filter });
        return document;
      } else {
         throw new Error("can't access this route")
      }
}

export const articleCreate = async (root, args, context) => {
      createArticleValidation (args.articleData)
      if (roles.includes(context.role)) {
        args.articleData.UserId = context.id
        const document = await models.Article.create(args.articleData);
        return document;
      } else {
         throw new Error("can't access this route")
      }
}

export const articleUpdate = async (root, args, context) => {
      updateArticleValidation (args.articleData)
      if (!roles.includes(context.role)) {
      throw new Error("can't access this route")
    }
        const document = await models.Article.update(
          {
            title: args.articleData.title,
            content: args.articleData.content,
          },
          {
            where: { id: args.articleData.id, UserId: context.id },
            returning: true,
            plain: true,
          }
        );
      return document[1];
}

export const articleDelete = async (root, { id }, context) => {
      if (!roles.includes(context.role)) {
      throw new Error("can't access this route")
    }
      const article = await models.Article.findByPk(id);
      if (article.UserId === context.id) {
        article.destroy();
        return "Success";
      } else {
        return "This article is not about you";
      }
}
import { ArticlesAPI } from './mock'

export const getArticles = payload => ArticlesAPI.getArticles(payload)
export const createArticle = payload => ArticlesAPI.createArticle(payload)
export const deleteArticles = payload => ArticlesAPI.deleteArticles(payload)
export const modifyArticle = ({ id, payload }) => ArticlesAPI.modifyArticle(id, payload)

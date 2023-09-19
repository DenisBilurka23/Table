import { createAsyncThunk } from '@reduxjs/toolkit'
import { createArticle, getArticles, deleteArticles, modifyArticle } from '../../api/articles'

const thunkCreator = (name, request) =>
	createAsyncThunk(`articles/${name}`, async (payload, { rejectWithValue }) => {
		try {
			const response = await request(payload)
			return response.data
		} catch (e) {
			console.log('error: ', e)
			return rejectWithValue(e.response.data)
		}
	})

export const getArticlesThunk = thunkCreator('getArticles', getArticles)
export const createArticleThunk = thunkCreator('createArticle', createArticle)
export const deleteArticlesThunk = thunkCreator('deleteArticles', deleteArticles)
export const modifyArticlesThunk = thunkCreator('modifyArticle', modifyArticle)

import { createSlice } from '@reduxjs/toolkit'
import { createArticleThunk, deleteArticlesThunk, getArticlesThunk, modifyArticlesThunk } from '../thunks/articlesThunk'

const articlesSlice = createSlice({
	name: 'articles',
	initialState: {
		loading: false,
		error: null,
		items: null,
		totalItems: null
	},
	extraReducers: builder => {
		builder
			.addCase(getArticlesThunk.pending, state => {
				state.loading = true
			})
			.addCase(getArticlesThunk.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload.items
				state.totalItems = action.payload.totalItems
			})
			.addCase(getArticlesThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(createArticleThunk.pending, state => {
				state.loading = true
			})
			.addCase(createArticleThunk.fulfilled, (state, action) => {
				state.loading = false
			})
			.addCase(createArticleThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteArticlesThunk.pending, state => {
				state.loading = true
			})
			.addCase(deleteArticlesThunk.fulfilled, state => {
				state.loading = false
			})
			.addCase(deleteArticlesThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(modifyArticlesThunk.pending, state => {
				state.loading = true
			})
			.addCase(modifyArticlesThunk.fulfilled, state => {
				state.loading = false
			})
			.addCase(modifyArticlesThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default articlesSlice.reducer

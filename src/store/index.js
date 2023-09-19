import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import articlesSlice from './slices/articlesSlice'
import { logger } from 'redux-logger/src'

const rootReducer = combineReducers({
	auth: authSlice,
	articles: articlesSlice
})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export default store

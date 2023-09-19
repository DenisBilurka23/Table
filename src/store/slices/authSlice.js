import { createSlice } from '@reduxjs/toolkit'
import { signInThunk, signOutThunk, signUpThunk } from '../thunks/authThunk'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loading: false,
		error: null,
		signUpSuccess: false
	},
	reducers: {
		resetSignUpSuccess: state => {
			state.signUpSuccess = false
		},
		resetErrors: state => {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(signInThunk.pending, state => {
				state.loading = true
			})
			.addCase(signInThunk.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(signInThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(signUpThunk.pending, state => {
				state.loading = true
			})
			.addCase(signUpThunk.fulfilled, state => {
				state.loading = false
				state.signUpSuccess = true
			})
			.addCase(signUpThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(signOutThunk.pending, state => {
				state.loading = true
			})
			.addCase(signOutThunk.fulfilled, state => {
				state.user = null
				state.loading = false
			})
			.addCase(signOutThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { resetSignUpSuccess, resetErrors } = authSlice.actions
export default authSlice.reducer

import { createAsyncThunk } from '@reduxjs/toolkit'
import { signIn, signOut, signUp } from '../../api/auth'
import { userDto } from '../../utils/dtos'

export const signInThunk = createAsyncThunk('auth/signIn', async (payload, { rejectWithValue }) => {
	try {
		const response = await signIn(payload)
		localStorage.setItem('token', response.data.token)
		return userDto(response.data)
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e)
	}
})

export const signUpThunk = createAsyncThunk('auth/signUp', async (payload, { rejectWithValue }) => {
	try {
		const response = await signUp(payload)
		console.log('response: ', response)
		return response.data
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

export const signOutThunk = createAsyncThunk('auth/signOut', async (_, rejectWithValue) => {
	try {
		await signOut()
		localStorage.removeItem('token')
	} catch (e) {
		console.log('error: ', e)
		return rejectWithValue(e.response.data)
	}
})

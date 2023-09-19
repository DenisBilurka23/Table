import { AuthAPI } from './mock'

export const signIn = payload => AuthAPI.signIn(payload)
export const signUp = payload => AuthAPI.signUp(payload)
export const signOut = () => AuthAPI.signOut()

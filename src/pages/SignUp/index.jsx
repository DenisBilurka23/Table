import AuthForm from '../../components/AuthForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { signUpThunk } from '../../store/thunks/authThunk'
import Loader from '../../components/Loader'

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const { loading, signUpSuccess, error } = useSelector(state => state.auth)
	const submitHandler = async () => {
		await dispatch(signUpThunk({ email, password }))
	}

	useEffect(() => {
		if (signUpSuccess) {
			navigate('/sign-in')
		}
	}, [signUpSuccess])

	return (
		<>
			<AuthForm
				email={email}
				setUsername={setEmail}
				password={password}
				setPassword={setPassword}
				onSubmit={submitHandler}
				error={error}
				type="signup"
				repeatPassword={repeatPassword}
				setRepeatPassword={setRepeatPassword}
			/>
			{loading && <Loader />}
		</>
	)
}

export default SignUp

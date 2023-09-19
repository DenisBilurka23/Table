import { Box, Button, TextField, Typography } from '@mui/material'
import logo from '../../assets/logoDark.png'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetErrors } from '../../store/slices/authSlice'

const Form = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '45px',
	padding: '0 45px 45px',
	border: '1px solid #e4e4e4',
	height: 'fit-content',
	input: {
		padding: '5px 10px'
	},
	'& .Mui-focused fieldset': {
		outline: 'none',
		border: '1px solid #7d7d7d!important'
	},
	'& img': {
		width: '250px'
	},
	a: {
		color: '#3c95ef',
		fontSize: '14px',
		fontWeight: 700,
		underline: 'none',
		marginLeft: '5px'
	}
})
const AuthForm = ({
	type,
	email,
	setUsername,
	password,
	repeatPassword,
	setRepeatPassword,
	setPassword,
	onSubmit,
	error
}) => {
	const signinPage = type === 'signin'
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({})

	const handleEmailChange = e => setUsername(e.target.value)

	const handlePasswordChange = e => setPassword(e.target.value)

	const handleRepeatPasswordChange = e => setRepeatPassword(e.target.value)

	const isEmailValid = email => {
		const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
		return regex.test(email)
	}

	const handleValidation = () => {
		const newErrors = {}
		if (!signinPage && !newErrors.email && !isEmailValid(email)) {
			newErrors.email = 'Invalid email address'
		}
		if (!signinPage && !newErrors.password && password.trim().length < 6) {
			newErrors.password = 'Password should have at least 6 characters'
		}
		if (!signinPage && !newErrors.repeatPassword && repeatPassword.trim() !== password.trim()) {
			newErrors.repeatPassword = 'Passwords do not match'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = () => {
		if (handleValidation()) {
			onSubmit()
		}
	}

	useEffect(() => {
		dispatch(resetErrors())
	}, [])

	return (
		<>
			<Form>
				<img src={logo} alt="logo" />
				<TextField
					value={email}
					onChange={handleEmailChange}
					variant="outlined"
					sx={{ width: '250px', marginBottom: '10px' }}
					placeholder="Email"
					error={!!errors.email}
					helperText={errors.email}
				/>
				<TextField
					value={password}
					onChange={handlePasswordChange}
					variant="outlined"
					sx={{ width: '250px', marginBottom: '10px' }}
					type="password"
					placeholder="Password"
					error={!!errors.password}
					helperText={errors.password}
				/>
				{!signinPage && (
					<TextField
						value={repeatPassword}
						onChange={handleRepeatPasswordChange}
						variant="outlined"
						sx={{ width: '250px', marginBottom: '10px' }}
						type="password"
						placeholder="Repeat password"
						error={!!errors.repeatPassword}
						helperText={errors.repeatPassword}
					/>
				)}
				<Button
					fullWidth
					onClick={handleSubmit}
					sx={{ borderRadius: '20px', margin: '20px 0', width: '250px' }}
					disabled={!email.length || !password.length || (!signinPage && !repeatPassword)}
					variant="contained"
				>
					{signinPage ? 'Log in' : 'Sign up'}
				</Button>
				{error && (
					<Typography mb="20px" textAlign="center" maxWidth="250px" color="rgb(237, 73, 86)" key={error}>
						{error}
					</Typography>
				)}
				<Box display="flex">
					<Typography color="#000" fontSize="14px">
						{signinPage ? `Don't have an account yet?${''}` : 'Already have an account?'}
					</Typography>
					{signinPage ? <Link to="/sign-up">Sign up</Link> : <Link to="/sign-in">Sign In</Link>}
				</Box>
			</Form>
		</>
	)
}

export default AuthForm

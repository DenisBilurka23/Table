import { Outlet, Navigate } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import Nav from '../Nav/index.tsx'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
	const user = useSelector(state => state.auth.user)
	const isAuth = localStorage.getItem('token') && user
	const theme = useTheme()

	return isAuth ? (
		<Box
			sx={{ background: theme.palette.mode === 'dark' ? '#121212' : '#fff' }}
			width="100%"
			display="flex"
			alignItems="center"
			flexDirection="column"
		>
			<Nav />
			<Outlet />
		</Box>
	) : (
		<Navigate to="/sign-in" />
	)
}
export default PrivateRoutes

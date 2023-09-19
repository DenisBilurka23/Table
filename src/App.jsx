import Articles from './pages/Articles'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoutes from './components/PrivateRoutes'
import { createContext, useMemo, useState } from 'react'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route element={<PrivateRoutes />}>
				<Route element={<Articles />} index />
			</Route>
		</>
	)
)

export const ColorModeContext = createContext()
const App = () => {
	const [mode, setMode] = useState('light')
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
			mode
		}),
		[mode]
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider
				theme={createTheme({
					palette: { mode }
				})}
			>
				<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
					<RouterProvider router={router} />
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App

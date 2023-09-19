import { useContext, useMemo, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ColorModeContext } from '../../App.jsx'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import logoImg from '../../assets/logo.png'
import { signOutThunk } from '../../store/thunks/authThunk'
import { useDispatch } from 'react-redux'

interface Option {
	title: string
	Icon?: React.ComponentType
	link?: string
}

const Nav: React.FC = () => {
	const colorMode = useContext(ColorModeContext)
	const dispatch = useDispatch()
	const options: Option[] = useMemo(
		() => [
			{ title: 'Logout', link: '/sign-in' },
			{ title: 'Theme', Icon: colorMode.mode === 'light' ? LightModeIcon : DarkModeIcon }
		],
		[colorMode.mode]
	)
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

	const handleCloseNavMenu = (option?: string) => (event: React.MouseEvent<HTMLElement>) => {
		switch (option) {
			case 'Theme':
				colorMode.toggleColorMode()
				break
			case 'Logout':
				// @ts-ignore
				dispatch(signOutThunk())
				colorMode.mode === 'dark' && colorMode.toggleColorMode()
				break
			default:
				break
		}

		setAnchorElNav(anchorElNav ? null : event.currentTarget)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton size="large" onClick={handleCloseNavMenu()} color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							open={!!anchorElNav}
							onClose={handleCloseNavMenu()}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{options.map(({ title, link }) => (
								<MenuItem
									key={title}
									{...(link && { component: Link, to: link })}
									onClick={handleCloseNavMenu(title)}
								>
									<Typography textAlign="center">{title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Logo src={logoImg} />
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
						{options.map(({ title, Icon, link }) => (
							<Button
								{...(link && { component: Link, to: link })}
								key={title}
								onClick={handleCloseNavMenu(title)}
								sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
							>
								<Typography sx={{ mr: Icon ? '.5rem' : 0 }}>{title}</Typography>
								{Icon && <Icon />}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Nav

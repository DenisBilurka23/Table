import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface LogoProps {
	src: string
}

const Logo: React.FC<LogoProps> = ({ src }) => (
	<Box
		sx={{
			display: { xs: 'flex' },
			flexGrow: 1,
			fontFamily: 'monospace',
			letterSpacing: '.3rem',
			img: { height: '30px' },
			a: { textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }
		}}
	>
		<Link to="/">
			<img alt="www" src={src} />
			<Typography fontSize="20px" fontWeight={300}>
				WorldWideWrites
			</Typography>
		</Link>
	</Box>
)

export default Logo

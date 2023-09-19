import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Logo from './Logo'

test('renders logo and text', () => {
	render(
		<Router>
			<Logo src="your-logo-source" />
		</Router>
	)

	const logoImage = screen.getByAltText('www')
	const logoText = screen.getByText('WorldWideWrites')
	expect(logoImage).toBeInTheDocument()
	expect(logoText).toBeInTheDocument()
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmationModal from './index.jsx'

describe('ConfirmationModal', () => {
	it('renders with the provided message', () => {
		const message = 'Are you sure you want to proceed?'
		const onConfirmMock = jest.fn()
		const onCloseMock = jest.fn()
		render(<ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} message={message} />)

		const messageElement = screen.getByText(message)
		expect(messageElement).toBeInTheDocument()
	})

	it('calls onClose when Cancel button is clicked', () => {
		const onConfirmMock = jest.fn()
		const onCloseMock = jest.fn()
		render(<ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} message="Test message" />)

		const cancelButton = screen.getByText('Cancel')
		fireEvent.click(cancelButton)

		expect(onCloseMock).toHaveBeenCalledTimes(1)
	})

	it('calls onConfirm when Ok button is clicked', () => {
		const onConfirmMock = jest.fn()
		const onCloseMock = jest.fn()
		render(<ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} message="Test message" />)

		const okButton = screen.getByText('Ok')
		fireEvent.click(okButton)

		expect(onConfirmMock).toHaveBeenCalledTimes(1)
	})

	it('does not render when open is false', () => {
		const onConfirmMock = jest.fn()
		const onCloseMock = jest.fn()
		render(
			<ConfirmationModal open={false} onClose={onCloseMock} onConfirm={onConfirmMock} message="Test message" />
		)

		const messageElement = screen.queryByText('Test message')
		expect(messageElement).not.toBeInTheDocument()
	})
})

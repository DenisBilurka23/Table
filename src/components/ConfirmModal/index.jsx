import { Button, DialogTitle, DialogActions, Dialog } from '@mui/material'
import { styled } from '@mui/system'

const Modal = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		backgroundColor: '#262626',
		color: '#fff',
		width: '250px',
		borderRadius: '20px',
		[theme.breakpoints.up(750)]: {
			width: '400px'
		}
	}
}))

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
	const handleCancel = () => {
		onClose()
	}

	const handleConfirm = () => {
		onConfirm()
		onClose()
	}

	return (
		<Modal open={open} onClose={onClose}>
			<DialogTitle>{message}</DialogTitle>
			<DialogActions>
				<Button autoFocus onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleConfirm}>Ok</Button>
			</DialogActions>
		</Modal>
	)
}

export default ConfirmationModal

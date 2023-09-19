import {
	DialogContent,
	IconButton,
	DialogTitle,
	Dialog,
	Typography,
	styled,
	Box,
	TextField,
	DialogActions,
	Button,
	FormControl
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { ColumnsType, CreateDataFnType, FilterByType, GetDataFnType, ModalType, UpdateDataFnType } from './tableTypes'

const Modal = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-paper': {
		borderRadius: '20px',
		[theme.breakpoints.up(500)]: {
			width: '400px'
		},
		[theme.breakpoints.down(500)]: {
			width: '300px'
		}
	}
}))

interface AddRowModalProps {
	onClose: (modalType: ModalType | null) => () => void
	open: boolean
	columns: ColumnsType
	modalType: ModalType
	selectedRows: Array<string | number>
	page: number
	pageSize: number
	searchValue: string
	getDataFn: GetDataFnType
	createDataFn: CreateDataFnType
	updateDataFn: UpdateDataFnType
	filterBy: FilterByType
	selectedColumns: ColumnsType
}
export interface RowData {
	[key: string]: string
}

const RowModal: React.FC<AddRowModalProps> = ({
	columns,
	onClose,
	open,
	modalType,
	selectedRows,
	page,
	searchValue,
	pageSize,
	getDataFn,
	createDataFn,
	filterBy,
	updateDataFn,
	selectedColumns
}) => {
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [rowsData, setRowsData] = useState<RowData>({})
	const dispatch = useDispatch()

	const handleValidation = () => {
		const newErrors: Record<string, string> = {}
		columns.forEach(({ key }) => {
			if (!rowsData[key]?.trim() && key !== 'createdAt') {
				newErrors[key] = `${key} is required`
			}
		})
		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}
	const handleTextField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsData(prevState => ({
			...prevState,
			[field]: e.target.value
		}))
	}

	const submitHandler = async () => {
		if (!handleValidation()) {
			return
		}

		let actionResult
		if (modalType === 'add') {
			// @ts-ignore
			actionResult = await dispatch(createDataFn(rowsData))
		} else {
			// @ts-ignore
			actionResult = await dispatch(updateDataFn({ id: selectedRows[0], payload: rowsData }))
		}
		if (!actionResult.error) {
			// @ts-ignore
			await dispatch(getDataFn({ search: searchValue, page, pageSize, filterBy, selectedColumns }))
			setRowsData({})
			onClose(null)()
		}
	}

	return (
		<Modal onClose={onClose(null)} open={open}>
			<DialogTitle
				sx={{
					display: 'flex',
					p: '0.5rem',
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<IconButton
					onClick={onClose(null)}
					sx={{
						position: 'absolute',
						left: 0,
						top: '50%',
						transform: 'translateY(-50%)'
					}}
				>
					<Close />
				</IconButton>
				<Typography fontWeight={700}>{modalType === 'add' ? 'Add new' : 'Edit'} row</Typography>
			</DialogTitle>
			<DialogContent sx={{ p: '0 0 16px 0' }}>
				<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
					{columns.map(
						({ key, title }) =>
							key !== 'createdAt' && (
								<FormControl key={key}>
									<TextField
										onChange={handleTextField(key)}
										sx={{ m: '.5rem' }}
										variant="outlined"
										placeholder={title}
										error={!!errors[key]}
										helperText={errors[key]}
									/>
								</FormControl>
							)
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={submitHandler}>Submit</Button>
			</DialogActions>
		</Modal>
	)
}

export default RowModal

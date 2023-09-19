import { Box, Input, IconButton } from '@mui/material'
import { AddCircle, Delete, Edit, FormatListBulleted } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ColumnsType, DeleteDataFnType, FilterByType, GetDataFnType, ModalType } from './tableTypes'
import CustomizeColumnsMenu from './CustomizeColumnsMenu'
import * as React from 'react'
import ConfirmationModal from '../ConfirmModal'

interface SearchProps {
	selectedRows: Array<string | number>
	toggleRowModalOpen: (modalType: ModalType) => () => void
	setSelectedRows: (selected: Array<string | number>) => void
	setModalType: (type: ModalType) => void
	setSearchValue: (search: string) => void
	searchValue: string
	page: number
	pageSize: number
	getDataFn: GetDataFnType
	deleteDataFn: DeleteDataFnType
	filterBy: FilterByType
	columns: ColumnsType
	selectedColumns: ColumnsType
	setSelectedColumns: (columns: ColumnsType) => void
}
type DebounceFunction = <T extends (...args: any[]) => void>(func: T, delay: number) => (...args: Parameters<T>) => void

const Search: React.FC<SearchProps> = ({
	selectedRows,
	toggleRowModalOpen,
	setSelectedRows,
	searchValue,
	setSearchValue,
	page,
	pageSize,
	getDataFn,
	deleteDataFn,
	filterBy,
	columns,
	selectedColumns,
	setSelectedColumns
}) => {
	const dispatch = useDispatch()
	const [customizeMenuAnchorEl, setCustomizeMenuAnchorEl] = useState<null | HTMLElement>(null)
	const [deleteRowModalOpen, setDeleteRowModalOpen] = useState<boolean>(false)

	const toggleDeleteRowModal = () => setDeleteRowModalOpen(prev => !prev)
	const handleDeleteRows = async () => {
		// @ts-ignore
		const actionResult = await dispatch(deleteDataFn(selectedRows))
		if (!actionResult.error) {
			// @ts-ignore
			dispatch(getDataFn({ page, pageSize, search: searchValue, filterBy, selectedColumns }))
			setSelectedRows([])
		}
	}

	const handleCustomizeColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
		setCustomizeMenuAnchorEl(event.currentTarget)
	}

	const debounce: DebounceFunction = (func, delay) => {
		let timeoutId: NodeJS.Timeout

		return function (this: any, ...args) {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				func.apply(this, args)
			}, delay)
		}
	}

	const debouncedApiRequest = useMemo(
		() =>
			debounce(async search => {
				// @ts-ignore
				await dispatch(getDataFn({ search, page: 1, pageSize: 5, filterBy, selectedColumns }))
			}, 300),
		[]
	)
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
		debouncedApiRequest(e.target.value)
	}

	return (
		<Box sx={{ display: 'block', width: '100%', position: 'relative' }}>
			<Input
				fullWidth
				sx={{ pl: '1rem' }}
				placeholder="Search..."
				disableUnderline
				value={searchValue}
				onChange={handleSearch}
			/>
			<Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
				<IconButton size="small" onClick={toggleRowModalOpen('add')}>
					<AddCircle />
				</IconButton>
				<IconButton size="small" disabled={selectedRows.length !== 1} onClick={toggleRowModalOpen('edit')}>
					<Edit />
				</IconButton>
				<IconButton size="small" disabled={selectedRows.length < 1} onClick={toggleDeleteRowModal}>
					<Delete />
				</IconButton>
				<IconButton size="small" onClick={handleCustomizeColumns}>
					<FormatListBulleted />
				</IconButton>
			</Box>
			<CustomizeColumnsMenu
				columns={columns}
				anchorEl={customizeMenuAnchorEl}
				setAnchorEl={setCustomizeMenuAnchorEl}
				selectedColumns={selectedColumns}
				setSelectedColumns={setSelectedColumns}
			/>
			<ConfirmationModal
				open={deleteRowModalOpen}
				onClose={toggleDeleteRowModal}
				onConfirm={handleDeleteRows}
				message="Are you sure you want to delete this row"
			/>
		</Box>
	)
}

export default Search

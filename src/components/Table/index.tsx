import { ChangeEvent, useEffect, useState } from 'react'
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	Pagination
} from '@mui/material'
import Search from './Search'
import RowModal from './RowModal'
import { useDispatch } from 'react-redux'
import { FilterAlt, ArrowDownward, ArrowUpward } from '@mui/icons-material'
import moment from 'moment'
import { ColumnsType, DataTableProps, FilterByType, ModalType } from './tableTypes'
import { styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
	minWidth: '650px',
	[theme.breakpoints.down('sm')]: {
		minWidth: 'unset',
		width: '95%'
	}
}))

const DataTable: React.FC<DataTableProps> = ({
	data = [],
	columns = [],
	totalItems,
	page,
	pageSize,
	setPage,
	getDataFn,
	createDataFn,
	updateDataFn,
	deleteDataFn
}) => {
	const [modalType, setModalType] = useState<ModalType>(null)
	const [selectedRows, setSelectedRows] = useState<Array<string | number>>([])
	const [addRowModalOpen, setAddRowModalOpen] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')
	const dispatch = useDispatch()
	const [selectedColumns, setSelectedColumns] = useState<ColumnsType>([{ key: 'id', title: 'ID' }, ...columns])
	const [filterBy, setFilterBy] = useState<FilterByType>({
		field: columns[0].key,
		by: 'default'
	})
	const filterIconStyle = { verticalAlign: 'bottom', ml: '.5rem', color: '#757575' }

	const handleFilterBy = (columnKey: string) => () => {
		setFilterBy(prev => {
			switch (prev?.by) {
				case 'ascend':
					return { field: columnKey, by: 'default' }
				case 'descend':
					return { field: columnKey, by: 'ascend' }
				default:
					return { field: columnKey, by: 'descend' }
			}
		})
	}
	const toggleRowModalOpen = (modalType: ModalType) => () => {
		setModalType(modalType)
		setAddRowModalOpen(prev => !prev)
	}

	const handleRowClick = (id: number | string) => () => {
		const idInx = selectedRows.findIndex(prevId => prevId === id)
		if (idInx < 0) {
			setSelectedRows(prev => [...prev, id])
		} else {
			setSelectedRows(prev => {
				const copy = [...prev]
				copy.splice(idInx, 1)
				return copy
			})
		}
	}

	const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}

	useEffect(() => {
		// @ts-ignore
		dispatch(getDataFn({ search: searchValue, page, pageSize, filterBy, selectedColumns }))
	}, [page, filterBy, selectedColumns])

	return (
		<Container>
			<Search
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				toggleRowModalOpen={toggleRowModalOpen}
				setModalType={setModalType}
				page={page}
				pageSize={pageSize}
				getDataFn={getDataFn}
				deleteDataFn={deleteDataFn}
				filterBy={filterBy}
				columns={columns}
				selectedColumns={selectedColumns}
				setSelectedColumns={setSelectedColumns}
			/>
			<RowModal
				modalType={modalType}
				columns={columns}
				onClose={toggleRowModalOpen}
				open={addRowModalOpen}
				selectedRows={selectedRows}
				searchValue={searchValue}
				pageSize={pageSize}
				page={page}
				createDataFn={createDataFn}
				updateDataFn={updateDataFn}
				getDataFn={getDataFn}
				filterBy={filterBy}
				selectedColumns={selectedColumns}
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{selectedColumns.map(({ title, key }, inx) => {
								return key !== 'id' ? (
									<TableCell
										onClick={handleFilterBy(key)}
										key={key + title}
										style={{
											width: `${100 / selectedColumns.length}%`,
											paddingLeft: inx === 1 ? '2rem' : '1rem',
											cursor: 'pointer'
										}}
									>
										{title}
										{filterBy.field === key ? (
											<>
												{filterBy.by === 'descend' && <ArrowDownward sx={filterIconStyle} />}
												{filterBy.by === 'ascend' && <ArrowUpward sx={filterIconStyle} />}
												{filterBy.by !== 'descend' && filterBy.by !== 'ascend' && (
													<FilterAlt sx={filterIconStyle} />
												)}
											</>
										) : (
											<FilterAlt sx={filterIconStyle} />
										)}
									</TableCell>
								) : null
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&': { cursor: 'pointer' } }}
								onClick={handleRowClick(row.id)}
							>
								{Object.entries(row).map(([key, value], inx: number) => {
									return (
										key !== 'id' && (
											<TableCell key={inx}>
												{((inx === 0 && key !== 'id') ||
													(inx === 1 && Object.keys(row)[0] === 'id')) && (
													<Checkbox size="small" checked={selectedRows.includes(row.id)} />
												)}
												{key !== 'createdAt'
													? (value as string)
													: moment(value as string).format('HH:mm DD.MM.YYYY')}
											</TableCell>
										)
									)
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ mt: '1.5rem', display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={Math.ceil(totalItems / pageSize)}
					onChange={handlePageChange}
					variant="outlined"
					shape="rounded"
				/>
			</Box>
		</Container>
	)
}

export default DataTable

import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ColumnsType } from './tableTypes'
import { Checkbox } from '@mui/material'

interface CustomizeColumnsMenuProps {
	anchorEl: null | HTMLElement
	setAnchorEl: (e: (EventTarget & HTMLButtonElement) | null) => void
	columns: ColumnsType
	selectedColumns: ColumnsType
	setSelectedColumns: any
}

interface Column {
	key: string
	title: string
}

const CustomizeColumnsMenu: React.FC<CustomizeColumnsMenuProps> = ({
	anchorEl,
	setAnchorEl,
	columns,
	selectedColumns,
	setSelectedColumns
}) => {
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSelectColumn = (column: Column) => () => {
		const columnInx = selectedColumns.findIndex(selectedColumn => selectedColumn.key === column.key)

		if (columnInx > -1) {
			return setSelectedColumns((prev: ColumnsType) => prev.toSpliced(columnInx, 1))
		}

		setSelectedColumns((prev: ColumnsType) => [...prev, column])
	}

	return (
		<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={!!anchorEl}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button'
			}}
		>
			{columns.map(column => (
				<MenuItem onClick={handleSelectColumn(column)} key={column.key}>
					<Checkbox
						size="small"
						checked={selectedColumns.some(selectedColumn => selectedColumn.key === column.key)}
					/>
					{column.title}
				</MenuItem>
			))}
		</Menu>
	)
}

export default CustomizeColumnsMenu

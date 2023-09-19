import { AsyncThunk } from '@reduxjs/toolkit'

export type GetDataFnType = AsyncThunk<unknown, void, any>
export type CreateDataFnType = AsyncThunk<unknown, void, any>
export type UpdateDataFnType = AsyncThunk<unknown, void, any>
export type DeleteDataFnType = AsyncThunk<unknown, void, any>
export type ModalType = 'edit' | 'add' | null
export type FilterByType = { field: string; by: 'ascend' | 'descend' | 'default' }
export type ColumnsType = Array<{ title: string; key: string }>
export interface DataTableProps {
	data: any[]
	columns: ColumnsType
	totalItems: number
	page: number
	setPage: (page: number) => void
	pageSize: number
	getDataFn: GetDataFnType
	createDataFn: CreateDataFnType
	updateDataFn: UpdateDataFnType
	deleteDataFn: DeleteDataFnType
}

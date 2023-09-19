import { Box } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import DataTable from '../../components/Table/index.tsx'
import {
	createArticleThunk,
	deleteArticlesThunk,
	getArticlesThunk,
	modifyArticlesThunk
} from '../../store/thunks/articlesThunk'

const Articles = () => {
	const authLoading = useSelector(state => state.auth.loading)
	const articles = useSelector(state => state.articles.items)
	const articlesNumber = useSelector(state => state.articles.totalItems)
	const [page, setPage] = useState(1)
	const pageSize = 5

	const columns = [
		{ key: 'title', title: 'Title' },
		{ key: 'author', title: 'Author' },
		{ key: 'createdAt', title: 'Created At' }
	]

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				m: '20px',
				width: '100%',
				maxWidth: '935px',
				overflow: 'scroll'
			}}
		>
			<DataTable
				data={articles}
				totalItems={articlesNumber}
				columns={columns}
				getDataFn={getArticlesThunk}
				createDataFn={createArticleThunk}
				updateDataFn={modifyArticlesThunk}
				deleteDataFn={deleteArticlesThunk}
				page={page}
				pageSize={pageSize}
				setPage={setPage}
			/>
			{authLoading && <Loader />}
		</Box>
	)
}

export default Articles

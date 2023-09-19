import moment from 'moment'

const usersDB = []

const subtractTime = hours => moment().subtract(hours, 'hours').toISOString()
let articlesDB = [
	{ title: 'title1', author: 'John', id: crypto.randomUUID(), createdAt: subtractTime(1) },
	{ id: crypto.randomUUID(), title: 'title2', author: 'Andrew', createdAt: subtractTime(3) },
	{ id: crypto.randomUUID(), title: 'title3', author: 'Michael', createdAt: subtractTime(6) },
	{ id: crypto.randomUUID(), title: 'title4', author: 'Jensen', createdAt: subtractTime(4) },
	{ id: crypto.randomUUID(), title: 'title5', author: 'Daniel', createdAt: subtractTime(10) },
	{ id: crypto.randomUUID(), title: 'title6', author: 'Alex', createdAt: subtractTime(7) },
	{ id: crypto.randomUUID(), title: 'title7', author: 'Kai', createdAt: subtractTime(8) }
]

const checkAuth = () => {
	const token = localStorage.getItem('token')
	const parsedEmail = atob(token).split(':')[0]
	const user = usersDB.find(({ email }) => email === parsedEmail)

	if (!user) {
		localStorage.removeItem('token')
		return Promise.reject(new Error(401))
	}
	return user
}

export const AuthAPI = {
	signUp({ email, password }) {
		const userExists = usersDB.find(user => user.email === email)

		if (userExists) {
			return Promise.reject('User already exists')
		}

		const newUser = {
			id: crypto.randomUUID(),
			email,
			password
		}
		usersDB.push(newUser)

		return Promise.resolve({ data: newUser })
	},
	signIn({ email, password }) {
		const user = usersDB.find(u => u.email === email)

		console.log('user: ', user)
		console.log('password: ', password)
		if (!user || user?.password !== password) {
			console.log('here')
			return Promise.reject('Invalid email or password')
		}
		console.log('next')

		const token = btoa(`${user.email}:${user.password}`)
		const loggedInUser = { ...user, token }

		return Promise.resolve({ data: loggedInUser })
	},
	signOut() {
		return Promise.resolve()
	}
}

export const ArticlesAPI = {
	getArticles: async ({ search, page = 1, pageSize = 5, filterBy = 'default', selectedColumns }) => {
		await checkAuth()

		let res = articlesDB.map(article => {
			const filteredArticle = {}
			selectedColumns.forEach(column => {
				filteredArticle[column.key] = article[column.key]
			})
			return filteredArticle
		})

		res = res.filter(article => {
			return article.title?.includes(search) || article.author?.includes(search)
		})

		if (filterBy.by !== 'default') {
			res.sort((a, b) => {
				if (filterBy.by === 'ascend') {
					return a[filterBy.field].localeCompare(b[filterBy.field])
				} else {
					return b[filterBy.field].localeCompare(a[filterBy.field])
				}
			})
		}

		const startIndex = (page - 1) * pageSize
		const endIndex = startIndex + pageSize
		const paginatedArticles = res.slice(startIndex, endIndex)

		return Promise.resolve({ data: { items: paginatedArticles, totalItems: res.length } })
	},
	createArticle: async payload => {
		await checkAuth()

		const article = { id: crypto.randomUUID(), ...payload, createdAt: moment().toISOString() }
		articlesDB = [...articlesDB, article]
		return Promise.resolve({ data: article })
	},
	deleteArticles: async selectedIds => {
		await checkAuth()

		const articlesDBCopy = [...articlesDB]
		const deletePromises = selectedIds.map(articleId => {
			return new Promise(async (resolve, reject) => {
				const articleIndex = articlesDBCopy.findIndex(article => article.id === articleId)
				if (articleIndex !== -1) {
					const deletedArticle = await articlesDBCopy.splice(articleIndex, 1)[0]
					resolve(deletedArticle)
				} else {
					reject(new Error(`Article with ID ${articleId} not found`))
				}
			})
		})
		articlesDB = articlesDBCopy
		return Promise.all(deletePromises)
	},
	modifyArticle: async (id, payload) => {
		await checkAuth()

		const articlesDBCopy = [...articlesDB]
		const articleIndex = articlesDB.findIndex(article => article.id === id)
		if (articleIndex !== -1) {
			articlesDBCopy[articleIndex] = {
				...articlesDBCopy[articleIndex],
				...payload,
				createdAt: moment().toISOString()
			}
			articlesDB = articlesDBCopy
			return Promise.resolve({ data: articlesDBCopy })
		}
		return Promise.reject(new Error('Article not found'))
	}
}

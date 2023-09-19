import { TailSpin } from 'react-loader-spinner'

const Loader = () => (
	<TailSpin
		height="55"
		width="55"
		color="#1976d2"
		ariaLabel="tail-spin-loading"
		radius="1"
		visible={true}
		wrapperStyle={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}
	/>
)

export default Loader

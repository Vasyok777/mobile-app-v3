import { FC } from 'react'
import './AppTitle.scss'

interface AppTitleProps {
	children: React.ReactNode
}

const AppTitle: FC<AppTitleProps> = ({ children }) => {
	return <h2 className='app-title'>{children}</h2>
}
export default AppTitle

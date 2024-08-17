import Link from 'next/link'
import { FC } from 'react'
import './AppLink.scss'

interface AppLinkProps {
	to: string
	text: string
	classes: string
}

const AppLink: FC<AppLinkProps> = ({ to, text, classes }) => {
	const className = classes ? `app-link ${classes}` : 'app-link'

	return (
		<Link className={className} href={to}>
			{text}
		</Link>
	)
}
export default AppLink

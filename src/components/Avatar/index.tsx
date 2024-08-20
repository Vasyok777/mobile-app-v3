'use client'

import { getUserAvatar } from '@/app/actions.server'
import { FC, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import './Avatar.scss'
import AvatarSvg from './AvatarSvg'

interface AvatarProps {
	isEdit?: boolean
	src: any
}

const initialState = {
	avatarUrl: '',
}

const Avatar: FC<AvatarProps> = ({ isEdit, src }) => {
	const [avatarUrl, setAvatarUrl] = useState(src || '')
	const [username, setUsername] = useState('U')
	const [state, formAction] = useFormState(getUserAvatar, initialState)

	console.log(state, formAction)

	const handleClick = () => {
		document.body.classList.toggle('lock')
	}

	useEffect(() => {
		const tg = (window as any)?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user

		if (user) {
			setUsername(user.username ? user.username[0].toUpperCase() : 'U')

			const fetchAvatar = async () => {
				try {
					const url = await formAction(user.id)
					console.log('url', url)
					setAvatarUrl(url)
				} catch (error) {
					console.error('Error fetching avatar:', error)
				}
			}

			fetchAvatar()
		}
	}, [formAction])

	return (
		<div className='avatar'>
			{state.avatarUrl ? (
				<div className='avatar-img'>
					<img src={state.avatarUrl} alt='Avatar' className='avatar-image' />
				</div>
			) : (
				<div className='avatar-text'>{username}</div>
			)}
			{isEdit && (
				<button className='avatar-button' onClick={handleClick}>
					<AvatarSvg />
					Edit
				</button>
			)}
		</div>
	)
}

export default Avatar

'use client'

// import { createUser, setUserAvatar } from '@/app/actions.server'
import Avatar from '@/components/Avatar'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './Login.scss'

const Login = () => {
	const router = useRouter()
	const [user, setUser] = useState(null)
	const [avatarPreview, setAvatarPreview] = useState<string | null | object>(
		null
	)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<{ nickname: string }>({
		mode: 'onChange',
	})

	const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		const tg = (window as any)?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64Avatar = reader.result
				setAvatarPreview(base64Avatar)

				// setUserAvatar(user.id, base64Avatar)
				handleCancel()
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		const tg = (window as any)?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user

		setUser(user)
		if (user) {
			setValue('nickname', user.username)
		}
	}, [setValue])

	const onSubmit = (data: { nickname: string }) => {
		const tg = (window as any)?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user
		console.log(data.nickname)
		// createUser(user.id, data.nickname)

		// router.push('/crafting', { scroll: false })
	}

	const handleCancel = () => {
		document.body.classList.remove('lock')
	}

	const handleOutsideClick = () => {
		const activeElement = document.activeElement as HTMLElement
		if (
			activeElement.tagName === 'INPUT' ||
			activeElement.tagName === 'TEXTAREA'
		) {
			activeElement.blur()
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const handleOverlayClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleCancel()
			handleOutsideClick() // Ховаємо клавіатуру при натисканні за межами
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	useEffect(() => {
		const overlay = document.querySelector('.login-choose__overlay')
		if (overlay) {
			overlay.addEventListener('click', handleOverlayClick as EventListener)
		}

		return () => {
			if (overlay) {
				overlay.removeEventListener(
					'click',
					handleOverlayClick as EventListener
				)
			}
		}
	}, [])

	return (
		<>
			<main className='login wrapper'>
				<h1 className='login-title'>
					Boom!
					<br />
					Welcome to the crew
				</h1>
				<div className='login-ava'>
					<Avatar isEdit={true} src={avatarPreview} />
				</div>
				<div className='login-bottom'>
					<form className='login-form' onSubmit={handleSubmit(onSubmit)}>
						<label className='login-form__label'>
							Nickname
							{errors.nickname ? (
								<p className='login-form__label-error'>Name is too short</p>
							) : (
								<p className='login-form__label-success'>
									Good one! That’s available
								</p>
							)}
						</label>
						<div className='login-form__input'>
							<input
								type='text'
								placeholder='Enter your name'
								{...register('nickname', { required: true, minLength: 3 })}
							/>
							{!errors.nickname && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='25'
									viewBox='0 0 24 25'
									fill='none'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M12.0045 2.4259C17.8025 2.4259 22.5045 7.12796 22.5045 12.926C22.5045 18.724 17.8025 23.426 12.0045 23.426C6.20645 23.426 1.50439 18.724 1.50439 12.926C1.50439 7.12796 6.20645 2.4259 12.0045 2.4259ZM9.82399 16.3365L7.25332 13.7637C6.81536 13.3255 6.81527 12.6109 7.25332 12.1727C7.69145 11.7347 8.40923 11.7374 8.84418 12.1727L10.6565 13.9865L15.1649 9.47804C15.603 9.03991 16.3177 9.03991 16.7558 9.47804C17.1939 9.91609 17.1933 10.6314 16.7558 11.0689L11.4506 16.374C11.0131 16.8115 10.2978 16.8122 9.85977 16.374C9.84746 16.3617 9.83559 16.3492 9.82399 16.3365Z'
										fill='#1FCC5D'
									/>
								</svg>
							)}
						</div>
						<button className='app-link app-link-button'>Continue</button>
					</form>
				</div>

				<div className='login-choose'>
					<h4>Edit avatar</h4>
					<button className='login-choose__button'>
						Choose from gallery
						<input type='file' onChange={handleUpload} />
					</button>
					<button className='login-choose__cancel' onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</main>
			<div className='login-choose__overlay'></div>
		</>
	)
}

export default Login

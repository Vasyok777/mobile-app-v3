// 'use server'

import { TradingGameServiceClient } from '@/generated/trading.client'
import { UserServiceClient } from '@/generated/user.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
	baseUrl: 'http://5.61.54.103:50052',
})

const trading = new GrpcWebFetchTransport({
	baseUrl: 'http://5.61.54.103:50053',
})

const client = new UserServiceClient(transport)
const game = new TradingGameServiceClient(trading)

export async function createUser(telegramId: any, nickname: any) {
	const response = await client.createUser({ telegramId, nickname })
	// console.log(response.response.user)
	// console.log(telegramId, nickname)
	return response.response.user
}
export async function getUserAvatar(prevState: any, telegramId: any) {
	const response = await client.getUserAvatar({ telegramId })
	return {
		avatarUrl: response?.response?.avatar?.avatarUrl,
	}
}
export async function setUserAvatar(telegramId: any, avatarUrl: any) {
	console.log(telegramId)
	const response = await client.setUserAvatar({
		telegramId: telegramId,
		avatarUrl,
	})
	return response.response
}
// export const getUserTasks = async (telegramId: any) => {
// 	const response = await client.getUserTasks({ telegramId })
// 	return response.response.tasks
// }

// export const createUser = async (telegramId: any, nickname: any) => {
// 	const response = await client.createUser({ telegramId, nickname })
// 	console.log(response.response.user)
// 	console.log(telegramId, nickname)
// 	return response.response.user
// }

// export const setUserAvatar = async (telegramId: any, avatarUrl: any) => {
// 	const response = await client.setUserAvatar({
// 		telegramId: telegramId,
// 		avatarUrl,
// 	})
// 	return response.response
// }
// export const getUserAvatar = async (telegramId: any) => {
// 	const response = await client.getUserAvatar({ telegramId })
// 	return response?.response?.avatar?.avatarUrl
// }

// export const getUserReferrals = async (telegramId: any) => {
// 	const response = await client.getUserReferrals({ telegramId })
// 	console.log(response.response)
// 	return response.response
// }

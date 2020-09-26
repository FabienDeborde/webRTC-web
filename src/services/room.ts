import { AxiosResponse } from 'axios'
import { createApi } from './axios'
import {
  RoomData,
  RoomAccess,
  SendInvitation,
  RoomCreateResponse,
  RoomAccessResponse
} from '../typings'
const api = createApi()

export const createRoom = (data: RoomData): Promise<AxiosResponse<RoomCreateResponse>> => {
  return api.post('/rooms', data)
}
export const accessRoom = (data: RoomAccess): Promise<AxiosResponse<RoomAccessResponse>> => {
  return api.post('/rooms/access', data)
}
export const sendInvitation = (data: SendInvitation): Promise<AxiosResponse<any>> => {
  return api.post('/rooms/invite', data)
}

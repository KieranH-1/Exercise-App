import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'

export interface User {
  user_id: number
  username: string
  password: string
  first: string
  last: string
  email: string
  profile_picture: string
  admin: boolean
}

export function getAll(): Promise<DataListEnvelope<User>> {
  return api('users')
}

export function get(id: number): Promise<User> {
  return api(`users/${id}`)
}

export function searchUser(
  search: string,
  page: number,
  limit: number,
): Promise<DataListEnvelope<User>> {
  return api(`users/search/${search}?page=${page}&limit=${limit}`)
}

export function create(data: User) {
  return api<User>('users', data)
}
export function update(data: User) {
  return api<User>(`users/${data.user_id}`, data, 'PATCH')
}

export function remove(user_id: number) {
  return api<User>(`users/${user_id}`, undefined, 'DELETE')
}

import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'

export interface User {
  id: number
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

import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
import type { User } from './users'

export interface Post {
  post_id: number
  user_id: number
  username: string
  profile_picture: string
  email: string
  exercise: string
  equipment: string
  description: string
  duration: number
  sets: number | null
  reps: number | null
  created_at: string
  image: string | null
}

export function get(id: number): Promise<DataListEnvelope<Post>> {
  return api(`posts/${id}`)
}

export function getAll(): Promise<DataListEnvelope<Post>> {
  return api('posts')
}

export function create(data: Post) {
  return api<Post>('posts', data)
}

export function remove(post_id: number) {
  return api<Post>(`posts/${post_id}`, undefined, 'DELETE')
}

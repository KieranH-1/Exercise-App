import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
import type { User } from './users'

export interface Post {
  user: User
  exercise: string
  equipment: string
  description: string
  duration: number
  sets: number | null
  reps: number | null
  created_at: string
  image: string | null
}

export function get(id: number): Promise<Post> {
  return api(`posts/${id}`)
}

export function getAll(): Promise<DataListEnvelope<Post>> {
  return api('posts')
}

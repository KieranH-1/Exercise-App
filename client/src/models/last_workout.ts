import { api } from './myFetch'
import type { User } from './users'

export interface Last_Workout {
  user: User
  description: string
  type: string
  muscle_group: string
  image_url: string | null
}

export function get(id: number): Promise<Last_Workout> {
  return api(`last_workout/${id}`)
}

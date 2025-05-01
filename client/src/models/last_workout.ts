import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './myFetch'

export interface Last_Workout {
  user_id: number
  duration: number
  sets: number | null
  reps: number | null
  exercise: string
  created_at: string
}

export function get(user_id: number): Promise<DataListEnvelope<Last_Workout>> {
  return api(`last_workout/${user_id}`)
}

export function update(data: Last_Workout) {
  return api<Last_Workout>(`last_workout/${data.user_id}`, data, 'PATCH')
}

export function create(data: Last_Workout) {
  return api<Last_Workout>('last_workout', data)
}

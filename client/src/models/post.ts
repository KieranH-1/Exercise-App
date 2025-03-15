import type { Equipment, Exercise } from "./exercises"
import type { User } from "./users"

export interface Post {
    user: User
    exercise: Exercise
    equipment: Equipment
    duration: number
    sets: number
    reps: number
}
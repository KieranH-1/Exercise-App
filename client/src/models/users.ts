import type { Exercise } from "./exercises"
import type { Post } from "./post"

export interface User {
  username: string
  name: {
    first: string
    last: string
  }
  email: string
  password: string
  profilePicture: string
  lastWorkout: Exercise[]
  activity: Post[]
  friends: User[]
  admin: boolean
}

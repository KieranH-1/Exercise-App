import type { Exercise } from './exercises'
import type { Post } from './post'
import { ref } from 'vue'

export interface User {
  id: number
  username: string
  name: {
    first: string
    last: string
  }
  email: string
  password: string
  profile_picture: string
  lastWorkout: {
    name: string
    duration: number
    sets: number
    reps: number
    timestamp: string
  }
  posts: Post[]
  admin: boolean
}
const user = ref<User | null>(null)

const allUsers = ref<User[]>(users.items)

export function refUser() {
  return user
}

export function getAllUsers() {
  return allUsers
}

export function setUser(userId: number) {
  user.value = users.items.find((item) => item.id == userId) as User
}

export function getUser(id: number): User {
  return users.items.find((item) => item.id == id) as User
}

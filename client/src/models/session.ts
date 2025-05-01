import { ref } from 'vue'
import * as myFetch from './myFetch'
import { get, type User } from './users'

export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return myFetch.api<T>(action, data, method, headers)
}

const session = ref({
  user: null as User | null,
  token: null as string | null,
})

export function refSession() {
  return session
}

export const isAdmin = () => session.value?.user?.admin === true

export const isLoggedIn = () => session.value?.user !== null

export function login(id: number) {
  console.log('login', id)
  return get(id).then((user) => {
    session.value.user = user
  })
}
export function logout() {
  console.log(session.value.user)
  session.value.user = null
  session.value.token = null
}

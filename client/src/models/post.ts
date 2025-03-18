import { ref } from "vue"
import users from "../data/users.json"

export interface Post {
    exercise: string
    equipment: string
    description: string
    duration: number
    sets: number | null
    reps: number | null
    timestamp: string
    image: string | null
}

const posts = ref<Post[]>([])

const post = ref<Post>({
    exercise: '',
    equipment: '',
    duration: 0,
    sets: 0,
    reps: 0,
    description: '',
    timestamp: new Date().toISOString(),
    image: ''
  })

export function refPosts() {
    return posts
}

export function refPost() {
    return post
}

export function getAllPosts() {
    for (let i = 0; i < users.items.length; i++) {
        posts.value.push(...users.items[i].posts)
    }
    return posts
}

export function addPost(post: Post) {
    posts.value.push(post)
}

export function removePost(index: number) {
    posts.value.splice(index, 1)
}


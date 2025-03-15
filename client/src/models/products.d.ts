interface User {
  id: number
  name: {
    first: string
    last: string
  }
  email: string
  password: string
  profilePicture: string
}

interface Exercise {
  name: string
  description: string
  duration: number
  pictureUrl: string
}

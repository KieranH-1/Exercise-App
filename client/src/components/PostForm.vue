<script setup lang="ts">
import { ref } from 'vue'
import { create, type Post } from '@/models/posts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { refSession } from '@/models/session'

dayjs.extend(relativeTime)

const session = refSession()
const curUser = session.value.user

const newPost = ref<Partial<Post>>({
  description: '',
  exercise: '',
  equipment: '',
  duration: 0,
  sets: 0,
  reps: 0,
  image: '',
})

async function createPost() {
  if (!curUser) {
    return
  }
  const post = {
    ...newPost.value,
    user_id: curUser.user_id,
    username: curUser.username,
    profile_picture: curUser.profile_picture,
    email: curUser.email,
  } as Post

  const response = await create(post)

  newPost.value = {
    description: '',
    exercise: '',
    equipment: '',
    duration: 0,
    sets: 0,
    reps: 0,
    image: '',
  }
}

async function updateLatestWorkout(){
  
}

async function submitPost(){
  await createPost()
}
</script>

<template>
  <form @submit.prevent="submitPost">
    <div class="field">
      <label class="label">Exercise</label>
      <div class="control">
        <input class="input" type="text" v-model="newPost.exercise" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Equipment</label>
      <div class="control">
        <input class="input" type="text" v-model="newPost.equipment" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Duration (minutes)</label>
      <div class="control">
        <input class="input" type="number" v-model="newPost.duration" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Sets</label>
      <div class="control">
        <input class="input" type="number" v-model="newPost.sets" />
      </div>
    </div>
    <div class="field">
      <label class="label">Reps</label>
      <div class="control">
        <input class="input" type="number" v-model="newPost.reps" />
      </div>
    </div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" v-model="newPost.description" required></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Image URL</label>
      <div class="control">
        <input class="input" type="text" v-model="newPost.image" />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <input class="button is-link" type="submit" id="submit" value="Submit"></input>
      </div>
    </div>
  </form>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>

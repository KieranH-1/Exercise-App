<script setup lang="ts">
import { ref } from 'vue'
import { addPost, refPost, type Post } from '@/models/posts'

const newPost = refPost()

const resetForm = () => {
  newPost.value = {
    exercise: '',
    equipment: '',
    duration: 0,
    sets: 0,
    reps: 0,
    description: '',
    timestamp: new Date().toISOString(),
    image: '',
  }
}

const emit = defineEmits(['submit', 'cancel'])

const submitForm = () => {
  emit('submit', newPost.value)
  resetForm()
}
</script>

<template>
  <form @submit.prevent="submitForm">
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
        <button class="button is-link" type="submit" @click="addPost(newPost)">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" type="button" @click="emit('cancel')">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import getProfile from './NavBar.vue'

const emit = defineEmits(['add-post'])

const userName = ref('')
const userEmail = ref('')
const userProfilePicture = ref('')
const newPost = ref('')
const newDate = ref('')
const newType = ref('')
const newDuration = ref('')

const addPost = () => {
  if (newPost.value.trim() && newDate.value && newType.value && newDuration.value) {
    const postData = {
      userName: userName.value,
      userEmail: userEmail.value,
      userProfilePicture: userProfilePicture.value,
      postContent: newPost.value,
      date: newDate.value,
      type: newType.value,
      duration: newDuration.value,
    }
    emit('add-post', postData)
    userName.value = ''
    userEmail.value = ''
    userProfilePicture.value = ''
    newPost.value = ''
    newDate.value = ''
    newType.value = ''
    newDuration.value = ''
  }
}
</script>

<template>
  <div class="box">
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="userProfilePicture" alt="Profile Picture" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ userName }}</p>
        <p class="subtitle is-6">{{ userEmail }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">New Post</label>
      <div class="control">
        <textarea class="textarea" v-model="newPost" placeholder="Write your post here"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <input class="input" type="date" v-model="newDate" />
      </div>
    </div>
    <div class="field">
      <label class="label">Type of Exercise</label>
      <div class="control">
        <input class="input" type="text" v-model="newType" placeholder="e.g., Running, Cycling" />
      </div>
    </div>
    <div class="field">
      <label class="label">Duration (minutes)</label>
      <div class="control">
        <input
          class="input"
          type="number"
          v-model="newDuration"
          placeholder="Duration in minutes"
        />
      </div>
    </div>
    <div class="control">
      <button class="button is-primary" @click="addPost">Post</button>
    </div>
  </div>
</template>

<style scoped>
.image {
  border-radius: 50%;
}
</style>

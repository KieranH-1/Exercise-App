<script setup lang="ts">
import { ref } from 'vue'
import Post from '@/components/Post.vue'

const newActivity = ref('')
const showForm = ref(false)

const addActivity = () => {
  if (newActivity.value.trim()) {
    activities.value.push({ name: newActivity.value, completed: false })
    newActivity.value = ''
  }
}

const addPost = (postData) => {
  activities.value.push({
    name: `${postData.postContent} - ${postData.type} for ${postData.duration} on ${postData.date}`,
    completed: false,
  })
}

const toggleActivity = (index: number) => {
  activities.value[index].completed = !activities.value[index].completed
}

// Add 3 posts for the Kieran profile
addPost({
  userName: 'Kieran',
  userEmail: 'kieran@example.com',
  userProfilePicture: 'https://via.placeholder.com/64',
  postContent: 'Morning run',
  date: '2023-10-01',
  type: 'Running',
  duration: '30',
})

addPost({
  userName: 'Kieran',
  userEmail: 'kieran@example.com',
  userProfilePicture: 'https://via.placeholder.com/64',
  postContent: 'Evening yoga',
  date: '2023-10-02',
  type: 'Yoga',
  duration: '45',
})

addPost({
  userName: 'Kieran',
  userEmail: 'kieran@example.com',
  userProfilePicture: 'https://via.placeholder.com/64',
  postContent: 'Cycling in the park',
  date: '2023-10-03',
  type: 'Cycling',
  duration: '60',
})
</script>

<template>
  <div>
    <h2 class="title is-4">Exercise Activities</h2>
    <button class="button is-primary" @click="showForm = true">Add Activity</button>
    <div v-if="showForm" class="modal is-active">
      <div class="modal-background" @click="showForm = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Activity</p>
          <button class="delete" aria-label="close" @click="showForm = false"></button>
        </header>
        <section class="modal-card-body">
          <Post @add-post="addPost" />
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="showForm = false">Cancel</button>
        </footer>
      </div>
    </div>
    <ul>
      <li v-for="(activity, index) in activities" :key="index">
        <label class="box">
          <span :class="{ 'has-text-grey-light': activity.completed }">{{ activity.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.has-text-grey-light {
  text-decoration: line-through;
}
</style>

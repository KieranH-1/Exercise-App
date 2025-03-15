<script setup lang="ts">
import ActivityListNew from '@/components/ActivityListNew.vue'
import { ref } from 'vue'

const userPosts = ref([])
const selectedProfile = ref('')

const addPost = (postData) => {
  if (postData.userName === selectedProfile.value) {
    userPosts.value.push(postData)
  }
}

const handleProfileSelection = (profile) => {
  selectedProfile.value = profile
  userPosts.value = [] // Clear posts when profile changes
}
</script>

<template>
  <main>
    <h1 class="title is-3">Your Activity Feed</h1>
    <ActivityListNew @add-post="addPost" />
    <ul>
      <li v-for="(post, index) in userPosts" :key="index">
        <p>{{ post.postContent }} - {{ post.type }} for {{ post.duration }} on {{ post.date }}</p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const allPosts = ref([])

const addPost = (postData) => {
  allPosts.value.push(postData)
}
</script>

<template>
  <main>
    <h1 class="title is-3">Friends' Activity Feed</h1>
    <ul>
      <li v-for="(post, index) in allPosts" :key="index">
        <p>{{ post.postContent }} - {{ post.type }} for {{ post.duration }} on {{ post.date }}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>

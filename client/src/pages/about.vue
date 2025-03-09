<script setup lang="ts">
import { useNow } from '@vueuse/core'

const { now, pause, resume } = useNow({ controls: true })
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>About the best class at New Paltz</h2>
  </div>
  <div>
    <p>Current Time: {{ now }}</p>
    <button class="button" @click="pause">Pause</button>
    <button class="button" @click="resume">Resume</button>
  </div>
</template>

<style></style>

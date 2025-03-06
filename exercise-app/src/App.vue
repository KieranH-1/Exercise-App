<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main class="container">
    <RouterView />

    <div class="columns">
      <div class="column"></div>
    </div>
  </main>
</template>

<style scoped>
body {
  background-color: #f5f5f5;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}
</style>

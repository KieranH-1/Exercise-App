<script setup lang="ts">
import { ref } from 'vue'
import type { DataListEnvelope } from '@/models/dataEnvelopes'
import { type User, getAll } from '@/models/users'

const users = ref({} as DataListEnvelope<User>)
const user = ref('')

getAll().then((response) => {
  users.value = response
})
</script>

<template>
  <div class="search-page">
    <section class="odocs-spaced">
      <o-field label="Search for Users">
        <o-autocomplete
          v-model="user"
          :options="users.items.map((user) => user.username)"
          rounded
          expanded
          placeholder="e.g. jQuery"
          icon="search"
          clearable
          open-on-focus
        >
        </o-autocomplete>

        <p><b>Selected:</b> {{ user }}</p>
      </o-field>
    </section>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}
input[type='text'] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.error {
  color: red;
  margin-bottom: 1rem;
}
</style>

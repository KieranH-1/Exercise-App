<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DataListEnvelope } from '@/models/dataEnvelopes'
import { type User, getAll } from '@/models/users'

const users = ref({} as DataListEnvelope<User>)
const user = ref<string | null>(null)

getAll().then((response) => {
  users.value = response
})

// Find the selected user object by username
const selectedUser = computed(
  () => users.value.items?.find((u) => u.username === user.value) ?? null,
)
</script>

<template>
  <div class="search-page">
    <section class="odocs-spaced">
      <o-field label="Search for Users">
        <o-autocomplete
          v-model="user"
          :options="users.items.map((user) => user.username) || []"
          rounded
          expanded
          placeholder="e.g. jQuery"
          icon="search"
          clearable
          open-on-focus
        >
        </o-autocomplete>

        <div v-if="selectedUser">
          <p><b>Selected User:</b></p>
          <ul>
            <li><b>Username:</b> {{ selectedUser.username }}</li>
            <li><b>Email:</b> {{ selectedUser.email }}</li>
            <li v-if="selectedUser.first">
              <b>Name:</b> {{ selectedUser.first }} {{ selectedUser.last }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p><b>No user selected.</b></p>
        </div>
      </o-field>
    </section>
  </div>
</template>

<style scoped>
o-field,
.odocs-spaced {
  width: auto;
  display: flex;
  flex-wrap: wrap;
}

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

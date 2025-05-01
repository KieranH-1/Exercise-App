<script setup lang="ts">
import { create, type User } from '@/models/users'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ref } from 'vue'

dayjs.extend(relativeTime)

const newUser = ref({} as User)

async function createUser() {
  return await create(newUser.value)
  alert('User created successfully!')
}

async function registerSubmit() {
  await createUser()
}
</script>

<template>
  <main class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <h1 class="title">Register</h1>
          <form @submit.prevent="registerSubmit()">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Username"
                  v-model="newUser.username"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  v-model="newUser.password"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Email" v-model="newUser.email" />
              </div>
            </div>

            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="First Name" v-model="newUser.first" />
              </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Last Name" v-model="newUser.last" />
              </div>
            </div>

            <div class="field">
              <label class="label">Profile Picture URL</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Profile Picture URL"
                  v-model="newUser.profile_picture"
                />
              </div>
            </div>

            <div class="field">
              <button class="button is-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

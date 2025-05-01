<script setup lang="ts">
import { ref } from 'vue'
import { isAdmin, isLoggedIn, login, logout, refSession } from '@/models/session'
import { getAll, type User } from '@/models/users'

const users = ref<User[]>([])

getAll().then((response) => {
  console.log(response) // Check if `id` exists in the response
  users.value = response.items
})

const session = refSession()
</script>

<template>
  <div class="profile" v-if="isLoggedIn()">
    <figure class="image is-32x32 is-square">
      <img class="is-rounded" :src="session?.user?.profile_picture" alt="Profile Picture" />
    </figure>
    <h1>{{ session?.user?.username }}</h1>
    <div>
      <a @click="logout()" class="button is-danger">Logout</a>
    </div>
  </div>
  <div class="buttons" v-else>
    <RouterLink to="/sign-up" class="button is-link">
      <strong>Sign up</strong>
    </RouterLink>
    <div class="navbar-item has-dropdown is-right is-hoverable">
      <a class="button is-light">
        <span>Log in</span>
        <span class="icon is- is-right">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <div class="navbar-dropdown">
        <div class="dropdown-content">
          <a
            class="navbar-item"
            v-for="user in users"
            :key="user.user_id"
            @click="login(user.user_id)"
            >{{ user.username }}
          </a>
          <hr class="navbar-divider" />
          <RouterLink to="/login" class="navbar-item">Login</RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="navbar-item" v-if="isAdmin()">
    <RouterLink to="/admin" class="button is-light"> Admin </RouterLink>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: small;
}

h1 {
  color: black;
  font-size: medium;
  margin-left: 0.5em;
}
</style>

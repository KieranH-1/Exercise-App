<script setup lang="ts">
import { ref } from 'vue'
import { getAllUsers } from '@/models/users'

const users = getAllUsers()
</script>

<template>
  <div class="container">
    <h1 class="title">Admin Page</h1>
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.name.first }}</td>
          <td>{{ user.name.last }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

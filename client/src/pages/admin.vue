<script setup lang="ts">
import type { DataListEnvelope } from '@/models/dataEnvelopes'
import { getAll, type User, update, remove } from '@/models/users'
import { ref } from 'vue'

const users = ref({} as DataListEnvelope<User>)
const editingUser = ref({} as User)
const showForm = ref(false)

getAll().then((response) => {
  users.value = response
})


function editUser(user: User) {
  editingUser.value = user
  showForm.value = true
}

async function updateUser(){
  console.log(editingUser)
  if (editingUser) {
  await update(editingUser.value)
  users.value = await getAll()
  }
}

async function submitUpdate() {
  await updateUser()
  showForm.value = false
}

const deleteUser = async (user_id: number) => {
  await remove(user_id)
  users.value = await getAll()
}
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.items" :key="user.user_id">
          <td>{{ user.username }}</td>
          <td>{{ user.first }}</td>
          <td>{{ user.last }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin }}</td>
          <td>
            <button class="button is-small is-info" @click="editUser(user)">Edit</button>
            <button class="button is-small is-danger" @click="deleteUser(user.user_id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="modal-card-body">
      <h2 class="subtitle">Edit User</h2>
      <form @submit.prevent="submitUpdate">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" v-model="editingUser.username" type="text" required />
          </div>
        </div>
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" v-model="editingUser.first" type="text" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" v-model="editingUser.last" type="text" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" v-model="editingUser.email" type="email" required />
          </div>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" v-model="editingUser.admin" />
            Admin
          </label>
        </div>
        <div class="field">
          <div class="control">
            <input class="button is-link" type="submit" id="submit" value="Save"></input>
            <button class="button" type="button" @click="showForm = false">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

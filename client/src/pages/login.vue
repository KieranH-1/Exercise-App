<script setup lang="ts"></script>

<template>
  <main class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <h1 class="title">Login</h1>
          <form>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" placeholder="Enter your username" />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Enter your password" />
              </div>
            </div>

            <div class="field">
              <button class="button is-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

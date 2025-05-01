<script setup lang="ts">
import { get, type Last_Workout } from '@/models/last_workout'
import { isLoggedIn, refSession } from '@/models/session'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ref } from 'vue'

dayjs.extend(relativeTime)

const session = refSession()

const workout = ref({} as Last_Workout)

if (session.value.user) {
  get(session.value.user.user_id).then((response) => {
    workout.value = response.items[0]
  })
}
</script>
<template>
  <div class="stats">
    <h1 class="title is-3"><b>Last Workout</b></h1>

    <div class="box" v-if="isLoggedIn()">
      <div class="workout-item">
        <p>EXERCISE</p>
        <h1>{{ workout?.exercise }}</h1>
      </div>
      <div class="workout-item">
        <p>DURATION</p>
        <h1>{{ workout?.duration }} minutes</h1>
      </div>
      <div v-if="workout?.sets" class="workout-item">
        <p>SETS</p>
        <h1>{{ workout.sets }}</h1>
      </div>
      <div v-if="workout?.reps" class="workout-item">
        <p>REPS</p>
        <h1>{{ workout.reps }}</h1>
      </div>
      <div class="workout-item">
        <p>DATE</p>
        <h1>{{ workout?.created_at }}</h1>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  text-align: center;
}

.stats {
  padding: 20px;
}

.stats .box {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.workout-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.workout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.workout-item p {
  margin: 0;
  font-weight: bold;
  color: #555;
}

.workout-item h1 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}
</style>

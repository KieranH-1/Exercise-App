<script setup lang="ts"></script>
<template>
  <div class="stats">
    <h1 class="title is-3"><b>Last Workout</b></h1>

    <div class="box">
      <div class="workout-details">
        <div class="workout-item">
          <p>EXERCISE</p>
          <h1>{{ user?.lastWorkout.name }}</h1>
        </div>
        <div class="workout-item">
          <p>DURATION</p>
          <h1>{{ user?.lastWorkout.duration }} minutes</h1>
        </div>
        <div v-if="user?.lastWorkout.sets" class="workout-item">
          <p>SETS</p>
          <h1>{{ user?.lastWorkout.sets }}</h1>
        </div>
        <div v-if="user?.lastWorkout.reps" class="workout-item">
          <p>REPS</p>
          <h1>{{ user?.lastWorkout.reps }}</h1>
        </div>
        <div class="workout-item">
          <p>DATE</p>
          <h1>{{ user?.lastWorkout.timestamp }}</h1>
        </div>
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

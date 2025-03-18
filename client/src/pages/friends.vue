<script setup lang="ts">
import { refUser } from '@/models/users'
import {getAllUsers} from '@/models/users'

const curUser = refUser()
const users = getAllUsers()
</script>

<template>
  <h1 class="title is-3">All Activity</h1>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <li  v-for="(post, index) in user.posts" :key="index">
        <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64 is-square">
        <img class="is-rounded" :src="user?.profile_picture" alt="Profile Picture" />
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong v-if="user">{{ user.name.first }} &nbsp; {{ user.name.last }}</strong> &nbsp; <small v-if="user">@{{ user.email }}</small> &nbsp;
          <small>{{ post.timestamp }}</small>
          <br>
        </p>
        <h4>{{ post.description }}</h4>
        <div class="post-details">
          <div><p>EXERCISE</p><h1>{{ post.exercise }}</h1></div>
          <div><p>EQUIPMENT</p><h1>{{ post.equipment }}</h1></div>
          <div><p>DURATION</p><h1>{{ post.duration }} minutes</h1></div>
          <div v-if="post.sets"><p>SETS</p><h1>{{ post.sets }}</h1></div>
          <div v-if="post.reps"><p>REPS</p><h1>{{ post.reps }}</h1></div>
          <img :src="post.image ?? ''" alt="Post Image" />
        </div>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
</li>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.has-text-grey-light {
  text-decoration: line-through;
}

.box {
  margin-bottom: 1rem;
}

.button.is-center {
  display: block;
  width: 200px;
}

.post-details h1 {
  margin-top: 0;
}

.post-details p{
  margin-bottom: 3px;
}
.post-details {
  text-align: center;
}

.post-details div {
  margin-right: 20px;
}

.post-details {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

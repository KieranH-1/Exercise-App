<script setup lang="ts">
import { ref } from 'vue'
import { get, remove, type Post } from '@/models/posts'
import { type DataListEnvelope } from '@/models/dataEnvelopes'
import PostForm from '../components/PostForm.vue' // Import the PostForm component
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRoute } from 'vue-router'
import { isLoggedIn, refSession } from '@/models/session'

dayjs.extend(relativeTime)

const showForm = ref(false)

const posts = ref({} as DataListEnvelope<Post>)
const session = refSession()

if (session.value.user) {
  get(session.value.user.user_id).then((response) => {
    posts.value = response
  })
}

async function deletePost(post_id: number) {
  const response = await remove(post_id)
  posts.value?.items.splice(
    posts.value.items.findIndex((post) => post.post_id === post_id),
    1,
  )
}
</script>

<template>
  <h1 class="title is-3">Your Activity</h1>
  <div>
    <button class="button is-primary" @click="showForm = true">Add Activity</button>
    <div v-if="showForm" class="modal is-active">
      <div class="modal-background" @click="showForm = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Activity</p>
          <button class="delete" aria-label="close" @click="showForm = false"></button>
        </header>
        <section class="modal-card-body">
          <PostForm @cancel="showForm = false" />
          <!-- Use the PostForm component -->
        </section>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="(post, index) in posts.items" :key="index">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64 is-square">
                  <img class="is-rounded" :src="post.profile_picture" alt="Profile Picture" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ post.username }}</strong>
                    &nbsp; <small>@{{ post.email }}</small> &nbsp;
                    <small>{{ post.created_at }}</small>
                    <br />
                  </p>
                  <h4>{{ post.description }}</h4>
                  <div class="post-details">
                    <div>
                      <p>EXERCISE</p>
                      <h1>{{ post.exercise }}</h1>
                    </div>
                    <div>
                      <p>EQUIPMENT</p>
                      <h1>{{ post.equipment }}</h1>
                    </div>
                    <div>
                      <p>DURATION</p>
                      <h1>{{ post.duration }} minutes</h1>
                    </div>
                    <div v-if="post.sets">
                      <p>SETS</p>
                      <h1>{{ post.sets }}</h1>
                    </div>
                    <div v-if="post.reps">
                      <p>REPS</p>
                      <h1>{{ post.reps }}</h1>
                    </div>
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
                    <a class="level-item" aria-label="delete" @click="deletePost(post.post_id)">
                      <span class="icon is-small">
                        <i class="fas fa-trash" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </li>
      </ul>
    </div>
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

.post-details p {
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

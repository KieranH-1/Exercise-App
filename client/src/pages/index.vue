<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type Post } from '@/models/posts'
import { type DataListEnvelope } from '@/models/dataEnvelopes'
import PostForm from '../components/PostForm.vue' // Import the PostForm component
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRoute } from 'vue-router'
import { refSession } from '@/models/session'

dayjs.extend(relativeTime)

const showForm = ref(false)

const route = useRoute('/posts/[id]')
const posts = ref({} as DataListEnvelope<Post>)

const newPost = ref<Partial<Post>>({
  description: '',
  exercise: '',
  equipment: '',
  duration: 0,
  sets: 0,
  reps: 0,
  image: '',
})

const session = refSession()

getAll().then((response) => {
  posts.value = response
})

async function SubmitPost() {
  const curUser = session.value.user

  if (!curUser) {
    return
  }

  const post = {
    ...newPost.value,
    user: curUser,
    created_at: new Date().toLocaleDateString(),
    username: curUser.username,
    profile_picture: curUser.profile_picture,
    email: curUser.email,
  } as Post

  newPost.value = {
    description: '',
    exercise: '',
    equipment: '',
    duration: 0,
    sets: 0,
    reps: 0,
    image: '',
  }
}

async function DeletePost(index: number) {
  const post_id = posts.value.items[index].id
  await fetch(`http://localhost:3000/posts/${post_id}`, {
    method: 'DELETE',
  })
  posts.value.items.splice(index, 1)
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
          <PostForm @submit="Post(newPost)" @cancel="showForm = false" />
          <!-- Use the PostForm component -->
        </section>
      </div>
    </div>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
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
                  <strong v-if="user">{{ user.name.first }} &nbsp; {{ user.name.last }}</strong>
                  &nbsp; <small v-if="user">@{{ user.email }}</small> &nbsp;
                  <small>{{ post.timestamp }}</small>
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
                  <figure>
                    <img :src="post.image ?? ''" alt="Post Image" />
                  </figure>
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
                  <a class="level-item" aria-label="delete" @click="DeletePost(index)">
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

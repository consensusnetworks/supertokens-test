<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as Session from 'supertokens-web-js/recipe/session'

let session = ref(false)
let userAddress = ref('')

/**
 * Get current user
 */
async function getUser() {
  session.value = await Session.doesSessionExist()
  if (session.value) {
    userAddress.value = await Session.getUserId()

    /** Make an authenticated request for user data */
    const user = await fetch('http://localhost:4000/user')
    console.log(await user.json())
  }
}

/**
 * Sign in with wallet address
 */
async function signIn() {
  await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userAddress: '0xd557a5745d4560B24D36A68b52351ffF9c86A212',
    })
  })
  await getUser()
}

/**
 * Sign out of current session
 */
async function signOut() {
  await Session.signOut()
  session.value = false
  userAddress.value = ''
}

/**
 * Get current user or prompt wallet auth
 */
onMounted(async () => {
  await getUser()
})
</script>

<template>
  <div class="main">
    <h1>SuperTokens Test</h1>
    <div>
      <p>{{ userAddress ? 'Signed in with' : 'Not signed in' }}</p>
      <h3>{{ userAddress || '–' }}</h3>
    </div>
    <div v-if="session">
      <button @click="signOut">
        Sign out
      </button>
    </div>
    <div v-else>
      <button @click="signIn">
        Sign in
      </button>
    </div>
  </div>
</template>
<style scoped>
.main {
  text-align: center;
}
h3 {
  color: #ff3e00;
}
h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}
button {
  cursor: pointer;
  background-color: #ffb399;
  border: none;
  color: rgb(82, 82, 82);
  padding: 0.75rem;
  margin: 2rem;
  transition: all 0.5s ease-in-out;
  border-radius: 2rem;
  font-size: large;
}
button:hover {
  transform: scale(1.1);
  background-color: #ff3e00;
  color: white;
}
</style>

<template>
  <div>
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Sign in</h1>
      </div>
      <LoadingBox v-if="login.loading" />
      <MessageBox v-if="login.error" variant="danger">{{
      login.error
      }}</MessageBox>
      <div>
        <label for="email">Email</label><input id="email" type="email" v-model="email" required
          placeholder="Enter email" />
      </div>
      <div>
        <label for="name">Password</label><input id="password" type="password" v-model="password" required
          placeholder="Enter password" />
      </div>
      <div><button class="primary" type="submit">Sign in</button></div>
      <div>
        <label />
        <div>
          New Customer?
          <router-link :to="`/register?redirect=${redirect}`">
            Register
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores";

const router = useRouter();
const userStore = useUserStore();
const { login } = storeToRefs(userStore);
const email = ref("");
const password = ref("");
const redirect = ref("/");

if (location.search) {
  redirect.value = location.search.split("=")[1];
  if (login.userInfo) router.push(redirect.value);
}

function submitHandler() {
  userStore.signin(email.value, password.value);
}

watch(login, (val) => {
  console.log(`userinfo watcher ${JSON.stringify(val)}`);
  if (val?.userInfo) router.push(redirect.value);
});
</script>

<style>

</style>

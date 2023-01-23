<template>
  <div>
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Create Account</h1>
      </div>
      <LoadingBox v-if="loading" />
      <MessageBox v-if="error" variant="danger">{{ error }}</MessageBox>
      <div>
        <label for="name">Name</label><input id="name" type="text" v-model="name" required placeholder="Enter name" />
      </div>
      <div>
        <label for="email">Email</label><input id="email" type="email" v-model="email" required
          placeholder="Enter email" />
      </div>
      <div>
        <label for="name">Password</label><input id="password" type="password" v-model="password" required
          placeholder="Enter password" />
      </div>
      <div>
        <label for="email">Confirm Password</label><input id="confirmPassword" type="password" v-model="confirmPassword"
          required placeholder="Enter password again" />
      </div>
      <div><button class="primary" type="submit">Register</button></div>
      <div>
        <label />
        <div>
          Already have an account?
          <router-link :to="`/signin?redirect=${redirect}`">Sign in</router-link>
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
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const redirect = ref("/");

if (location.search) {
  redirect.value = location.search.split("=")[1];
}

const userStore = useUserStore();
const { register } = storeToRefs(userStore);

watch(register, (val) => {
  if (val.userInfo) {
    router.push(redirect.value);
  }
});

function submitHandler() {
  if (password.value !== confirmPassword.value) {
    alert("Password and confirm password are not match");
  } else {
    userStore.signup(name.value, email.value, password.value);
  }
}
</script>

<style>

</style>

<template>
  <form @submit.prevent="submitHandler" class="form">
    <div>
      <h1>User Profile</h1>
    </div>
    <LoadingBox v-if="details.loading" />
    <MessageBox v-else-if="details.error" variant="danger">{{
      details.error
    }}</MessageBox>
    <div v-else>
      <LoadingBox v-if="updateProfile.loading" />
      <MessageBox v-if="updateProfile.error" variant="danger">{{
        updateProfile.error
      }}</MessageBox>
      <MessageBox v-if="updateProfile.success" variant="success">
        Profile Updated Successfully
      </MessageBox>
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="Enter name" v-model="name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          v-model="password"
        />
      </div>
      <div>
        <label for="confirmPassword">confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          v-model="confirmPassword"
        />
      </div>
      <div v-if="details.user.isSeller">
        <h2>Seller</h2>
        <div>
          <label for="sellerName">Seller Name</label>
          <input
            id="sellerName"
            type="text"
            placeholder="Enter Seller Name"
            v-model="sellerName"
          />
        </div>
        <div>
          <label for="sellerLogo">Seller Logo</label>
          <input
            id="sellerLogo"
            type="text"
            placeholder="Enter Seller Logo"
            v-model="sellerLogo"
          />
        </div>
        <div>
          <label for="sellerDescription">Seller Description</label>
          <input
            id="sellerDescription"
            type="text"
            placeholder="Enter Seller Description"
            v-model="sellerDescription"
          />
        </div>
      </div>
      <div><label /><button class="primary" type="submit">Update</button></div>
    </div>
  </form>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useUserStore } from "../stores";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const sellerName = ref("");
const sellerLogo = ref("");
const sellerDescription = ref("");

const userStore = useUserStore();
const { login, details, updateProfile } = storeToRefs(userStore);

function getUser(id) {
  userStore.resetUpdateProfile();
  userStore.getUserDetails(id);
}

function setUser(user) {
  name.value = user.name;
  email.value = user.email;
  if (user.seller) {
    sellerName.value = user.seller.name;
    sellerLogo.value = user.seller.logo;
    sellerDescription.value = user.seller.description;
  }
}

// ???????????????
watchEffect(() => {
  if (login.userInfo) {
    setUser(login.userInfo);
  } else {
    getUser(login.userInfo._id);
  }
});

function submitHandler() {
  if (password.value !== confirmPassword.value) {
    alert("Password and Confirm Password Are Not Matched");
  } else {
    userStore.updateUserProfile({
      userId: login.userInfo._id,
      name: name.value,
      email: email.value,
      password: password.value,
      sellerName: sellerName.value,
      sellerLogo: sellerLogo.value,
      sellerDescription: sellerDescription.value,
    });
  }
}
</script>

<style></style>

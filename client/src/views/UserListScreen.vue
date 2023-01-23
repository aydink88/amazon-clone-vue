<template>
  <div>
    <h1>Users</h1>
    <LoadingBox v-if="userDelete.loading" />
    <MessageBox variant="danger" v-if="userDelete.errorDelete">{{
    userDelete.errorDelete
    }}</MessageBox>
    <MessageBox variant="success" v-if="userDelete.success">User Deleted Successfully</MessageBox>
    <LoadingBox v-if="userList.loading" />
    <MessageBox v-else-if="userList.error" variant="danger">{{
    userList.error
    }}</MessageBox>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>IS SELLER</th>
          <th>IS ADMIN</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList.users" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isSeller ? "YES" : "NO" }}</td>
          <td>{{ user.isAdmin ? "YES" : "NO" }}</td>
          <td>
            <button type="button" class="small" @click="
              () => {
                $router.push(`/user/${user._id}/edit`);
              }
            ">
              Edit
            </button>
            <button type="button" class="small" @click="deleteHandler(user)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import { useUserStore } from "../stores";

const userStore = useUserStore();
const { userList, userDelete } = storeToRefs(userStore);

function fetchUsers() {
  userStore.listUsers();

  //todo ? user detail reset mutation
}

async function deleteHandler(user) {
  if (window.confirm("Are you sure?")) {
    await userStore.deleteUser(user._id);
  }
}

watchEffect(userDelete, () => {
  fetchUsers();
});
</script>

<style>

</style>

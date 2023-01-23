<template>
  <div>
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Edit User {{ name }}</h1>
        <LoadingBox v-if="update.loading" />
        <MessageBox v-if="update.error" variant="danger">
          {{ update.error }}
        </MessageBox>
        <LoadingBox v-if="details.loading" />
        <MessageBox v-else-if="details.error" variant="danger">
          {{ details.error }}
        </MessageBox>
        <div v-else>
          <div>
            <label for="name">Name</label>
            <input id="name" type="text" v-model="name" placeholder="Enter name" />
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" type="email" v-model="email" placeholder="Enter email" />
          </div>
          <div>
            <label for="isSeller">Is Seller</label>
            <input id="isSeller" type="checkbox" v-model="isSeller" />
          </div>
          <div>
            <label for="isAdmin">Is Admin</label>
            <input id="isAdmin" type="checkbox" v-model="isAdmin" />
          </div>
          <div><button class="primary" type="submit">Update</button></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores";

const props = defineProps({ id: String });
const name = ref("");
const email = ref("");
const isSeller = ref(false);
const isAdmin = ref(false);

const router = useRouter();

const userStore = useUserStore();
const { details, update } = storeToRefs(userStore);

watch(update, (val) => {
  if (val.success) {
    userStore.resetUpdate();
    router.push("/userlist");
  }
});

onMounted(async () => {
  await userStore.getUserDetails(props.id);
  if (details.user) {
    name.value = details.user.name;
    email.value = details.user.email;
    isSeller.value = details.user.isSeller;
    isAdmin.value = details.user.isAdmin;
  }
});

function submitHandler() {
  userStore.updateUser({
    _id: this.id,
    name: name.value,
    email: email.value,
    isSeller: isSeller.value,
    isAdmin: isAdmin.value,
  });
}
</script>

<style>

</style>

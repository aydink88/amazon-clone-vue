<template>
  <div>
    <h1>Orders</h1>
    <LoadingBox v-if="orderDelete.loading" />
    <MessageBox v-if="orderDelete.error" variant="danger">{{
    orderDelete.error
    }}</MessageBox>
    <LoadingBox v-if="orderList.loading" />
    <MessageBox v-else-if="orderList.error" variant="danger">{{
    orderList.error
    }}</MessageBox>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>USER</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderList.orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.createdAt.substring(0, 10) }}</td>
          <td>{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.isPaid ? order.paidAt.substring(0, 10) : "No" }}</td>
          <td>
            {{ order.isDelivered ? order.deliveredAt.substring(0, 10) : "No" }}
          </td>
          <td>
            <button type="button" class="small" @click="$router.push(`/order/${order._id}`)">
              Details</button><button type="button" class="small" @click="deleteHandler(order)">
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
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useOrderStore, useUserStore } from "../stores";

const route = useRoute();
const sellerMode = ref(true);
const userStore = useUserStore();
const orderStore = useOrderStore();
const { login } = storeToRefs(userStore);
const { orderList, orderDelete } = storeToRefs(orderStore);

const refresh = () => {
  orderStore.orderDelete = {};
  orderStore.listOrders(sellerMode.value ? login.userInfo._id : "");
};

watch(sellerMode, () => refresh());
watch(login, (newVal, oldVal) => {
  if (newVal.userInfo._id !== oldVal.userInfo._id) refresh();
});
watch(
  () => route.path,
  (to) => {
    to.path.includes("/seller")
      ? (sellerMode.value = true)
      : (sellerMode.value = false);
  }
);

const deleteHandler = (order) => {
  if (window.confirm("Are you sure to delete?")) {
    orderStore.deleteOrder(order._id);
  }
};

onMounted(() => {
  sellerMode.value = route.path.includes("/seller");
  if (sellerMode.value) refresh();
});
</script>

<style>

</style>

<template>
  <div>
    <h1>Order History</h1>
    <LoadingBox v-if="orderMineList.loading" />
    <MessageBox v-else-if="orderMineList.error" variant="danger">{{
      orderMineList.error
    }}</MessageBox>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderMineList.orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.createdAt.substring(0, 10) }}</td>
          <td>{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.isPaid ? order.paidAt.substring(0, 10) : "No" }}</td>
          <td>
            {{ order.isDelivered ? order.deliveredAt.substring(0, 10) : "No" }}
          </td>
          <td>
            <button
              type="button"
              class="small"
              @click="$router.push(`/order/${order._id}`)"
            >
              Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useOrderStore } from "../stores";

const orderStore = useOrderStore();
const { orderMineList } = storeToRefs(orderStore);
onMounted(async () => await orderStore.listOrderMine());
</script>

<style></style>

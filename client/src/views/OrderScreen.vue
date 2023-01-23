<template>
  <LoadingBox v-if="orderDetails.loading" />
  <MessageBox v-else-if="orderDetails.error" variant="danger">{{
    orderDetails.error
  }}</MessageBox>
  <div v-else>
    <h1>Order {{ orderDetails.order._id }}</h1>
    <div class="row top">
      <div class="col-2">
        <ul>
          <li>
            <div class="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {{ orderDetails.order.shippingAddress.fullName }}
                <br />
                <strong>Address: </strong>
                {{ orderDetails.order.shippingAddress.address }},
                {{ orderDetails.order.shippingAddress.city }},
                {{ orderDetails.order.shippingAddress.postalCode }},
                {{ orderDetails.order.shippingAddress.country }}
              </p>
              <MessageBox
                v-if="orderDetails.order.isDelivered"
                variant="success"
              >
                Delivered at {{ orderDetails.order.deliveredAt }}
              </MessageBox>
              <MessageBox v-else variant="danger">Not Delivered</MessageBox>
            </div>
          </li>
          <li>
            <div class="card card-body">
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {{ orderDetails.order.paymentMethod }}
              </p>
              <MessageBox v-if="orderDetails.order.isPaid" variant="success">
                Paid at {{ orderDetails.order.paidAt }}
              </MessageBox>
              <MessageBox v-else variant="danger">Not Paid</MessageBox>
            </div>
          </li>
          <li>
            <div class="card card-body">
              <h2>Order Items</h2>
              <ul>
                <li
                  v-for="item in orderDetails.order.orderItems"
                  :key="item.product"
                >
                  <div class="row">
                    <div>
                      <img :src="item.image" :alt="item.name" class="small" />
                    </div>
                    <div class="min-30">
                      <router-link :to="`/product/${item.product}`">{{
                        item.name
                      }}</router-link>
                    </div>
                    <div>
                      {{ item.qty }} x ${{ item.price }} = ${{
                        item.qty * item.price
                      }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-1">
        <div class="card card-body">
          <ul>
            <li>
              <h2>Order Summary</h2>
            </li>
            <li>
              <div class="row">
                <div>Items</div>
                <div>${{ orderDetails.order.itemsPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>Shipping</div>
                <div>${{ orderDetails.order.shippingPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>Tax</div>
                <div>${{ orderDetails.order.taxPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>
                  <strong> Order Total</strong>
                </div>
                <div>
                  <strong
                    >${{ orderDetails.order.totalPrice.toFixed(2) }}</strong
                  >
                </div>
              </div>
            </li>
            <li v-if="!orderDetails.order.isPaid">
              <LoadingBox v-if="!sdkReady" />
              <MessageBox v-if="orderPay.error">{{
                orderPay.error
              }}</MessageBox>
            </li>
            <li
              v-if="
                login.userInfo.isAdmin && order.isPaid && !order.isDelivered
              "
            >
              <LoadingBox v-if="orderDeliver.loading" />
              <MessageBox v-if="orderDeliver.error" variant="danger">{{
                orderDeliver.error
              }}</MessageBox>
              <button
                class="primary block"
                type="button"
                @click="deliverHandler"
              >
                Deliver Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useOrderStore, useUserStore } from "../stores";

const props = defineProps(["id"]);
const sdkReady = ref(false);
const userStore = useUserStore();
const orderStore = useOrderStore();
const { orderDetails, orderPay, orderDeliver } = storeToRefs(orderStore);
const { login } = storeToRefs(userStore);

onMounted(() => {
  if (
    orderDetails.order ||
    orderPay.success ||
    orderDeliver.success ||
    (orderDetails.order && orderDetails.order._id !== props.id)
  ) {
    orderStore.orderPay = {};
    orderStore.orderDeliver = {};
    orderStore.getOrderDetails(props.id);
  } else {
    if (!orderDetails.order.isPaid) {
      sdkReady.value = true;
    }
  }
});

const addPaypalScript = () => {
  sdkReady.value = true;
};
const successPaymentHandler = (paymentResult) => {
  orderStore.payOrder(paymentResult);
};
const deliverHandler = () => {
  orderStore.deliverHandler(orderDetails.order._id);
};
</script>

<style></style>

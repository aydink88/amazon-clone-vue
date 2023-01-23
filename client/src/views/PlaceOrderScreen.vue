<template>
  <div>
    <CheckoutSteps step1 step2 step3 step4 />
    <div class="row top">
      <div class="col-2">
        <ul>
          <li>
            <div class="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>{{ cart.shippingAddress.fullName }}<br />
                <strong>Address: </strong>{{ cart.shippingAddress.address }},
                {{ cart.shippingAddress.city }},
                {{ cart.shippingAddress.postalCode }},
                {{ cart.shippingAddress.country }}
              </p>
            </div>
          </li>
          <li>
            <div class="card card-body">
              <h2>Payment</h2>
              <p><strong>Method: </strong>{{ cart.paymentMethod }}</p>
            </div>
          </li>
          <li>
            <div class="card card-body">
              <h2>Order Items</h2>
              <ul>
                <li v-for="item in cart.cartItems" :key="item.product">
                  <div class="row">
                    <div>
                      <img class="small" :src="item.image" :alt="item.name" />
                    </div>
                    <div class="min-30">
                      <router-link :to="`/product/${item.product}`">{{
                        item.name
                      }}</router-link>
                    </div>
                    <div>
                      {{ item.qty }} X ${{ item.price }} = ${{
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
            <li><h2>Order Summary</h2></li>
            <li>
              <div class="row">
                <div>Items</div>
                <div>${{ itemsPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>Shipping</div>
                <div>${{ shippingPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>Tax</div>
                <div>${{ taxPrice.toFixed(2) }}</div>
              </div>
            </li>
            <li>
              <div class="row">
                <div>
                  <strong> Order Total</strong>
                </div>
                <div>
                  <strong>${{ totalPrice.toFixed(2) }}</strong>
                </div>
              </div>
            </li>
            <li>
              <button
                type="button"
                @click="placeOrderHandler"
                class="primary block"
                :disabled="cart.cartItems.length === 0"
              >
                Place Order
              </button>
            </li>
            <LoadingBox v-if="orderCreate.loading" />
            <MessageBox v-if="orderCreate.error" variant="danger">{{
              orderCreate.error
            }}</MessageBox>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { CheckoutSteps, LoadingBox, MessageBox } from "../components";
import { useCartStore, useOrderStore } from "../stores";

const paymentMethod = ref("");
const router = useRouter();
const cart = useCartStore();
const orderStore = useOrderStore();
const { orderCreate } = storeToRefs(orderStore);

watch(orderCreate, (val) => {
  if (val.success) {
    cart.resetCreateOrder();
    router.push(`/order/${val.order._id}`);
  }
});

onMounted(() => {
  if (!cart.paymentMethod) {
    router.push("/payment");
  }
  paymentMethod.value = cart.paymentMethod;
});

const toPrice = (num) => Number(num.toFixed(2));

const itemsPrice = computed(() =>
  cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
);
const taxPrice = computed(() => toPrice(0.15 * itemsPrice.value));
const shippingPrice = computed(() =>
  itemsPrice.value > 100 ? toPrice(0) : toPrice(10)
);
const totalPrice = computed(
  () => shippingPrice.value + taxPrice.value + itemsPrice.value
);

function placeOrderHandler() {
  orderStore.createOrder({
    ...cart,
    itemsPrice: itemsPrice.value,
    shippingPrice: shippingPrice.value,
    taxPrice: taxPrice.value,
    totalPrice: totalPrice.value,
    orderItems: cart.cartItems,
  });
}
</script>

<style></style>

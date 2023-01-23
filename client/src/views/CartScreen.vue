<template>
  <div class="row top">
    <div class="col-2">
      <h1>Shopping Cart</h1>
      <MessageBox v-if="error" variant="danger">{{ error }}</MessageBox>
      <MessageBox v-if="cartItems.length === 0" variant="danger">
        Cart is empty. <router-link to="/">Go Shopping</router-link>
      </MessageBox>
      <ul v-else>
        <li v-for="item in cartItems" :key="item.product">
          <div class="row">
            <div><img :src="item.image" :alt="item.name" class="small" /></div>
            <div class="min-30">
              <router-link :to="`/product/${item.product}`">{{
                item.name
              }}</router-link>
            </div>
            <div>
              <select
                :value="item.qty"
                @change="
                  (e) => {
                    addToCart(item.product, Number(e.target.value));
                  }
                "
              >
                <option
                  v-for="x in [...Array(item.countInStock).keys()]"
                  :key="x + 1"
                  :value="x + 1"
                >
                  {{ x + 1 }}
                </option>
              </select>
            </div>
            <div>${{ item.price }}</div>
            <div>
              <button type="button" @click="removeFromCart(item.product)">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-1">
      <div class="card card-body">
        <ul>
          <li>
            <h2>
              Subtotal {{ cartItems.reduce((a, c) => a + c.qty, 0) }} items : $
              {{ cartItems.reduce((a, c) => a + c.price * c.qty, 0) }}
            </h2>
          </li>
          <li>
            <button
              type="button"
              @click="checkOut"
              class="primary block"
              :disabled="cartItems.length === 0"
            >
              Proceed to Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MessageBox } from "../components";
import { useCartStore } from "../stores";

const props = defineProps({ id: String });

const router = useRouter();
const cartStore = useCartStore();
const { cartItems, error } = storeToRefs(cartStore);
const qty = ref(1);
const addToCart = (id, qty) => cartStore.addToCart(id, qty);
const removeFromCart = (id) => cartStore.removeFromCart(id);
const checkOut = () => router.push("/signin?redirect=shipping");

qty.value = location.search ? Number(location.search.split("=")[1]) : 1;
if (props.id) {
  addToCart(props.id, qty.value);
}
</script>

<style></style>

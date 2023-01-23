<template>
  <div>
    <CheckoutSteps step1 step2 step3 />
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Payment Method</h1>
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            v-model="paymentMethod"
          />
          <label for="paypal">PayPal</label>
        </div>
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            v-model="paymentMethod"
          />
          <label for="stripe">Stripe</label>
        </div>
      </div>
      <div>
        <label />
        <button class="primary" type="submit">Continue</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CheckoutSteps from "../components/CheckoutSteps.vue";
import { useCartStore } from "../stores";

const router = useRouter();
const paymentMethod = ref("Paypal");
const cartStore = useCartStore();
const submitHandler = () => {
  cartStore.savePaymentMethod(paymentMethod.value);
  router.push("/placeorder");
};
</script>

<style></style>

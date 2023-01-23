<template>
  <div class="row checkout-steps">
    <div :class="{ active: step1 }">Sign In</div>
    <div :class="{ active: step2 }">Shipping</div>
    <div :class="{ active: step3 }">Payment</div>
    <div :class="{ active: step4 }">Place Order</div>
  </div>
</template>

<script>
export default {
  name: "CheckoutSteps",
  props: {
    step1: { type: Boolean, default: false },
    step2: { type: Boolean, default: false },
    step3: { type: Boolean, default: false },
    step4: { type: Boolean, default: false },
  },
};
</script>

<style></style>

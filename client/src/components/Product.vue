<template>
  <div :key="product._id" class="card">
    <router-link :to="`/product/${product._id}`">
      <img :src="product.image" :alt="product.name" class="medium" />
    </router-link>
    <div class="card-body">
      <router-link :to="`/product/${product._id}`"
        ><h2>{{ product.name }}</h2></router-link
      >
      <Rating :rating="product.rating" :numReviews="product.numReviews" />
      <div class="row">
        <div class="price">${{ product.price }}</div>
        <div>
          <router-link :to="`/seller/${product.seller._id}`">{{
            product.seller.seller.name
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
export default {
  name: "ProductSingle",
  props: { product: { type: Object, required: true } },
  components: { Rating },
};
</script>

<style></style>

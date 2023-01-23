<template>
  <div class="top-sellers">
    <h2>Top Sellers</h2>
    <LoadingBox v-if="topSellersList.loading" />
    <MessageBox v-else-if="topSellersList.error" variant="danger">{{ errorSellers }}</MessageBox>
    <div v-else class="carousel-wrapper">
      <MessageBox v-if="topSellersList.sellers?.length === 0">No Seller found </MessageBox>
      <carousel v-else :items-to-show="1">
        <slide v-for="seller in topSellersList.sellers" :key="seller._id">
          <router-link :to="`/seller/${seller._id}`">
            <img :src="seller.seller.logo" :alt="seller.seller.name" />
            <p class="legend">{{ seller.seller.name }}</p>
          </router-link>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useUserStore } from "../stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import "vue3-carousel/dist/carousel.css";

const userStore = useUserStore();
const { topSellersList } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.listTopSellers();
});
</script>

<style scoped>
.top-sellers {
  max-width: 90vw;
  margin: 0 auto;
  text-align: center;
}
</style>

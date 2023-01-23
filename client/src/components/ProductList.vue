<template>
  <div>
    <h2>Featured Products</h2>
    <LoadingBox v-if="productList.loading" />
    <MessageBox v-else-if="productList.error" variant="danger">{{
      error
    }}</MessageBox>
    <div v-else>
      <MessageBox v-if="productList.products?.length === 0" variant="danger"
        >No Product Found</MessageBox
      >
      <div class="row center">
        <Product
          v-for="product in productList.products"
          :key="product._id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { Product } from "@/components";

const productStore = useProductStore();
const { list: productList } = storeToRefs(productStore);

onMounted(async () => {
  await productStore.listProducts();
});
</script>

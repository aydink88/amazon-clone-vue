<template>
  <div>
    <div class="row">
      <h1>Products</h1>
      <button type="button" class="primary" @click="createHandler">
        Create Product
      </button>
    </div>
    <LoadingBox v-if="productDelete.loading" />
    <MessageBox v-if="productDelete.error" variant="danger">{{
    productDelete.error
    }}</MessageBox>
    <LoadingBox v-if="productCreate.loading" />
    <MessageBox v-if="productCreate.error" variant="danger">{{
    productCreate.error
    }}</MessageBox>
    <LoadingBox v-if="productList.loading" />
    <MessageBox v-else-if="productList.error" variant="danger">{{
    productList.error
    }}</MessageBox>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productList.products" :key="product._id">
            <td>{{ product._id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.brand }}</td>
            <td>
              <button type="button" class="small" @click="$router.push(`/product/${product._id}/edit`)">
                Edit
              </button>
              <button type="button" class="small" @click="deleteHandler(product)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row center pagination">
        <router-link v-for="x in [...Array(productList.pages).keys()]" :key="x + 1"
          :class="{ active: x + 1 === productList.page }" :to="`/productlist/pageNumber/${x + 1}`">{{ x + 1 }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore, useUserStore } from "../stores";

const props = defineProps({ pageNumber: { type: String, default: "1" } });
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const userStore = useUserStore();
const {
  list: productList,
  create: productCreate,
  delete: productDelete,
} = storeToRefs(productStore);
const { login } = storeToRefs(userStore);
const sellerMode = ref(false);

watchEffect(() => {
  sellerMode.value = route.path.includes("/seller");
  productStore.listProducts({
    seller: sellerMode.value ? login.userInfo?._id : "",
    pageNumber: props.pageNumber,
  });
});

watch(
  () => route.path.includes("/seller"),
  (val) => {
    if (val) {
      sellerMode.value = true;
    }
  }
);

watch(productCreate, (val) => {
  if (val.success) {
    productStore.resetCreate();
    router.push(`/product/${val.product._id}/edit`);
  }
});

watch(productDelete, (val) => {
  if (val.success) {
    productStore.resetDelete();
    window.location.reload();
  }
});

function deleteHandler(product) {
  if (window.confirm("Are you sure to delete?")) {
    productStore.deleteProduct(product._id);
  }
}
async function createHandler() {
  await productStore.createProduct();
}
</script>

<style>

</style>

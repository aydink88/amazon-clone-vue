<template>
  <ul class="categories">
    <li>
      <strong>Categories</strong
      ><button @click="closeSidebar" class="close-sidebar">
        <i class="fa fa-close"></i>
      </button>
    </li>
    <LoadingBox v-if="categoryList.loading" />
    <MessageBox v-else-if="categoryList.error" variant="danger">{{
      errorCategories
    }}</MessageBox>
    <li v-else v-for="c in categoryList.categories" :key="c">
      <router-link :to="`/search/category/${c}`" @click="closeSidebar">{{
        c
      }}</router-link>
    </li>
  </ul>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useProductStore } from "@/stores";

const productStore = useProductStore();

const { categoryList } = storeToRefs(productStore);

const emit = defineEmits(["onClick", "close-sidebar"]);
const closeSidebar = () => {
  emit("close-sidebar");
};

onMounted(async () => {
  await productStore.listProductCategories();
});
</script>

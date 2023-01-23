<template>
  <div>
    <form class="form" @submit.prevent="submitHandler">
      <div>
        <h1>Edit Product {{ id }}</h1>
        <LoadingBox v-if="productUpdate.loading" />
        <MessageBox v-if="productUpdate.error" variant="danger">{{
          productUpdate.error
        }}</MessageBox>
        <LoadingBox v-if="productDetails.loading" />
        <MessageBox v-else-if="productDetails.error" variant="danger">{{
          productDetails.error
        }}</MessageBox>
        <div v-else>
          <div>
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              v-model="productState.name"
            />
          </div>
          <div>
            <label for="price">Price</label>
            <input
              id="price"
              type="text"
              placeholder="Enter price"
              v-model="productState.price"
            />
          </div>
          <div>
            <label for="image">Image</label>
            <input
              id="image"
              type="text"
              placeholder="Enter image"
              v-model="image"
            />
          </div>
          <div>
            <label for="imageFile">Image File</label>
            <input
              type="file"
              id="imageFile"
              label="Choose Image"
              @change="uploadFileHandler"
            />
            <LoadingBox v-if="loadingUpload" />
            <MessageBox v-if="errorUpload" variant="danger">{{
              errorUpload
            }}</MessageBox>
          </div>
          <div>
            <label for="category">Category</label>
            <input
              id="category"
              type="text"
              placeholder="Enter category"
              v-model="productState.category"
            />
          </div>
          <div>
            <label for="brand">Brand</label>
            <input
              id="brand"
              type="text"
              placeholder="Enter brand"
              v-model="productState.brand"
            />
          </div>
          <div>
            <label for="countInStock">Count In Stock</label>
            <input
              id="countInStock"
              type="text"
              placeholder="Enter countInStock"
              v-model="productState.countInStock"
            />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              id="description"
              rows="3"
              placeholder="Enter description"
              v-model="productState.description"
            ></textarea>
          </div>
          <div>
            <label></label>
            <button class="primary" type="submit">Update</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductStore, useUserStore } from "../stores";

const props = defineProps(["id"]);
const router = useRouter();
const productStore = useProductStore();
const userStore = useUserStore();
const { login } = storeToRefs(userStore);
const { details: productDetails, update: productUpdate } =
  storeToRefs(productStore);
const loadingUpload = ref(false);
const errorUpload = ref("");
const image = ref("");
const productState = reactive({
  name: "",
  price: "",
  category: "",
  countInStock: "",
  brand: "",
  description: "",
});

watch(
  () => productUpdate.success,
  (val) => {
    if (val) router.push("/productlist");
  }
);

watch(
  productDetails,
  (details) => {
    if (!details.product) {
      return;
    }
    const prod = details.product;
    console.log(prod);
    if (prod._id !== props.id) {
      productStore.resetUpdate();
      productStore.getProductDetails(props.id);
    }
    if (prod) {
      productState.name = prod.name;
      productState.price = prod.price;
      productState.category = prod.category;
      productState.countInStock = prod.countInStock;
      productState.brand = prod.brand;
      productState.description = prod.description;
      image.value = prod.image;
    }
  },
  { immediate: true }
);

function submitHandler() {
  productStore.updateProduct({
    ...productState,
    _id: props.id,
    image: image.value,
  });
}

onMounted(() => {
  productStore.resetUpdate();
  productStore.getProductDetails(props.id);
});

async function uploadFileHandler(e) {
  const file = e.target.files[0];
  console.log(file);
  const bodyFormData = new FormData();
  bodyFormData.append("image", file);
  loadingUpload.value = true;
  try {
    const { data } = await axios.post("/api/uploads", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${login.userInfo.token}`,
      },
    });
    image.value = data;
    loadingUpload.value = false;
  } catch (error) {
    errorUpload.value = error.message;
    loadingUpload.value = false;
  }
}
</script>

<style></style>

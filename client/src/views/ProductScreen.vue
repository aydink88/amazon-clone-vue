<template>
  <div>
    <LoadingBox v-if="productDetails.loading" />
    <MessageBox v-else-if="productDetails.error" variant="danger">{{
    productDetails.error
    }}</MessageBox>
    <div v-else-if="productDetails.product">
      <router-link to="/">Back to Result</router-link>
      <div class="row top">
        <div class="col-2">
          <img :src="productDetails.product.image" :alt="productDetails.product.name" class="large" />
        </div>
        <div class="col-1">
          <ul>
            <li>
              <h1>{{ productDetails.product.name }}</h1>
            </li>
            <li>
              <Rating :rating="productDetails.product.rating" :numReviews="productDetails.product.numReviews" />
            </li>
            <li>Price: ${{ productDetails.product.price }}</li>
            <li>
              Description:
              <p>{{ productDetails.product.description }}</p>
            </li>
          </ul>
        </div>
        <div class="col-1">
          <div class="card card-body">
            <ul>
              <li>
                Seller
                <h2>
                  <router-link :to="`/seller/${productDetails.product.seller._id}`">{{
                  productDetails.product.seller.seller.name
                  }}</router-link>
                </h2>
                <Rating :rating="productDetails.product.seller.seller.rating"
                  :numReviews="productDetails.product.seller.seller.numReviews" />
              </li>
              <li>
                <div class="row">
                  <div>Price</div>
                  <div class="price">${{ productDetails.product.price }}</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div>Status</div>
                  <div>
                    <span v-if="productDetails.product.countInStock > 0" class="success">In Stock</span><span v-else
                      class="danger">Unavailable</span>
                  </div>
                </div>
              </li>
              <li v-if="productDetails.product.countInStock > 0">
                <div class="row">
                  <div>Qty</div>
                  <div>
                    <select v-model="qty">
                      <option v-for="x in [
                        ...Array(productDetails.product.countInStock).keys(),
                      ]" :key="x + 1" :value="x + 1">
                        {{ x + 1 }}
                      </option>
                    </select>
                  </div>
                </div>
              </li>
              <li>
                <button class="primary block" @click="addToCartHandler">
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Rating } from "../components";
import { useProductStore, useUserStore } from "../stores";

const props = defineProps({ id: String });
const router = useRouter();
const qty = ref(1);
const rating = ref(0);
const comment = ref("");

const productStore = useProductStore();
const userStore = useUserStore();
const { login } = storeToRefs(userStore);
const { details: productDetails, reviewCreate: productReviewCreate } =
  storeToRefs(productStore);

onMounted(() => {
  productStore.getProductDetails(props.id);
});

watch(
  () => productReviewCreate.success,
  (val) => {
    if (val) {
      window.alert("Review Submitted Successfully");
      rating.value = 0;
      comment.value = "";
      productStore.resetCreateReview();
    }
  }
);

function addToCartHandler() {
  router.push(`/cart/${props.id}?qty=${qty.value}`);
}

function submitHandler() {
  if (comment.value && rating.value && login.userInfo?.name) {
    productStore.createReview(props.id, {
      rating: rating.value,
      comment: comment.value,
      name: login.userInfo.name,
    });
  } else {
    alert("Please enter comment and rating");
  }
}

// export default {
//   name: "ProductScreen",
//   props: ["id"],
//   components: { LoadingBox, MessageBox, Rating },
//   data: () => ({ qty: 1, rating: 0, comment: "" }),
//   computed: {
//     ...mapState({
//       loading: (state) => state.productDetails.loading,
//       error: (state) => state.productDetails.error,
//       product: (state) => state.productDetails.product,
//       userInfo: (state) => state.userSignin.userInfo,
//       loadingReviewCreate: (state) => state.productReviewCreate.loading,
//       errorReviewCreate: (state) => state.productReviewCreate.loading,
//       successReviewCreate: (state) => state.productReviewCreate.loading,
//     }),
//   },
//   watch: {
//     successReviewCreate(val) {
//       if (val) {
//         window.alert("Review Submitted Successfully");
//         //setRating("");
//         //setComment("");
//         this.$store.commit("productReviewCreate/PRODUCT_REVIEW_CREATE_RESET");
//       }
//     },
//   },
//   methods: {
//     addToCartHandler() {
//       this.$router.push(`/cart/${this.id}?qty=${this.qty}`);
//     },
//     submitHandler() {
//       if (this.comment && this.rating) {
//         this.$store.dispatch("productReviewCreate/createReview", {
//           productId: this.id,
//           review: {
//             rating: this.rating,
//             comment: this.comment,
//             name: this.userInfo.name,
//           },
//         });
//       } else {
//         alert("Please enter comment and rating");
//       }
//     },
//   },
//   created() {
//     this.$store.dispatch("productDetails/getProductDetails", this.id);
//   },
// };
</script>

<style>

</style>

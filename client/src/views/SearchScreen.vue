<template>
  <div>
    <div class="row">
      <LoadingBox v-if="productList.loading" />
      <MessageBox v-else-if="productList.error" variant="danger">{{
        productList.error
      }}</MessageBox>
      <div v-else>{{ productList.products.length }} Results</div>
      <div>
        Sort by
        <select
          :value="order"
          @change="$router.push(getFilterUrl({ order: $event.target.value }))"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
          <option value="toprated">Avg. Customer Reviews</option>
        </select>
      </div>
    </div>
    <div class="row top">
      <div class="col-1">
        <h3>Department</h3>
        <div>
          <LoadingBox v-if="productCategoryList.loading" />
          <MessageBox v-else-if="productCategoryList.error" variant="danger">{{
            productCategoryList.error
          }}</MessageBox>
          <ul v-else>
            <li>
              <router-link
                :class="{ active: category === 'all' }"
                :to="getFilterUrl({ category: 'all' })"
                >Any</router-link
              >
            </li>
            <li v-for="c in productCategoryList.categories" :key="c">
              <router-link
                :class="{ active: category === 'active' }"
                :to="getFilterUrl({ category: c })"
                >{{ c }}</router-link
              >
            </li>
          </ul>
        </div>
        <div>
          <h3>Price</h3>
          <ul>
            <li v-for="p in prices" :key="p.name">
              <router-link
                :class="{ active: `${p.min}-${p.max}` === `${min}-${max}` }"
                :to="getFilterUrl({ min: p.min, max: p.max })"
              >
                {{ p.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Avg. Customer Review</h3>
          <ul>
            <li v-for="r in ratings" :key="r.name">
              <router-link
                :class="{ active: `${r.rating}` === `${rating}` }"
                :to="getFilterUrl({ rating: r.rating })"
              >
                <Rating caption=" & up" :rating="r.rating" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3">
        <LoadingBox v-if="productList.loading" />
        <MessageBox v-else-if="productList.error" variant="danger">{{
          productList.error
        }}</MessageBox>
        <div v-else>
          <MessageBox v-if="productList.products.length === 0"
            >No Product Found</MessageBox
          >
          <div class="row center">
            <Product
              v-for="product in productList.products"
              :key="product._id"
              :product="product"
            />
          </div>
          <div class="row center pagination">
            <router-link
              v-for="x in [...Array(productList.pages).keys()]"
              :key="x + 1"
              :class="{ active: x + 1 === productList.page }"
              :to="getFilterUrl({ page: x + 1 })"
              >{{ x + 1 }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { prices as PRICES, ratings as RATINGS } from "../utils";
import { Rating, Product } from "../components";
import { ref, watchEffect } from "vue";
import { useProductStore } from "../stores";
import { storeToRefs } from "pinia";

const props = defineProps({
  name: { default: "all" },
  category: { default: "all" },
  min: { default: 0 },
  max: { default: 0 },
  rating: { default: 0 },
  order: { default: "newest" },
  pageNumber: { default: 1 },
});

const prices = ref(PRICES);
const ratings = ref(RATINGS);
const productStore = useProductStore();
const { list: productList, categoryList: productCategoryList } =
  storeToRefs(productStore);

watchEffect(() => {
  productStore.listProducts({
    pageNumber: props.pageNumber,
    name: props.name !== "all" ? props.name : "",
    category: props.category !== "all" ? props.category : "",
    min: props.min,
    max: props.max,
    rating: props.rating,
    order: props.order,
  });
});

function getFilterUrl(filter) {
  const filterPage = filter.page || props.pageNumber;
  const filterCategory = filter.category || props.category;
  const filterName = filter.name || props.name;
  const filterRating = filter.rating || props.rating;
  const sortOrder = filter.order || props.order;
  const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : props.min;
  const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : props.max;
  return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
}
</script>

<style></style>

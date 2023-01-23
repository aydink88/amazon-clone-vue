import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    categoryList: {},
    create: {},
    delete: {},
    details: {},
    list: {},
    reviewCreate: {},
    update: {},
  }),
  getters: {},
  actions: {
    async listProductCategories() {
      this.categoryList = { loading: true };
      try {
        const { data } = await axios.get("/api/products/categories");
        this.categoryList = { loading: false, categories: data };
      } catch (error) {
        this.categoryList = { loading: false, error: error.message };
      }
    },
    async updateProduct(product) {
      this.update = { loading: true };
      const userStore = useUserStore();
      const userInfo = userStore.login.userInfo;
      try {
        const { data } = await axios.put(
          "/api/products/" + product._id,
          product,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        this.update = { loading: false, success: true, data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.update = { loading: false, error: message };
      }
    },

    async createReview(productId, review) {
      this.reviewCreate = { loading: true };
      const userStore = useUserStore();
      const userInfo = userStore.login.userInfo;
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/products/" + productId + "/reviews",
          review,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        this.reviewCreate = { loading: false, success: true, review: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.reviewCreate = { loading: false, error: message };
      }
    },
    resetCreateReview() {
      this.reviewCreate = {
        loading: false,
        success: false,
        review: null,
        error: null,
      };
    },
    async createProduct() {
      this.create = { loading: true };
      const userStore = useUserStore();
      const userInfo = userStore.login.userInfo;
      try {
        const { data } = await axios.post(
          "/api/products",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        this.create = { loading: false, success: true, product: data.product };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.create = { loading: false, error: message };
      }
    },
    resetCreate() {
      this.create = {};
    },
    resetUpdate() {
      this.update = {};
    },
    resetDelete() {
      this.delete = {};
    },
    async deleteProduct(productId) {
      this.delete = { loading: true };
      const userStore = useUserStore();
      const userInfo = userStore.login.userInfo;
      try {
        await axios.delete("/api/products/" + productId, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        this.delete = { loading: false, success: true };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.delete = { loading: false, error: message };
      }
    },
    async getProductDetails(productId) {
      this.details = { loading: true };
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        this.details = { loading: false, success: true, product: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.details = { loading: false, error: message };
      }
    },
    async listProducts(query) {
      const {
        pageNumber = "",
        seller = "",
        name = "",
        category = "",
        order = "",
        min = 0,
        max = 0,
        rating = 0,
      } = query || {};
      this.list = { loading: true };
      try {
        const { data } = await axios.get(
          `/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
        );
        this.list = {
          loading: false,
          success: true,
          products: data.products,
          pages: data.pages,
          page: data.page,
        };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.list = { loading: false, error: message };
      }
    },
  },
});

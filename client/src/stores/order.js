import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useCartStore } from "./cart";
import axios from "axios";

export const useOrderStore = defineStore({
  id: "orders",
  state: () => ({
    orderCreate: {},
    orderDetails: {},
    orderPay: {},
    orderMineList: {},
    orderList: {},
    orderDelete: {},
    orderDeliver: {},
  }),
  getters: {},
  actions: {
    resetCreateOrder() {
      this.orderCreate = {};
    },
    async createOrder(order) {
      this.orderCreate = { loading: true };
      const userStore = useUserStore();
      const cartStore = useCartStore();
      try {
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.post(
          "http://localhost:5000/api/orders",
          order,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderCreate = { loading: false, success: true, order: data };
        cartStore.cartItems = [];
        cartStore.error = "";
        localStorage.removeItem("cartItems");
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderCreate = { loading: false, error: message };
      }
    },
    async getOrderDetails(orderId) {
      this.orderDetails = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/" + orderId,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderDetails = { loading: false, success: true, order: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderDetails == { loading: false, error: message };
      }
    },
    async payOrder(order, paymentResult) {
      this.orderPay = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.put(
          "http://localhost:5000/api/orders/" + order._id + "/pay",
          paymentResult,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderPay = { loading: false, success: true, order: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderPay = { loading: false, error: message };
      }
    },
    async listOrderMine() {
      this.orderMineList = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/mine",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderMineList = { loading: false, orders: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderMineList == { loading: false, error: message };
      }
    },
    async listOrders(seller = "") {
      this.orderList = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.get(
          "http://localhost:5000/api/orders?seller=" + seller,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderList = { loading: false, orders: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderList == { loading: false, error: message };
      }
    },
    async deleteOrder(orderId) {
      this.orderDelete = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.delete(
          "http://localhost:5000/api/orders/" + orderId,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderDelete = { loading: false, success: true, data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderDelete = { loading: false, error: message };
      }
    },
    async deliverOrder(orderId) {
      this.orderDeliver = { loading: true };
      try {
        const userStore = useUserStore();
        const {
          login: { userInfo },
        } = userStore;
        const { data } = await axios.put(
          "http://localhost:5000/api/orders/" + orderId + "/deliver",
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        this.orderDeliver = { loading: false, success: true, order: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.orderDeliver = { loading: false, error: message };
      }
    },
  },
});

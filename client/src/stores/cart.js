import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  }),
  getters: {},
  actions: {
    async addToCart(productId, qty) {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      console.log(data);
      const cartItems = this.cartItems;
      if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
        this.error = `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`;
      } else {
        const item = {
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          product: data._id,
          seller: data.seller,
          qty,
        };
        const existItem = this.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          this.cartItems = this.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          this.cartItems = [...this.cartItems, item];
          this.error = "";
        }
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },
    removeFromCart(productId) {
      this.error = "";
      this.cartItems = this.cartItems.filter((x) => x.product !== productId);
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    saveShippingAddress(address) {
      this.shippingAddress = address;
      localStorage.setItem("shippingAddress", JSON.stringify(address));
    },
    savePaymentMethod(method) {
      this.paymentMethod = method;
    },
  },
});

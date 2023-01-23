import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    address: {},
    delete: {},
    details: {},
    userList: {},
    register: {},
    topSellersList: { loading: null, error: null, sellers: [] },
    update: {},
    updateProfile: {},
    login: {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
  }),
  getters: {},
  actions: {
    resetUpdateProfile() {
      this.updateProfile = {};
    },
    resetUpdate() {
      this.update = {};
    },
    updateAddressMap(address) {
      this.address = address;
    },
    async deleteUser(userId) {
      this.delete = { loading: true };
      const userInfo = this.login.userInfo;
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        this.delete = { loading: false, success: true };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.delete = { loading: false, success: false, error: message };
      }
    },
    async getUserDetails(userId) {
      this.details = { loading: true };
      const userInfo = this.login.userInfo;
      try {
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        this.details = { loading: false, user: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.details = { loading: false, error: message };
      }
    },
    async listUsers() {
      this.userList = { loading: true };
      const userInfo = this.login.userInfo;
      try {
        const { data } = await axios.get(`http://localhost:5000/api/users`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        this.userList = { loading: false, users: data };
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.userList = { loading: false, error: message };
      }
    },
    async signup(name, email, password) {
      this.register = { loading: true };
      try {
        const { data } = await axios.post("/api/users/register", {
          name,
          email,
          password,
        });
        this.register = { loading: false, userInfo: data };
        this.login.userInfo = data;
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.register = { loading: false, error: message };
      }
    },
    async signin(email, password) {
      this.login = { loading: true };
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/users/signin",
          {
            email,
            password,
          }
        );
        this.login = { loading: false, userInfo: data };
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.login = { loading: false, error: message };
      }
    },
    signout() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      this.login.userInfo = null;
      document.location.href = "/signin";
    },
    async listTopSellers() {
      this.topSellersList = { loading: true };
      try {
        const { data } = await axios.get("/api/users/top-sellers");
        this.topSellersList = { loading: false, sellers: data.topSellers };
      } catch (error) {
        console.log(error);
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.topSellersList = { loading: false, error: message };
      }
    },
    async updateUser(user) {
      const userInfo = this.login.userInfo;
      this.update = { loading: true };
      try {
        const { data } = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          user,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        this.update = { loading: false, success: true };
        console.log(data);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.update = { loading: false, error: message };
      }
    },
    async updateUserProfile(user) {
      this.updateProfile = { loading: true };
      const userInfo = this.login.userInfo;
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/users/profile",
          user,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        this.updateProfile = { loading: false, success: true };
        this.login = { userInfo: data };
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        this.updateProfile = { loading: false, error: message };
      }
    },
  },
});

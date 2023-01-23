<template>
  <header class="row">
    <div>
      <button class="open-sidebar" @click="openSidebar">
        <i class="fa fa-bars"></i>
      </button>
      <router-link class="brand" to="/">Amazona</router-link>
    </div>
    <div>
      <SearchBox />
    </div>
    <div>
      <router-link to="/cart"
        >Cart
        <span v-if="cartItems.length > 0" class="badge">{{
          cartItems.length
        }}</span>
      </router-link>
      <div class="dropdown" v-if="login.userInfo">
        <router-link to="#"
          >{{ login.userInfo?.name }} <i class="fa fa-caret-down"></i>
        </router-link>
        <ul class="dropdown-content">
          <li>
            <router-link to="/profile">User Profile</router-link>
          </li>
          <li>
            <router-link to="/orderhistory">Order History</router-link>
          </li>
          <li>
            <router-link to="#signout" @click="signoutHandler"
              >Sign Out</router-link
            >
          </li>
        </ul>
      </div>
      <router-link v-else to="/signin">Sign In</router-link>
      <div class="dropdown" v-if="login.userInfo?.isSeller">
        <router-link to="#admin"
          >Seller <i class="fa fa-caret-down"></i
        ></router-link>
        <ul class="dropdown-content">
          <li>
            <router-link to="/productlist/seller">Products</router-link>
          </li>
          <li>
            <router-link to="/orderlist/seller">Orders</router-link>
          </li>
        </ul>
      </div>
      <div class="dropdown" v-if="login.userInfo?.isAdmin">
        <router-link to="#admin"
          >Admin <i class="fa fa-caret-down"></i
        ></router-link>
        <ul class="dropdown-content">
          <li>
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/productlist">Products</router-link>
          </li>
          <li>
            <router-link to="/orderlist">Orders</router-link>
          </li>
          <li>
            <router-link to="/userlist">Users</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { SearchBox } from "@/components";
import { storeToRefs } from "pinia";
import { useCartStore, useUserStore } from "@/stores";

const cartStore = useCartStore();
const userStore = useUserStore();

const emit = defineEmits(["onClick", "open-sidebar"]);

const openSidebar = () => {
  emit("open-sidebar");
};

const { login } = storeToRefs(userStore);
const { cartItems } = storeToRefs(cartStore);
const signoutHandler = () => userStore.signout();
</script>

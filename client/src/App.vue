<template>
  <div class="grid-container">
    <AppHeader @open-sidebar="sidebarIsOpen = true" />
    <aside :class="{ open: sidebarIsOpen }">
      <CategoryList @close-sidebar="sidebarIsOpen = false" />
    </aside>
    <main>
      <router-view></router-view>
    </main>
    <footer class="row center">All right reserved</footer>
  </div>
</template>

<script setup>
import { AppHeader, CategoryList } from "@/components";
import { ref } from "vue";

const sidebarIsOpen = ref(false);
</script>

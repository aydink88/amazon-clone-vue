<template>
  <div :class="`alert alert-${variant}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: { variant: { type: String, default: "info" } },
};
</script>

<style></style>

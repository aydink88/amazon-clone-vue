<template>
  <form class="search" @submit.prevent="submitHandler">
    <div class="row">
      <input type="text" id="q" name="q" v-model="name" />
      <button type="submit" class="primary">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBox",
  data: () => ({
    name: "",
  }),
  methods: {
    submitHandler() {
      this.$router.push(`/search/name/${this.name}`);
    },
  },
};
</script>

<style></style>

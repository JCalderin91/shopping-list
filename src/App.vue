<script setup lang="ts">
import ItemList from "./components/ItemList.vue";
</script>

<template>
  <main>
    <h1 class="app-title">Shopping list! 🛒</h1>
    <item-list />
  </main>
</template>
<style lang="scss" scoped>
.app-title {
  text-align: center;
  color: rgb(202, 76, 38);
  padding: 1rem 0;
}
</style>

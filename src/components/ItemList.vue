<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Products, Product } from "../services/products.ts";
import { getRelativeTimeString } from "../utils.ts";
const products = ref<Product[]>([]);
import Item from "./Item.vue";

const getProducts = async () => {
  products.value = await Products.get();
};

const total = computed(() => {
  return validProducts.value.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
});

const validProducts = computed(() => {
  return products.value.filter((product) => {
    return Boolean(product.quantity);
  });
});

const lastUpdatedTime = computed(() => {
  if (Boolean(validProducts.value.length > 0)) {
    const date = new Date(validProducts.value[0].updated_at as string);
    return getRelativeTimeString(date);
  }
  return false;
});

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div v-if="lastUpdatedTime" class="last_updated">
    Last update: {{ lastUpdatedTime }}
  </div>
  <ul class="item-list">
    <item v-for="product in validProducts" :item="product" />
  </ul>
  <div class="total">Total: {{ total.toFixed(2) }} $</div>
</template>

<style lang="scss">
.last_updated {
  text-align: center;
  font-size: 0.8rem;
}
.item-list {
  padding: 0.5rem 1rem;
}
.total {
  text-align: right;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: bold;
}
</style>

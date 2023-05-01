<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Products, Product } from "../services/products.ts";
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

onMounted(() => {
  getProducts();
});
</script>

<template>
  <ul class="item-list">
    <item v-for="product in validProducts" :item="product" />
  </ul>
  <div class="total">Total: {{ total }} $</div>
</template>

<style lang="scss">
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

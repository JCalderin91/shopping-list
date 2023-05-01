<script setup lang="ts">
const { item } = defineProps(["item"]);
</script>

<template>
  <li class="item">
    <div class="information">
      <div class="title">
        <strong>{{ item.name }}:</strong> {{ item.quantity }}
        {{ item.unit_type }}
      </div>
      <small>Unit price: {{ item.price }} $</small>
    </div>
    <div class="sub-total">{{ item.price * item.quantity }} $</div>
  </li>
</template>

<style lang="scss">
.item {
  list-style: none;
  background-color: #4b8ee615;
  margin-bottom: 0.8rem;
  border-radius: 0.2rem;
  padding: 0.4rem 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .information {
    .title {
      font-size: 1.1rem;
    }
    small {
      color: rgb(233, 72, 9);
      font-size: 0.8rem;
    }
  }
  .sub-total {
    font-weight: bold;
    font-size: 1.1rem;
  }
}
</style>

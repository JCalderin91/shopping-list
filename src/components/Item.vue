<script setup lang="ts">
import { onMounted, ref } from "vue";

const { item } = defineProps(["item"]);
const isSelected = ref(false);
const toggleSelected = (uuid: string) => {
  let itemsSelected = JSON.parse(localStorage.getItem("itemsSelected") || "[]");
  if (!itemsSelected.includes(uuid)) {
    itemsSelected.push(uuid);
    isSelected.value = true;
  } else {
    itemsSelected = itemsSelected.filter((item: string) => item !== uuid);
    isSelected.value = false;
  }
  localStorage.setItem("itemsSelected", JSON.stringify(itemsSelected));
};

onMounted(() => {
  let itemsSelected = JSON.parse(localStorage.getItem("itemsSelected") || "[]");
  isSelected.value = itemsSelected.includes(item.uuid);
});
</script>

<template>
  <li
    @click="toggleSelected(item.uuid)"
    :class="`${isSelected ? 'isSelected' : ''} item`"
  >
    <div class="information">
      <div class="title">
        <strong>{{ item.name }}:</strong> {{ item.quantity }}
        {{ item.unit_type }}
      </div>
      <small>Unit price: {{ item.price }} $</small>
    </div>
    <div class="sub-total">{{ (item.price * item.quantity).toFixed(2) }} $</div>
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
  &.isSelected {
    text-decoration: line-through;
    opacity: 0.6;
  }
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

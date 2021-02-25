<template>
  <v-card>
    <v-card-title v-for="(item, k) in items" :key="k" :style="item.style">
      {{ item.title }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

const rcg = () => {
  const rng = Math.random() * 255;
  return `hsl(${rng},100%,50%)`;
};

export default Vue.extend({
  name: "Card",

  data: () => ({
    items: [
      { title: "Yes", style: `color: ${rcg()}` },
      { title: "sada", style: `color: ${rcg()}` },
    ],
  }),
});
</script>

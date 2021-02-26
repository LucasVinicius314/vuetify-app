<template>
  <v-card v-if="visible">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text v-for="(item, k) in items" :key="k" :style="item.style">
      {{ item.text }}
    </v-card-text>
    <v-btn @click="toggleVisible">Hide</v-btn>
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

  props: {
    title: String,
  },

  data: () => ({
    visible: true,
    items: [
      { text: "One", style: `color: ${rcg()}` },
      { text: "Two", style: `color: ${rcg()}` },
    ],
  }),

  methods: {
    toggleVisible: function () {
      this.visible = !this.visible;
    },
  },
});
</script>

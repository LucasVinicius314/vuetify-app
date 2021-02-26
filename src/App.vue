<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Products</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
    </v-navigation-drawer>

    <Products />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Products from "./pages/Products.vue";

export default Vue.extend({
  name: "App",

  components: {
    Products,
  },

  methods: {},

  data: () => ({
    drawer: null,
  }),
});
</script>

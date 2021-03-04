<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list>
        <v-list-item-group>
          <template v-for="(item, k) in items">
            <v-list-item :to="item.to" :key="k">
              <v-list-item-content>
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: false,
    items: [
      {
        to: "/",
        label: "Home",
        icon: "mdi-home",
      },
      {
        to: "/brands",
        label: "Brands",
        icon: "mdi-watermark",
      },
      {
        to: "/categories",
        label: "Categories",
        icon: "mdi-tag",
      },
      {
        to: "/products",
        label: "Products",
        icon: "mdi-cart",
      },
      {
        to: "/about",
        label: "About",
        icon: "mdi-information",
      },
    ],
  }),
});
</script>

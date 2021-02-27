<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ brand.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="$emit('brand-select', brand.id)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon @click="$emit('brand-delete', brand.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type Brand = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "BrandItem",

  props: {
    brand: Object as PropType<Brand>,
  },

  data: () => ({
    hover: false as boolean,
  }),
});
</script>

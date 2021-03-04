<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ product.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-hover v-slot="{ hover }">
        <v-btn
          icon
          @click="$emit('product-select', product.id)"
          :class="{ 'on-hover': hover }"
          :color="hover ? 'blue' : 'auto'"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-hover>
    </v-list-item-action>
    <v-list-item-action>
      <v-hover v-slot="{ hover }">
        <v-btn
          icon
          @click="$emit('product-delete', product.id)"
          :class="{ 'on-hover': hover }"
          :color="hover ? 'red' : 'auto'"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-hover>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type Product = {
  id: number;
  name: string;
  year: string;
  price: number;
  categoryId: number;
  brandId: number;
};

export default Vue.extend({
  name: "ProductItem",

  props: {
    product: Object as PropType<Product>,
  },
});
</script>

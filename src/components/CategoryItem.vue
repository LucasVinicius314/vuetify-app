<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ category.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="$emit('category-select', category.id)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon @click="$emit('category-delete', category.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type Category = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "CategoryItem",

  props: {
    category: Object as PropType<Category>,
  },

  data: () => ({
    hover: false as boolean,
  }),
});
</script>

<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ category.name }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-hover v-slot="{ hover }">
        <v-btn
          icon
          @click="$emit('category-select', category.id)"
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
          @click="$emit('category-delete', category.id)"
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

type Category = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "CategoryItem",

  props: {
    category: Object as PropType<Category>,
  },
});
</script>

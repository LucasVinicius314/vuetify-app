<template>
  <v-main class="grey lighten-2">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-list dense>
              <v-card-title>Categories</v-card-title>
              <v-card-text v-if="categories.length === 0">
                There are no categories
              </v-card-text>
              <v-list-item-group>
                <v-list-item :key="k" v-for="(category, k) in categories">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ category.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="deleteCategory(category.id)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card>
            <v-form @submit.prevent="createCategory">
              <v-card-text>
                <v-card-title>Create Category</v-card-title>
                <v-text-field
                  class="mb-2"
                  hint="Category name"
                  placeholder="Category name"
                  v-model="category"
                  :rules="['required']"
                  counter="25"
                />
                <v-card-actions>
                  <v-btn type="submit">Create</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
// import Card from "../components/Card.vue";
import { axios } from "../services/api";

export default Vue.extend({
  name: "Products",

  components: {
    // Card,
  },

  created: function () {
    this.getCategories();
  },

  methods: {
    getCategories: async function () {
      axios
        .get("/category/all")
        .then((response) => {
          console.log(response);
          this.categories = response.data;
        })
        .catch(console.log);
    },
    createCategory: function () {
      const _category = this.category;
      this.category = "";
      axios
        .get(`/category/create/${_category}`)
        .then((response) => {
          console.log(response);
          this.getCategories();
        })
        .catch(console.log);
    },
    deleteCategory: function (id: number) {
      axios
        .get(`/category/delete/${id}`)
        .then((response) => {
          console.log(response);
          this.getCategories();
        })
        .catch(console.log);
    },
  },

  data: () => ({
    categories: [],
    category: "",
  }),
});
</script>

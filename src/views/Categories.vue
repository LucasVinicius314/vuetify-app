<template>
  <v-main class="grey lighten-2">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
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
                    <v-btn icon @click="selectCategory(category.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon @click="deleteCategory(category.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-form @submit.prevent="createCategory">
              <v-card-text>
                <v-card-title>Create Category</v-card-title>
                <v-text-field
                  class="mb-2"
                  v-model="newCategoryName"
                  :rules="['required']"
                  counter="25"
                  label="Category name"
                  placeholder="Category name"
                />
                <v-card-actions>
                  <v-btn type="submit">Create</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-form>
          </v-card>
          <v-card class="mt-5">
            <v-form @submit.prevent="updateCategory">
              <v-card-text>
                <v-card-title>Update Category</v-card-title>
                <v-flex v-if="selectedCategoryId === 0">
                  <v-card-text>Select a category to edit</v-card-text>
                </v-flex>
                <template v-else>
                  <v-text-field
                    class="mb-2"
                    v-model="selectedCategoryId"
                    :rules="['required']"
                    counter="25"
                    type="number"
                    disabled
                    label="Category ID"
                    placeholder="Category ID"
                  />
                  <v-text-field
                    class="mb-2"
                    v-model="selectedCategoryName"
                    :rules="['required']"
                    counter="25"
                    label="Category name"
                    placeholder="Category name"
                  />
                  <v-card-actions>
                    <v-btn type="submit">Update</v-btn>
                  </v-card-actions>
                </template>
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
import { axios } from "../services/api";

type Category = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "Categories",

  created: function () {
    this.getCategories();
  },

  data: () => ({
    categories: [] as Category[],
    newCategoryName: "" as string,
    selectedCategoryId: 0 as number,
    selectedCategoryName: "" as string,
  }),

  methods: {
    createCategory: function () {
      const _category: Category = {
        id: 0,
        name: this.newCategoryName,
      };
      axios
        .post(`/category/create`, _category)
        .then((response) => {
          console.log(response);
          this.getCategories();
        })
        .catch(console.log);
    },
    getCategories: async function () {
      this.newCategoryName = "";
      this.selectedCategoryId = 0;
      this.selectedCategoryName = "";
      axios
        .get("/category/all")
        .then((response) => {
          console.log(response);
          this.categories = response.data;
        })
        .catch(console.log);
    },
    updateCategory: function () {
      const _category: Category = {
        id: this.selectedCategoryId,
        name: this.selectedCategoryName,
      };
      axios
        .post(`/category/update/${_category.id}`, _category)
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
    selectCategory: function (id: number) {
      const _category = this.categories.find((f) => f.id === id);
      this.selectedCategoryId = _category?.id || 0;
      this.selectedCategoryName = _category?.name || "";
    },
  },
});
</script>

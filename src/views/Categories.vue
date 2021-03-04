<template>
  <v-main>
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
                <CategoryItem
                  :key="k"
                  :category="category"
                  v-for="(category, k) in categories"
                  @category-select="selectCategory"
                  @category-delete="deleteCategory"
                />
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-form
              lazy-validation
              ref="createForm"
              @submit.prevent="createCategory"
            >
              <v-card-text>
                <v-card-title>Create Category</v-card-title>
                <v-text-field
                  class="mb-2"
                  counter="25"
                  label="Category name"
                  v-model="newCategory.name"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-card-actions>
                  <v-btn type="submit">Create</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-form>
          </v-card>
          <v-card class="mt-5">
            <v-form
              lazy-validation
              ref="updateForm"
              @submit.prevent="updateCategory"
            >
              <v-card-text>
                <v-card-title>Update Category</v-card-title>
                <v-flex v-if="selectedCategory.id === 0">
                  <v-card-text>Select a category to edit</v-card-text>
                </v-flex>
                <template v-else>
                  <v-text-field
                    disabled
                    class="mb-2"
                    counter="25"
                    type="number"
                    label="Category ID"
                    v-model="selectedCategory.id"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    class="mb-2"
                    counter="25"
                    label="Category name"
                    v-model="selectedCategory.name"
                    :rules="[(v) => !!v || 'Required']"
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
import CategoryItem from "../components/CategoryItem.vue";
import { axios } from "../services/api";

type Category = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "Categories",

  components: {
    CategoryItem,
  },

  created: function () {
    this.getCategories();
  },

  data: () => ({
    categories: [] as Category[],
    newCategory: {
      id: 0,
      name: "",
    } as Category,
    selectedCategory: {
      id: 0,
      name: "",
    } as Category,
  }),

  methods: {
    createCategory: function () {
      if ((this.$refs.createForm as HTMLFormElement).validate()) {
        const _category: Category = {
          id: this.newCategory.id,
          name: this.newCategory.name,
        };
        axios
          .post(`/category/create`, _category)
          .then((response) => {
            console.log(response);
            this.getCategories();
          })
          .catch(console.log);
      }
    },
    getCategories: async function () {
      this.newCategory = {
        id: 0,
        name: "",
      };
      this.selectedCategory = {
        id: 0,
        name: "",
      };
      axios
        .get("/category/all")
        .then((response) => {
          console.log(response);
          this.categories = response.data;
        })
        .catch(console.log);
    },
    updateCategory: function () {
      if ((this.$refs.updateForm as HTMLFormElement).validate()) {
        const _category: Category = {
          id: this.selectedCategory.id,
          name: this.selectedCategory.name,
        };
        axios
          .post(`/category/update/${_category.id}`, _category)
          .then((response) => {
            console.log(response);
            this.getCategories();
          })
          .catch(console.log);
      }
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
      this.selectedCategory = {
        id: _category?.id || 0,
        name: _category?.name || "",
      };
    },
  },
});
</script>

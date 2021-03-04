<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-list dense>
              <v-card-title>Products</v-card-title>
              <v-card-text v-if="products.length === 0">
                There are no products
              </v-card-text>
              <v-list-item-group>
                <ProductItem
                  :key="k"
                  :product="product"
                  v-for="(product, k) in products"
                  @product-select="selectProduct"
                  @product-delete="deleteProduct"
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
              @submit.prevent="createProduct"
            >
              <v-card-text>
                <v-card-title>Create Product</v-card-title>
                <v-text-field
                  class="mb-2"
                  counter="25"
                  label="Product name"
                  v-model="newProduct.name"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-text-field
                  class="mb-2"
                  counter="4"
                  type="number"
                  label="Product year"
                  v-model="newProduct.year"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-text-field
                  class="mb-2"
                  type="number"
                  label="Product price"
                  v-model="newProduct.price"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-select
                  single-line
                  label="Brand"
                  item-value="id"
                  item-text="name"
                  v-model="newProduct.brandId"
                  :items="brands"
                  :rules="[(v) => !!v || 'Required']"
                />
                <v-select
                  single-line
                  label="Category"
                  item-value="id"
                  item-text="name"
                  v-model="newProduct.categoryId"
                  :items="categories"
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
              @submit.prevent="updateProduct"
            >
              <v-card-text>
                <v-card-title>Update Product</v-card-title>
                <v-flex v-if="selectedProduct.id === 0">
                  <v-card-text>Select a product to edit</v-card-text>
                </v-flex>
                <template v-else>
                  <v-text-field
                    disabled
                    class="mb-2"
                    counter="25"
                    type="number"
                    label="Product ID"
                    v-model="selectedProduct.id"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    class="mb-2"
                    counter="25"
                    label="Product name"
                    v-model="selectedProduct.name"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    class="mb-2"
                    counter="4"
                    type="number"
                    label="Product year"
                    v-model="selectedProduct.year"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    class="mb-2"
                    type="number"
                    label="Product price"
                    v-model="selectedProduct.price"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-select
                    single-line
                    label="Brand"
                    item-value="id"
                    item-text="name"
                    v-model="selectedProduct.brandId"
                    :items="brands"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-select
                    single-line
                    label="Category"
                    item-value="id"
                    item-text="name"
                    v-model="selectedProduct.categoryId"
                    :items="categories"
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
import ProductItem from "../components/ProductItem.vue";
import { axios } from "../services/api";

type Brand = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  year: string;
  price: number;
  categoryId: number;
  brandId: number;
};

export default Vue.extend({
  name: "Products",

  components: {
    ProductItem,
  },

  created: function () {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  },

  data: () => ({
    products: [] as Product[],
    brands: [] as Brand[],
    categories: [] as Category[],
    newProduct: {
      id: 0,
      name: "",
      year: "",
      price: 0,
      categoryId: 0,
      brandId: 0,
    } as Product,
    selectedProduct: {
      id: 0,
      name: "",
      year: "",
      price: 0,
      categoryId: 0,
      brandId: 0,
    } as Product,
  }),

  methods: {
    createProduct: function () {
      if ((this.$refs.createForm as HTMLFormElement).validate()) {
        const _product: Product = {
          id: this.newProduct.id,
          name: this.newProduct.name,
          year: this.newProduct.year,
          price: this.newProduct.price,
          categoryId: this.newProduct.categoryId,
          brandId: this.newProduct.brandId,
        };
        axios
          .post(`/product/create`, _product)
          .then((response) => {
            console.log(response);
            this.getProducts();
          })
          .catch(console.log);
      }
    },
    getProducts: async function () {
      this.newProduct = {
        id: 0,
        name: "",
        year: "",
        price: 0,
        categoryId: 0,
        brandId: 0,
      };
      this.selectedProduct = {
        id: 0,
        name: "",
        year: "",
        price: 0,
        categoryId: 0,
        brandId: 0,
      };
      axios
        .get("/product/all")
        .then((response) => {
          console.log(response);
          this.products = (response.data as Product[]).map((v) => ({
            ...v,
            year: (v.year.match(/\d{4}/) || [])[0] || "0",
          }));
        })
        .catch(console.log);
    },
    getBrands: async function () {
      axios
        .get("/brand/all")
        .then((response) => {
          console.log(response);
          this.brands = response.data;
        })
        .catch(console.log);
    },
    getCategories: async function () {
      axios
        .get("/category/all")
        .then((response) => {
          console.log(response);
          this.categories = response.data;
        })
        .catch(console.log);
    },
    updateProduct: function () {
      if ((this.$refs.updateForm as HTMLFormElement).validate()) {
        const _product: Product = {
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          year: this.selectedProduct.year,
          price: this.selectedProduct.price,
          categoryId: this.selectedProduct.categoryId,
          brandId: this.selectedProduct.brandId,
        };
        axios
          .post(`/product/update/${_product.id}`, _product)
          .then((response) => {
            console.log(response);
            this.getProducts();
          })
          .catch(console.log);
      }
    },
    deleteProduct: function (id: number) {
      axios
        .get(`/product/delete/${id}`)
        .then((response) => {
          console.log(response);
          this.getProducts();
        })
        .catch(console.log);
    },
    selectProduct: function (id: number) {
      const _product = this.products.find((f) => f.id === id);
      this.selectedProduct = {
        id: _product?.id || 0,
        name: _product?.name || "",
        year: _product?.year || "",
        price: _product?.price || 0,
        brandId: _product?.brandId || 0,
        categoryId: _product?.categoryId || 0,
      };
    },
  },
});
</script>

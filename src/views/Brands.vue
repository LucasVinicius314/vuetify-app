<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-list dense>
              <v-card-title>Brands</v-card-title>
              <v-card-text v-if="brands.length === 0">
                There are no brands
              </v-card-text>
              <v-list-item-group>
                <BrandItem
                  :key="k"
                  v-for="(brand, k) in brands"
                  :brand="brand"
                  @brand-select="selectBrand"
                  @brand-delete="deleteBrand"
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
              @submit.prevent="createBrand"
            >
              <v-card-text>
                <v-card-title>Create Brand</v-card-title>
                <v-text-field
                  class="mb-2"
                  counter="25"
                  label="Brand name"
                  v-model="newBrand.name"
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
              ref="updateForm"
              lazy-validation
              @submit.prevent="updateBrand"
            >
              <v-card-text>
                <v-card-title>Update Brand</v-card-title>
                <v-flex v-if="selectedBrand.id === 0">
                  <v-card-text>Select a brand to edit</v-card-text>
                </v-flex>
                <template v-else>
                  <v-text-field
                    disabled
                    class="mb-2"
                    counter="25"
                    type="number"
                    label="Brand ID"
                    v-model="selectedBrand.id"
                    :rules="[(v) => !!v || 'Required']"
                  />
                  <v-text-field
                    class="mb-2"
                    counter="25"
                    label="Brand name"
                    v-model="selectedBrand.name"
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
import BrandItem from "../components/BrandItem.vue";
import { axios } from "../services/api";

type Brand = {
  id: number;
  name: string;
};

export default Vue.extend({
  name: "Brands",

  components: {
    BrandItem,
  },

  created: function () {
    this.getBrands();
  },

  data: () => ({
    brands: [] as Brand[],
    newBrand: {
      id: 0 as number,
      name: "" as string,
    },
    selectedBrand: {
      id: 0 as number,
      name: "" as string,
    },
  }),

  methods: {
    createBrand: function () {
      if ((this.$refs.createForm as HTMLFormElement).validate()) {
        const _brand: Brand = {
          id: this.newBrand.id,
          name: this.newBrand.name,
        };
        axios
          .post(`/brand/create`, _brand)
          .then((response) => {
            console.log(response);
            this.getBrands();
          })
          .catch(console.log);
      }
    },
    getBrands: async function () {
      this.newBrand = {
        id: 0,
        name: "",
      };
      this.selectedBrand = {
        id: 0,
        name: "",
      };
      axios
        .get("/brand/all")
        .then((response) => {
          console.log(response);
          this.brands = response.data;
        })
        .catch(console.log);
    },
    updateBrand: function () {
      if ((this.$refs.updateForm as HTMLFormElement).validate()) {
        const _brand: Brand = {
          id: this.selectedBrand.id,
          name: this.selectedBrand.name,
        };
        axios
          .post(`/brand/update/${_brand.id}`, _brand)
          .then((response) => {
            console.log(response);
            this.getBrands();
          })
          .catch(console.log);
      }
    },
    deleteBrand: function (id: number) {
      axios
        .get(`/brand/delete/${id}`)
        .then((response) => {
          console.log(response);
          this.getBrands();
        })
        .catch(console.log);
    },
    selectBrand: function (id: number) {
      const _brand = this.brands.find((f) => f.id === id);
      this.selectedBrand = {
        id: _brand?.id || 0,
        name: _brand?.name || "",
      };
    },
  },
});
</script>

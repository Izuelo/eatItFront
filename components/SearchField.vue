<template>
  <v-container align="center">
    <v-card
      class="mx-auto"
      elevation="7"
      shaped
      align="center"
      max-width="850px"
      color="orange darken-1"
    >
      <v-row
        style="margin: 12px"
      >
        <v-col
          class="d-flex"
          cols="3"
        >
          <div>
            <v-icon>mdi-silverware-fork-knife</v-icon>Cuisine
            <v-select
              v-model="chCuisine"
              :items="cuisines"
              label="Chose a cuisine"
              solo
            />
          </div>
        </v-col>

        <v-col
          class="d-flex"
          cols="3"
        >
          <div>
            <v-icon>mdi-city-variant</v-icon>City
            <v-select
              v-model="chCity"
              :items="cities"
              label="City"
              solo
            />
          </div>
        </v-col>
        <v-col
          class="d-flex"
          cols="3"
        >
          <div>
            <v-icon>mdi-star</v-icon>Rating
            <v-select
              v-model="chRating"
              :items="items"
              label="User score"
              solo
            />
          </div>
        </v-col>
        <v-col
          class="d-flex"
          cols="3"
          style="justify-content: center; margin-top: 30px;"
        >
          <v-btn
            style="display: inline-block;"
            tile
            color="success"
            @click="getSearchResults"
          >
            <v-icon left>
              mdi-magnify
            </v-icon>
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SearchField',
  async fetch () {
    this.cuisines = await this.$axios.$get('https://localhost:5001/api/Cuisine')
    this.cuisines = this.cuisines.map(y => (y.cuisineName))

    this.cities = await this.$axios.$get('https://localhost:5001/api/City')
    this.cities = this.cities.map(y => (y.cityName))
  },
  data: () => ({
    items: [1, 2, 3, 4],
    cuisines: [],
    cities: [],
    chCuisine: '',
    chCity: '',
    chRating: 0
  }),
  computed: {
    ...mapState(['searchResults'])
  },
  methods: {
    ...mapMutations(['updateSearchResult']),
    async getSearchResults () {
      const results = await this.$axios.$get('https://localhost:5001/api/Restaurant',
        {
          params: {
            cityName: this.chCity,
            cuisine: this.chCuisine,
            rating: this.chRating
          }
        })
      this.updateSearchResult(results)
    }
  }
}
</script>

<style scoped>

</style>

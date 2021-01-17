<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="1600"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="restaurants in searchResults"
        :key="restaurants.restaurantEntityId"
      >
        <v-card
          :loading="loading"
          style="position: relative;margin: 10px"
          max-width="374"
          :to="`/restaurant/${restaurants.restaurantEntityId}`"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            />
          </template>

          <v-img
            height="250"
            :src="restaurants.featuredIMG"
          />

          <v-card-title>{{ restaurants.name }}</v-card-title>

          <v-card-text
            style="min-height: 142px"
          >
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="restaurants.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              />

              <div
                class="grey--text ml-4"
              >
                {{ restaurants.rating }} ({{ restaurants.votes }})
              </div>
            </v-row>

            <div
              class="my-4 subtitle-1"
              style="min-height: 56px"
            >
              PLN • {{ restaurants.address }}
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-title>Open Hours</v-card-title>
          <div
            style="margin-bottom: 50px; margin-left: 10px"
          >
            <div
              class="grey--text ml-4"
            >
              {{ restaurants.openHours }}
            </div>
          </div>
          <v-card-actions
            style="position: absolute; bottom:  10px"
          >
            <v-btn
              color="green"
              text
              @click="reserve"
            >
              Click to see the details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchList',
  data: () => ({
    model: null,
    loading: false,
    selection: 1
  }),
  computed: {
    ...mapState(['searchResults'])
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

<style scoped>

</style>

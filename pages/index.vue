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
        v-for="restaurantWtop in warsawTop"
        :key="restaurantWtop.restaurantEntityId"
      >
        <v-card
          :loading="loading"
          style="position: relative;margin: 10px"
          max-width="374"
          :to="`/restaurant/${restaurantWtop.restaurantEntityId}`"
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
            :src="restaurantWtop.featuredIMG"
          />

          <v-card-title>{{ restaurantWtop.name }}</v-card-title>

          <v-card-text
            style="min-height: 142px"
          >
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="restaurantWtop.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              />

              <div
                class="grey--text ml-4"
              >
                {{ restaurantWtop.rating }} ({{ restaurantWtop.votes }})
              </div>
            </v-row>

            <div
              class="my-4 subtitle-1"
              style="min-height: 56px"
            >
              PLN • {{ restaurantWtop.address }}
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-title>Tonight's availability</v-card-title>
          <div
            style="margin-bottom: 50px; margin-left: 10px"
          >
            <v-chip-group
              v-for="hours in restaurantWtop.openHours "
              :key="hours"
              active-class="green"
              column
              style="display: inline-flex;"
            >
              <v-chip>{{ hours }}</v-chip>
            </v-chip-group>
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
export default {
  async fetch () {
    this.warsawTop = await this.$axios.$get('https://localhost:5001/api/Restaurant/top', {
      params: {
        cityName: 'Warszawa'
      }
    })
    for (const rest of this.warsawTop) {
      const openHoursArray = rest.openHours.split(',')
      rest.openHours = openHoursArray
    }
  },
  data: () => ({
    model: null,
    loading: false,
    selection: 1,
    warsawTop: []
  }),
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

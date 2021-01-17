<template>
  <div>
    <v-card
      class="mx-auto"
      style="width: 80%;"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="restaurant.featuredIMG"
      >
        <v-card-title
          style="display: inline-block;font-size: xxx-large; text-shadow: 0 0 50px hsla(0,0%,0%,.4)"
        >
          {{ restaurant.name }}
        </v-card-title>
      </v-img>

      <div
        style="padding: 16px"
      >
        <div
          style="display: flex; justify-content: space-between; "
        >
          <v-card-text
            class="text--primary"
            style="padding-left: 0px; max-width: 70%"
          >
            <v-divider />
            <div
              style="padding-top: 20px;padding-bottom: 20px;"
            >
              <h1>About this place </h1>
            </div>
            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>
          <v-card
            style="min-width: 250px; max-height: 100px"
            color="#CFD8DC"
          >
            <v-row
              justify="center"
            >
              <v-col
                style="display: flex;justify-content: center;"
              >
                <v-rating
                  :value="restaurant.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="25"
                />
              </v-col>
            </v-row>
            <v-row
              style="display: flex;justify-content: space-around"
            >
              <v-col
                style="display: flex;justify-content: center;"
                cols="6">
                Rating: {{restaurant.rating}}
              </v-col>
              <v-col
                style="display: flex;justify-content: center;"
                cols="6">
                Votes: {{restaurant.votes}}
              </v-col>
            </v-row>
          </v-card>
        </div>
        <v-divider></v-divider>
        <div
        style="display: flex;justify-content: space-around;padding: 16px">
          <div>Address: {{restaurant.address}} </div>
          <div>Open hours: {{restaurant.openHours}} </div>
        </div>
        <div id="map-wrap" style="height: 300px; width: 100%;margin: 20px 0">
          <client-only>
            <l-map :zoom="13" :center="[restaurant.latitude,restaurant.longitude]">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <l-marker :lat-lng="[restaurant.latitude,restaurant.longitude]">
                <l-tooltip>{{ restaurant.name }}<br> {{ restaurant.address }}  </l-tooltip>
              </l-marker>
            </l-map>
          </client-only>
        </div>
        <v-card-actions
          style="padding-left: 0px"
        >
          <v-btn
            v-if="!isFav"
            color="green"
            text
            @click="addToFav"
          >
            <v-icon>mdi-heart</v-icon> Add to Favourites
          </v-btn>
          <v-btn
            v-if="isFav"
            color="green"
            text
            @click="deleteFromFav"
          >
            <v-icon>mdi-heart-broken</v-icon> Delete from Favourites
          </v-btn>
          <v-btn
            color="green"
            text
          >
            Explore
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RestaurantCard',
  props: {
    restaurant: Object
  },
  async fetch () {
    this.isFav = await this.$axios.$get('https://localhost:5001/api/User/checkfav', {
      params: {
        userEntityId: this.user.userid,
        restaurantEntityId: this.restaurant.restaurantEntityId
      }
    })
  },
  computed: {
    ...mapState('user', ['user'])
  },
  data: () => ({
    isFav: false,
    dialog: false
  }),
  methods: {
    addToFav () {
      this.$axios.$post('https://localhost:5001/api/User/addfav', {}, {
        params: {
          userEntityId: this.user.userid,
          restaurantEntityId: this.restaurant.restaurantEntityId
        }
      })
      this.isFav = true
    },
    deleteFromFav () {
      this.$axios.$post('https://localhost:5001/api/User/delfav', {}, {
        params: {
          userEntityId: this.user.userid,
          restaurantEntityId: this.restaurant.restaurantEntityId
        }
      })
      this.isFav = false
    }
  }

}
</script>

<style scoped>

</style>

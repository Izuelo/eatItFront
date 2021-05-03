<template>
  <div>
    <div
      style="display: flex;align-items: center"
    >
      <v-card
        class="mx-auto"
        style="display: flex;width: 700px; padding: 16px"
        color="#F5F5F5"
      >
        <v-container>
          <v-row>
            <v-col
              cols="2"
              style="display: flex;justify-content: center"
            >
              <v-avatar
                color="indigo"
                rounded-circle
                size="66"
              >
                <v-icon
                  dark
                  size="48"
                >
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col
              cols="9"
            >
              <v-card-title> User Profile</v-card-title>
              <v-divider />
              <div
                style="display: flex;justify-content: space-between "
              >
                <div
                  style="padding-top:16px"
                >
                  Name: Adam
                </div>
                <div
                  style="padding-top:16px"
                >
                  Last name: Nowak
                </div>
              </div>
              <div
                style="padding-top:16px;padding-bottom: 16px"
              >
                E-mail: adam.nowak123@gmail.com
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-divider />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4"
            >
              <v-tab
                id="fav"
                @click="goToFav"
              >
                <v-icon
                  color="red"
                >
                  mdi-heart
                </v-icon>
                Favourites
              </v-tab>
            </v-col>
            <v-col
              cols="4"
            >
              <v-tab>
                <v-icon
                  color="yellow"
                >
                  mdi-star
                </v-icon>
                Rated
              </v-tab>
            </v-col>
            <v-col
              cols="4"
            >
              <v-tab
                @click="goToInfo"
              >
                <v-icon
                  color="blue"
                >
                  mdi-comment
                </v-icon>
                Comments
              </v-tab>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <div
      v-if="showFav"
      class="d-flex justify-center mb-6"
    >
      <div>
        <v-row justify="center">
          <v-col align-self="center">
            <h1 style="text-align: center">
              Favourite Restaurants
            </h1>
          </v-col>
        </v-row>
        <v-row align="center" style="max-width: 1220px;">
          <v-col cols="12">
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="restaurant in userFavourites"
                  :key="restaurant.restaurantEntityId"
                  cols="12"
                >
                  <v-card width="100%" style="padding: 0" max-height="225" :to="`/restaurant/${restaurant.restaurantEntityId}`">
                    <v-row dense style="height: 100%" justify="space-between">
                      <v-col cols="4" style="padding: 0">
                        <v-img :src="restaurant.thumbnail" width="225" height="225" />
                      </v-col>
                      <v-col cols="8" align-self="start">
                        <h2>{{ restaurant.name }}</h2>
                        <h5 style="color: grey">
                          {{ restaurant.address }}
                        </h5>
                        <div
                          style="position: absolute; bottom: 10px; display: flex;justify-content: space-around"
                        >
                          <v-rating
                            :value="restaurant.rating"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="25"
                          />

                          <div class="grey--text ml-4">
                            {{ restaurant.rating }} ({{ restaurant.votes }})
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-card
      v-if="!showFav"
      class="mx-auto"
      max-width="344"
      outlined
      style="margin: 50px"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            Hello
          </div>
          <v-list-item-title class="headline mb-1">
            About ME
          </v-list-item-title>
          <v-list-item-subtitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="blue"
        />
      </v-list-item>

      <v-card-actions />
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  async fetch () {
    this.userFavourites = await this.$axios.$get('https://localhost:5001/api/User/getuserfav', {
      params: {
        userEntityId: this.user.userid
      }
    })
  },
  data: () => ({
    userFavourites: [],
    showFav: true
  }),
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    goToFav () {
      this.showFav = true
    },
    goToInfo () {
      this.showFav = false
    }
  }
}
</script>

<style scoped>

</style>

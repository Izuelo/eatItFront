<template>
  <RestaurantCard
    :restaurant="restaurant"
  />
</template>

<script>

import RestaurantCard from '@/components/RestaurantCard'

export default {
  name: 'Id',
  components: {
    RestaurantCard
  },
  async asyncData ({ params, $axios }) {
    const restaurant = await $axios.$get(`https://localhost:5001/api/Restaurant/${params.id}`)
    return { restaurant }
  },
  data () {
    return {
      id: this.$route.params.id,
      restaurant: []
    }
  }
}
</script>

<style scoped>

</style>

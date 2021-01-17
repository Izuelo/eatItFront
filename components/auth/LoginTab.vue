<template>
  <v-card
    class="mx-auto"
    max-width="500"
    style="padding: 20px"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="userAcc.username"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      />
      <v-text-field
        v-model="password"
        label="Password"
        required
      />
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="login"
      >
        Login
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'LoginTab',
  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    password: '',
    checkbox: false,
    userAcc: {
      userid: 0,
      username: '',
      tokenString: ''
    }
  }),
  computed: {
    ...mapState(['user/user'])
  },
  methods: {
    ...mapMutations('user', ['updateUser']),
    async login () {
      try {
        await this.$refs.form.validate()
        const response = await this.$axios.$post('https://localhost:5001/api/Auth/login', {
          username: this.userAcc.username,
          password: this.password
        })
        this.userAcc.userid = response.userEntityId
        this.userAcc.tokenString = response.tokenString
        this.updateUser(this.userAcc)
        await this.$router.push('/profile')
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <v-card
      v-if="!registered"
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
          v-model="login"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        />

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        />

        <v-text-field
          v-model="password"
          label="Password"
          required
        />
        <div
          style="display: flex ;align-items: center;justify-content: space-between;"
        >
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          />
          <div> Already registered ?</div>
        </div>
        <div
          style="display: flex;justify-content: space-between">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="register"
          >
            Register
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
            @click="skiptologin"
          >
            Click to Login
          </v-btn>
        </div>
      </v-form>
    </v-card>
    <LoginTab
      v-if="registered"
    />
  </div>
</template>

<script>
import LoginTab from './LoginTab'
export default {
  name: 'AuthTab',
  components: { LoginTab },
  data: () => ({
    registered: false,
    valid: true,
    login: '',
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
    checkbox: false
  }),

  methods: {
    async register () {
      try {
        await this.$refs.form.validate()
        await this.$axios.$post('https://localhost:5001/api/Auth/register', {
          username: this.login,
          password: this.password
        })
        this.registered = true
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    skiptologin () {
      this.registered = true
    }
  }
}
</script>

<style scoped>

</style>

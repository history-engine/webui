<template>
<div class="auth-wrapper d-flex align-center justify-center pa-4">
  <v-card
    class="auth-card pa-4 pt-7"
    max-width="448"
  >
    <v-card-text class="pt-2">
      <h5 class="text-h5 mb-1">
        Adventure starts here 🚀
      </h5>
      <p class="mb-0">
        Make your app management easy and fun!
      </p>
    </v-card-text>

    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.email"
              autofocus
              placeholder="johndoe@email.com"
              label="Email"
              type="email"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />

            <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
              <v-checkbox
                v-model="form.remember"
                label="Remember me"
              />
            </div>

            <!-- login button -->
            <v-btn
              block
              type="submit"
            >
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</div>
</template>

<style scoped lang="sass">

</style>

<script setup>
const form = ref({
  email: '',
  password: '',
  remember: false,
})
</script>

<template>
  <v-container class="">
    <h1>logout</h1>
  </v-container>
</template>

<style scoped lang="sass">
</style>

<script>

export default {
  data: () => ({
    loaded: false,
    loading: false,
    query: "",
    data: {},
  }),

  mounted() {
    if (localStorage.getItem("jwt_token")) {
      localStorage.removeItem("jwt_token")
      this.$router.push('/user/login')
    }
  },

  methods: {
    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },
  },
}
</script>

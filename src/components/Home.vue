<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto mt-n15"
      color="surface-light"
      max-width="600"
      >
      <v-text-field
        v-model="query"
        variant="solo"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @keyup.enter="onClick"
        @click:append-inner="onClick"
        label="请输入关键词"
      ></v-text-field>
    </v-card>
  </v-container>
</template>

<style scoped>
/deep/ .v-text-field{
  width: 540px;
}
.fill-height{
  padding-top:-500px;
}
</style>

<script>
export default {
  data: () => ({
    query: "",
  }),

  methods: {
    onClick () {
      this.$router.push({
        path: '/search',
        query: { query: this.query }
      })
    },
  },
}
</script>

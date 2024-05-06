<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="600"
      >
      <v-text-field
        :loading="loading"
        variant="solo"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
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
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
}
</script>

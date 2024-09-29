<template>
  <v-container fluid>
    storage
  </v-container>
</template>

<route>
{
meta: {
layout: "setting"
}
}
</route>

<script>
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Field is required',
    },
  }),
}
</script>

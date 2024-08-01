<template>
  <v-app-bar flat class="bg-grey-lighten-4">
    <v-container class="mx-auto d-flex align-center justify-center ">
      <v-btn text="首页" variant="text" @click="$router.push('/')"></v-btn>
      <v-btn text="Dashboard" variant="text"></v-btn>
      <v-btn text="Messages" variant="text"></v-btn>
      <v-btn text="Profile" variant="text"></v-btn>
      <v-btn text="Updates" variant="text"></v-btn>

      <v-spacer></v-spacer>

      <AppAvatar />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AppAvatar from "@/components/AppAvatar.vue";

const links = [
  'Dashboard',
  'Messages',
  'Profile',
  'Updates',
]
</script>

<script>
import { useAppStore } from "@/stores/app";
export default {
  setup() {
    const store = useAppStore();
    return { store, logo }
  },

  data: () => ({
    //
  }),
}
</script>

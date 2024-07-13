<template>
  <v-container>
      <div class="d-flex">
        <v-btn class="ma-2 pa-2" @click="$router.push('/')">首页</v-btn>
        <v-btn v-show="!store.online" class="ma-2 pa-2" @click="$router.push('/user/register')">注册</v-btn>
        <v-btn v-show="!store.online" class="ma-2 pa-2" @click="$router.push('/user/login')">登录</v-btn>
        <v-btn v-show="store.online" class="ma-2 pa-2" @click="$router.push('/user/logout')">退出</v-btn>
      </div>
  </v-container>
</template>

<script>

import { useAppStore } from "@/stores/app";

export default {
  setup() {
    const store = useAppStore();
    return { store }
  },

  data: () => ({
  }),

  mounted() {
  },

  methods: {
  },
};
</script>

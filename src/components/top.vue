<template>
  <v-container>
      <div class="d-flex">
        <v-btn class="ma-2 pa-2" @click="$router.push('/')">首页</v-btn>
        <v-btn class="ma-2 pa-2" @click="$router.push('/user/register')">注册</v-btn>
        <v-btn class="ma-2 pa-2" @click="$router.push('/user/login')">登录</v-btn>
      </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    showLoginModal() {
      // Implement your login modal logic here
    },
  },
};
</script>

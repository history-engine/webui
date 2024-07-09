<template>
  <v-container>
      <div class="d-flex">
        <v-btn class="ma-2 pa-2" @click="$router.push('/')">首页</v-btn>
        <v-btn v-show="!isLoggedIn" class="ma-2 pa-2" @click="$router.push('/user/register')">注册</v-btn>
        <v-btn v-show="!isLoggedIn" class="ma-2 pa-2" @click="$router.push('/user/login')">登录</v-btn>
        <v-btn v-show="isLoggedIn" class="ma-2 pa-2" @click="$router.push('/user/logout')">退出</v-btn>
      </div>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    isLoggedIn: false,
  }),

  mounted() {
    if (localStorage.getItem("jwt_token")) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  },

  methods: {
    showLoginModal() {
      // Implement your login modal logic here
    },
  },
};
</script>

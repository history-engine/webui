<script setup>
// import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@/assets/logo.svg?raw'

// const form = ref({
//   username: '',
//   email: '',
//   password: '',
//   privacyPolicies: false,
// })

// const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          History Engine
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          History Engine 用户注册
        </h5>
        <p class="mb-0">
          梦想从这里开始~ 🚀
        </p>
      </VCardText>

      <VCardText>
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="username"
                autofocus
                label="用户名"
                placeholder="需要保证唯一性"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="email"
                label="邮箱"
                placeholder="尽量使用Hotmail、Gmail等常用邮箱"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="密码"
                placeholder="8位以上数字、符号和字母的组合"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">我同意并愿意遵守</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary me-1"
                  >用户协议</a>
                  <span class="me-1">与</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >隐私政策</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                注册
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>已有账号？</span>
              <RouterLink
                class="text-primary ms-2"
                to="/user/login"
              >
                立即登录
              </RouterLink>
            </VCol>

<!--            <VCol-->
<!--              cols="12"-->
<!--              class="d-flex align-center"-->
<!--            >-->
<!--              <VDivider />-->
<!--              <span class="mx-4">or</span>-->
<!--              <VDivider />-->
<!--            </VCol>-->

            <!-- auth providers -->
<!--            <VCol-->
<!--              cols="12"-->
<!--              class="text-center"-->
<!--            >-->
<!--              <AuthProvider />-->
<!--            </VCol>-->
          </VRow>
        </v-form>
      </VCardText>
    </VCard>
  </div>
</template>

<!--<style lang="scss">-->
<!--@use "@core/scss/template/pages/page-auth.scss";-->
<!--</style>-->

<script>
import axios from "axios";
export default {
  data: () => ({
    username: '',
    email: '',
    password: '',
    privacyPolicies: false,
    isPasswordVisible: false,
  }),
  methods: {
    async submit() {
      axios({
        method: 'post',
        url: '/user/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
        withCredentials: true,
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          alert('注册失败，请检查您的邮箱和密码')
        });
    },
  },
};
</script>

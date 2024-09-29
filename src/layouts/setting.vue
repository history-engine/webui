<template>
  <v-app>
    <AppBar />

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg" class="pa-2">
                <v-list-item color="grey-lighten-4" title="个人资料" @click="$router.push('/setting/profile')"></v-list-item>
                <v-list-item color="grey-lighten-4" title="域名匹配" @click="$router.push('/setting/host')"></v-list-item>
                <v-list-item color="grey-lighten-4" title="别名设置" @click="$router.push('/setting/alias')"></v-list-item>
                <v-list-item color="grey-lighten-4" title="后缀过滤" @click="$router.push('/setting/filetype')"></v-list-item>
                <v-list-item color="grey-lighten-4" title="存储设置" @click="$router.push('/setting/storage')"></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pa-2">
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<template>
  <v-app>
    <AppBar />

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg" class="pa-2">
                <v-list-item title="用户管理" link></v-list-item>
                <v-list-item title="Icon管理" link></v-list-item>
                <v-list-item title="杂项设置" link></v-list-item>
                <v-list-item title="文件管理" link></v-list-item>
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
<script setup lang="ts">
</script>

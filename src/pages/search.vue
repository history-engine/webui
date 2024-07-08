<template>
  <v-container class="">
    <h1>Search</h1>
    <v-text-field
      :loading="loading"
      v-model="this.query"
      variant="solo"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      @keyup.enter="onClick"
      @click:append-inner="onClick"
      label="请输入关键词"
    ></v-text-field>

    <v-card class="mx-auto mt-3">
      <v-list lines="two">
          <v-list-item
            v-for="(item, index) in data"
            :key="index"
            :prepend-avatar="item[0].avatar"
            ripple
          >
            <template v-slot:title>
              <a :href="item[0].preview" target="_blank">{{item[0].title}}</a>
            </template>

            <template v-slot:default>
              <a :href="item[0].url">{{item[0].url}}</a>
            </template>

            <template v-slot:subtitle>
              <div v-html="item[0].content"></div>
            </template>

          </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped lang="sass">

</style>

<script>
import axios from "axios";

export default {
  data: () => ({
    loaded: false,
    loading: false,
    query: "",
    data: {},
  }),

  mounted() {
    this.query = this.getQueryParam('query');
    if (this.query) {
      this.onClick();
    }
  },

  created() {
    document.title = this.getQueryParam('query') + " - History Engine 搜索";
  },

  methods: {
    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    onClick () {
      this.loading = true
      axios({
        method: 'get',
        url: '/api/page/search',
        data: {
          query: this.keyword,
        },
        params: {
          query: this.query,
          page: 1,
          limit: 10,
          // start_time: '2023-11-21T17:28:33.480Z',
          // end_time: '2024-07-21T17:28:33.480Z',
        }
      })
        .then(resp => {
          this.loading = false
          this.data = resp.data.data
          console.log("搜索完成")
        })
        .catch(() => {
          alert('搜索失败，可能是服务器故障。')
        });
    },
  },
}
</script>

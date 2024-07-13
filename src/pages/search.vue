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
      @keydown.enter="onClick"
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

    <v-pagination
      class="mt-3"
      v-model="this.current_page"
      @update:modelValue="onClick"
      :length="this.total_page"
      :total-visible="7"
    ></v-pagination>
  </v-container>
</template>

<style scoped lang="sass">

</style>

<script>
import http from "@/services/http"

export default {
  data: () => ({
    loaded: false,
    loading: false,
    query: '',
    data: {},
    total_page: 1,
    current_page: 1,
    limit: 10,
  }),

  mounted() {
    this.current_page = parseInt(this.getQueryParam("page"), 10) || 1;
    this.query = this.getQueryParam('query') || '';
    if (this.query) {
      this.onClick();
    }
  },

  created() {
    document.title = this.getQueryParam('query') + " - History Engine 搜索";
    window.addEventListener('popstate', this.popstate, false);
  },

  methods: {
    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    onClick () {
      this.loading = true
      this.$router.push({ path: '/search', query: { query: this.query, page: this.current_page } });

      http({
        method: 'get',
        url: '/page/search',
        data: {
          query: this.keyword,
        },
        params: {
          query: this.query,
          page: this.current_page,
          limit: this.limit,
          // start_time: '2023-11-21T17:28:33.480Z',
          // end_time: '2024-07-21T17:28:33.480Z',
        }
      }).then(resp => {
        this.loading = false
        this.data = resp.data.pages
        this.total_page = Math.ceil(resp.data.total / this.limit)
        console.log("搜索完成")
      }).catch(err => {
        alert('搜索失败：' + err)
      });
    },

    popstate() {
      this.onClick();
    }
  },

  watch: {
    '$route.query.query'(newQuery) {
      this.query = newQuery || '';
    }
  },

  destroyed() {
    window.removeEventListener('popstate', this.popstate, false);
  }
}
</script>

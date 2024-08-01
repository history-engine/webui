<template>
  <v-container class="">
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
          :prepend-avatar="item.avatar"
          ripple
        >
          <template v-slot:title>
            <span class="text-grey-lighten-2">[{{item.version}}]</span><a :href="item.preview" target="_blank">{{item.title}}</a>
          </template>

          <template v-slot:default>
            <a :href="item.url" target="_blank">{{item.url}}</a>
          </template>

          <template v-slot:subtitle>
            <div v-html="item.content"></div>
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
    limit: 20,
  }),

  mounted() {
    this.current_page = parseInt(this.getQueryParam("page"), 10) || 0;
    this.query = this.getQueryParam('query') || '';
    this.onClick();
  },

  created() {
    window.addEventListener('popstate', this.handlePopState);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('query')) {
      this.query = urlParams.get('query');
      this.onClick();
    }
  },

  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopState);
  },

  methods: {
    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    onClick () {
      if (this.loading) {
        return
      }
      this.loading = true

      document.title = this.query + " - History Engine";

      http({
        method: 'get',
        url: '/page/search',
        params: {
          query: this.query,
          page: this.current_page || 1,
          limit: this.limit,
          // start_time: '2023-11-21T17:28:33.480Z',
          // end_time: '2024-07-21T17:28:33.480Z',
        }
      }).then(resp => {
        if (resp.code == 0) {
          this.loading = false
          this.data = resp.data.pages
          this.total_page = Math.ceil(resp.data.total / this.limit)

          const url = new URL(window.location);
          if (this.query) {
            url.searchParams.set('query', this.query);
          }
          if (this.current_page > 0) {
            url.searchParams.set('page', this.current_page);
          }
          history.pushState({ query: this.query, page: this.current_page }, '', url);
        } else {
          alert(resp.message)
        }
      }).catch(err => {
        alert('搜索失败：' + err)
      });
    },

    handlePopState(event) {
      if (event.state && event.state.query) {
        this.query = event.state.query;
        this.onClick();
      }
    },
  }
}
</script>

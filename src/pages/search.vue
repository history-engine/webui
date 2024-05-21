<template>
  <div>
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
  </div>
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
  }),

  mounted() {
    this.query = this.getQueryParam('query');
    if (this.query) {
      this.onClick();
    }
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
          query: '工作',
          page: 1,
          start_time: '2023-11-21T17:28:33.480Z',
          end_time: '2024-05-21T17:28:33.480Z',
        }
      })
        .then(resp => {
          this.loading = false
          console.log(resp.data.data)
        })
        .catch(() => {
          alert('搜索失败，可能是服务器故障。')
        });
    },
  },
}
</script>

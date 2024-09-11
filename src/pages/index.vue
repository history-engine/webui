<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <span class="headline">选择要忽略的域名</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-checkbox
            v-for="(option, index) in domainList"
            :key="index"
            v-model="domainSelected[option]"
            :label="option"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="dialog = false">取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitExclude">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

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
          @mouseover="this.hoveredIndex = index"
          @mouseleave="this.hoveredIndex = null"
        >
          <template v-slot:title>
            <span class="text-grey-lighten-2">[{{item.version}}]</span>
            <a :href="item.preview" target="_blank">{{ subStr(item.title, 30) }}</a>
            <span class="text-grey-lighten-2 action-buttons" :class="{ 'hidden-btns': hoveredIndex !== index }">
              [{{item.id}}][{{item.time}}][{{item.unique_id}}-{{item.version}}][{{item.size}}]
            </span>
          </template>

          <template v-slot:default>
            <div class="v-list-item-title">
              <a :href="item.url" target="_blank">{{ subStr(item.url, 70) }}</a>
              <span :class="{ 'hidden-btns': hoveredIndex !== index }" class="action-buttons">
                <v-btn color="red" variant="text" size="x-small" @click="confirmDeleteItem(item.unique_id, item.version)">删除</v-btn>
                <v-btn color="red" variant="text" size="x-small" @click="openExcludeDialog(item.unique_id, item.version, item.url)">忽略</v-btn>
                <v-btn color="red" variant="text" size="x-small" @click="versions(item.unique_id)">其他版本</v-btn>
                <v-btn color="red" variant="text" size="x-small" @click="reParse(item.unique_id, item.version)">重新处理</v-btn>
              </span>
            </div>
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

<style>
.hidden-btns {
  display: none;
}

.v-list-item:hover .hidden-btns {
  display: inline-flex;
}
</style>

<script>
import http from "@/services/http"

export default {
  data: () => ({
    loaded: false,
    loading: false,
    query: '',
    uniqueId: '',
    data: {},
    total_page: 1,
    current_page: 1,
    limit: 20,
    dialog: false,
    currentUniqueId: "",
    currentVersion: 0,
    domainList: [],
    domainSelected: {},
    hoveredIndex: null,
    domain: []
  }),

  mounted() {
    this.current_page = parseInt(this.getQueryParam("page"), 10) || 0;
    this.query = this.getQueryParam('query') || '';
    this.uniqueId = this.getQueryParam('unique_id') || '';
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
    reParse(uniqueId, version) {
      http({
        method: "post",
        url: "/page/re-parse",
        data: {
          unique_id: uniqueId,
          version: version
        }
      }).then(resp => {
        if (resp.code == 0) {
          alert(resp.message)
          this.onClick()
        } else {
          alert(resp.message)
        }
      }).catch(err => {
        alert('操作失败：' + err)
      });
    },

    confirmDeleteItem(uniqueId, version) {
      if (confirm("确定删除吗？")) {
        this.deleteItem(uniqueId, version);
      }
    },

    versions(uniqueId) {
      window.location.href = '/?unique_id=' + uniqueId;
      // let query = this.$router.history.current.query;
      // let path = this.$router.history.current.path;
      // this.$router.push({ path, query: {uniqueId: uniqueId} });
    },

    extractDomains(url) {
      const hostname = new URL(url).hostname;
      const parts = hostname.split('.');

      const domains = new Set();
      domains.add(hostname);

      if (parts.length >= 2) {
        const rootDomain = parts.slice(-2).join('.');
        domains.add(rootDomain);
        domains.add(`*.${rootDomain}`);
      }

      if (parts.length > 2) {
        for (let i = 1; i < parts.length - 1; i++) {
          const wildcardDomain = `*.${parts.slice(i).join('.')}`;
          domains.add(wildcardDomain);
        }
      }

      return Array.from(domains);
    },

    openExcludeDialog(uniqueId, version, url) {
      this.domainSelected = {}
      this.domainList = this.extractDomains(url)
      this.currentUniqueId = uniqueId
      this.currentVersion = version
      this.dialog = true;
    },

    submitExclude() {
      const selectedValues = Object.keys(this.domainSelected).filter(
        option => this.domainSelected[option]
      );

      if (!selectedValues || selectedValues.length == 0) {
        alert("请选择域名")
        return
      }

      http({
        method: "post",
        url: "/page/exclude",
        data: {
          unique_id: this.currentUniqueId,
          version: this.currentVersion,
          domains: selectedValues,
        }
      }).then(resp => {
        if (resp.code == 0) {
          alert("操作成功，请等待生效。")
          this.onClick()
        } else {
          alert(resp.message)
        }
      }).catch(err => {
        alert('操作失败：' + err)
      });

      this.dialog = false;
    },

    deleteItem(uniqueId, version) {
      http({
        method: "delete",
        url: "/page/delete",
        data: {
          unique_id: uniqueId,
          version: version
        }
      }).then(resp => {
          if (resp.code == 0) {
            this.onClick()
          } else {
            alert(resp.message)
          }
      }).catch(err => {
        alert('操作失败：' + err)
      });
    },

    subStr(str, size) {
      if (str.length <= size) {
        return str
      }
      return str.substring(0, size) + '...'
    },

    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    onClick () {
      if (this.loading) {
        return
      }
      this.loading = true

      let api = ''
      let params = {}
      if (this.uniqueId != '') {
        api = '/page/versions'
        params = {
          unique_id: this.uniqueId,
          page : this.current_page,
          limit: this.limit
        }
        document.title = this.uniqueId + " - History Engine";
      } else {
        api = '/page/search'
        params = {
          query: this.query,
            page: this.current_page || 1,
            limit: this.limit,
          // start_time: '2023-11-21T17:28:33.480Z',
          // end_time: '2024-07-21T17:28:33.480Z',
        }
        document.title = this.query ? this.query + " - History Engine" : "History Engine";
      }

      http({
        method: 'get',
        url: api,
        params: params
      }).then(resp => {
        if (resp.code == 0) {
          this.loading = false
          this.data = resp.data.pages
          this.total_page = Math.ceil(resp.data.total / this.limit)

          const url = new URL(window.location);
          if (this.query) {
            url.searchParams.set('query', this.query);
          }
          if (this.uniqueId) {
            url.searchParams.set('unique_id', this.uniqueId);
          }
          if (this.current_page > 0) {
            url.searchParams.set('page', this.current_page);
          }
          history.pushState({ query: this.query, unique_id: this.uniqueId, page: this.current_page }, '', url);
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

<template>
  <v-container fluid>
    <v-row align="center" justify="end">
      <v-col cols="10">
        <v-text-field
          v-model="keyword"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          @keydown.enter="search"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn size="large" variant="tonal" @click="search">搜索</v-btn>
      </v-col>
    </v-row>

    <v-data-table-server
      :items-per-page="itemsPerPage"
      :page="page"
      :items="items"
      :headers="headers"
      :loading="loading"
      :items-length="totalItems"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.host }}</td>
          <td>{{ item.type == 1 ? '包括' : '忽略' }}</td>
          <td>{{ item.created_at }}</td>
          <td>
<!--            <v-btn class="mr-2">删除</v-btn>-->
<!--            <v-btn>修改</v-btn>-->
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<route>
{
meta: {
layout: "setting"
}
}
</route>

<script>
import http from "@/services/http"

export default {
  data: () => ({
    page: 1,
    items: [],
    itemsPerPage: 10,
    totalItems: 0,
    sortBy: null,
    headers: [
      { title: 'Id', key: 'id' },
      { title: '域名', key: 'host' },
      { title: '类型', key: 'type', value: v => { return v == 1 ? '包括' : '忽略'} },
      { title: '更新时间', key: 'updated_at' },
      { title: '操作', key: '' },
    ],
    keyword: '',
    loading: true,
  }),

  methods: {
    search() {
      this.loadItems({
        page:this.page,
        itemsPerPage:this.itemsPerPage,
        sortBy:this.sortBy,
      })
    },

    loadItems ({ page, itemsPerPage, sortBy }) {
      this.page = page
      this.loading = true
      this.itemsPerPage = itemsPerPage
      this.sortBy = sortBy

      const params = {
        page: page,
        limit: itemsPerPage,
        keyword: this.keyword,
      }

      if (sortBy && sortBy.length > 0) {
        params.order = sortBy[0].order
        params.by = sortBy[0].key
      }

      http({
        method: "get",
        url: "/setting/host",
        params: params,
      }).then(resp => {
        if (resp.code == 0) {
          this.items = resp.data.data
          this.totalItems = resp.data.total
          this.loading = false
        } else {
          this.alert(resp.message)
        }
      }).catch(err => {
        this.alert('操作失败：' + err)
      });
    },

    alert(text) {
      this.snackbar = true
      this.text = text
    },
  },
}
</script>

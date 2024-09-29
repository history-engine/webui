<template>
  <v-container fluid>
    <v-form validate-on="submit" rounded="lg" @submit.prevent>
      <div class="text-subtitle-1 text-medium-emphasis">最大版本数</div>
      <v-number-input
        class="mb-4"
        hint="超过设置的版本数时，将自动删除最早的版本。"
        :rules="[rules.required]"
        required
        :min="1"
        variant="outlined"
      ></v-number-input>

      <div class="text-subtitle-1 text-medium-emphasis">最小保存间隔（秒）</div>
      <v-text-field
        class="mb-4"
        hint="此间隔时间内，重复访问一个网页，不再保存。"
        :rules="[rules.required]"
        required
        type="number"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">最小HTML文件大小</div>
      <v-text-field
        class="mb-4"
        hint="小于此大小的HTML文件不会被保存，1MB=1024*1024=1,048,576字节"
        :rules="[rules.required]"
        required
        type="number"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">最大HTML文件大小</div>
      <v-text-field
        hint="大于此大小的HTML文件不会被保存，1MB=1024*1024=1,048,576字节"
        :rules="[rules.required]"
        required
        type="number"
        variant="outlined"
      ></v-text-field>

      <v-btn variant="outlined">保存</v-btn>
    </v-form>
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
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Field is required',
    },
  }),
}
</script>

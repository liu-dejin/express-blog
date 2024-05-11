<script setup>
import { ref } from 'vue'
import { artGetDetailService } from '@/api/article'
import { baseURL } from '@/utils/request'
import { formatTime } from '@/utils/format'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const previewDrawer = ref(false)
const previewData = ref({
  title: '',
  username: '',
  date: '',
  cate_name: '',
  cover_img: '',
  content: ''
})

const preview = async (row) => {
  previewDrawer.value = true //显示
  const res = await artGetDetailService(row.id)
  const data = res.data.data

  previewData.value = {
    title: data.title,
    username: data.username,
    date: formatTime(data.pub_date),
    cate_name: data.cate_name,
    cover_img: baseURL + data.cover_img,
    content: data.content
  }
  console.log(previewData.value) // 打印渲染后的数据
}
defineExpose({
  preview
})
</script>

<template>
  <div>
    <el-drawer v-model="previewDrawer" title="文章预览" size="50%">
      <div class="drawer">
        <h1>{{ previewData.title }}</h1>

        <p>作者：{{ previewData.username }}</p>
        <p>修改时间：{{ previewData.date }}</p>
        <p>文章分类：{{ previewData.cate_name }}</p>
        <hr />
        <img :src="previewData.cover_img" alt="" />

        <!-- 文章内容 -->
        <div class="ql-container ql-snow">
          <div class="ql-editor">
            <div v-html="previewData.content"></div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
.drawer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  hr {
    border: 0;
    border-top: 1px solid #ccc;
    margin: 10px 0;
  }

  p {
    color: #666;
    margin: 5px 0;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 15px;
  }

  .ql-container {
    margin-top: 20px;

    .ql-editor {
      color: #333;
      font-size: 16px;
      line-height: 1.6;
    }
  }

  // Responsive design for smaller screens
  @media only screen and (max-width: 600px) {
    padding: 15px;

    h1 {
      font-size: 20px;
    }

    .ql-editor {
      font-size: 14px;
    }
  }
}
</style>

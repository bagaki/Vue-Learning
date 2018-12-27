<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>Iusse Time: {{ photoinfo.add_time | dataFormat }}</span>
      <span>Click: {{ photoinfo.click }} time</span>
    </p>

    <hr>

    <!-- 縮略圖 -->
    <vue-preview :slides="slide1" @close="handleClose">
      <img
        :src="item.src"
        alt
        class="preview-img"
        v-for="(item, index) in list"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      >
    </vue-preview>
    <!-- 圖片内容 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 評論子組件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: [] // 縮略圖
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("Photo Info get false");
        }
      });
    },
    getThumbs() {
      // 獲取縮略圖
      this.$http.get("api/getthumbs" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循環每個圖片數據，補全圖片的寬和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的數據保存到 list 中
          this.list = result.body.message;
        }
      });
    }
  },
  components: {
    // 注冊評論自組件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 14px;
    line-height: 30px;
  }
}
</style>

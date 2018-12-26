<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>Issue Time: {{ item.add_time | dateFormat }}</span>
              <span>click: {{ item.click }} time</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getNewsList").then(result => {
        if (result.body.status === 0) {
          this.newslist = result.body.message;
        } else {
          Toast("Get false");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: cornflowerblue;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

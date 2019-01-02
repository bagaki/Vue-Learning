<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeItems" :key="item.url">
        <img :src="item.img" alt="images" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：爲什麽商品評論中的輪播圖那麽丑 -->
  <!-- 1. 首頁中的圖片，他的寬和高 使用了 100% 的寬度
       2. 在商品詳情頁面中，輪播圖的圖片，如果也使用 寬高為100%的話，頁面就醜了
       3. 商品詳情頁面中的輪播圖，期望高度是100%， 但寬度為 auto
       4. 所以，首頁中的輪播圖和詳情中輪播圖，寬高要不同
  5. 定義一個屬性，讓 使用輪播圖的調用者，手動指定-->
</template>

<script>
export default {
  props: ["swipeItems", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: cadetblue;
    // }
    // &:nth-child(2) {
    //   background-color: darkgray;
    // }
    // &:nth-child(3) {
    //   background-color: hotpink;
    // }

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>

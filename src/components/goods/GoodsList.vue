<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/' + item.id"
      tag="div"
    >
      <img :src="item.img.url" alt>
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{ item.sell_price }}</span>
          <span class="old">{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span class="hot">Hot!</span>
          <span>Have {{ item.stock_quantity }} one</span>
        </p>
      </div>
    </router-link>-->
    <!-- 在網頁中，有兩種跳轉方式 -->
    <!-- 方式1：使用 a 標簽的形式 叫做標簽跳轉 -->
    <!-- 方式2：使用 window.location.href 的形式，叫做 編程式導航 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
      <img :src="item.img.url" alt>
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{ item.sell_price }}</span>
          <span class="old">{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span class="hot">Hot!</span>
          <span>Have {{ item.stock_quantity }} one</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">More</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data是往組件内部，挂在私有數據
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 獲取商品列表t
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    getDetail(id) {
      // 使用JS的形式進行路由導航
      // this.$route 是路由參數對象，所有路由中的參數，params, query 都屬於它
      // this.$router 是一個路由導航對象，用它可以方便地使用 JS代碼，實現路由的 前進、後退、跳轉到新的url地址
      // this.router.push("/home/goodsinfo/" + id);
      // this.router.push({ path: "/home/goodsinfo/" + id });
      this.router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;

        .hot {
          font-size: 15px;
          font-weight: bold;
          color: red;
        }
      }
    }
  }
}
</style>

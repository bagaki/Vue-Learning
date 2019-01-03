<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChange(item,id, $store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">${{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 如何從購物車中獲取商品的數量 
                      先創建一個 空對象，然後循環購物車所有商品的數據，吧當前循環這條商品的 id，
                作爲對象的屬性名，count值作爲對象的屬性值，得到一個對象{88: 2, 89: 1, 90:4}-->
                <a href="#" @click.prevent="remove(item.id, i)">Delete</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 結算區 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner payfor">
          <div class="left">
            <p>Totle</p>
            <p>
              Selected Produce:
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>, Totle Price:
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">Pay</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 獲取到 store中所有商品的id，然後拼接一個字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChange(id, val) {
      // 每儅點擊開關，吧最新的快關狀態同步到 store 中
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .payfor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>

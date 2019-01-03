<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品輪播圖 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :swipeItems="swipe" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品購買 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            Market Price:
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;Sale Price:
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>Buy Number:
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">Buy Now</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">Put into Car</mt-button>
            <!-- 分析：如何實現加入購物車時候，拿到 選擇的數量
                  1.按鈕屬於 goodsinfo頁面，數字屬於 numbox組件
                  2.由於涉及父子組件的嵌套，所以，無法直接在 goodsinfo頁面中獲取到 選中的商品數量值
                  3.怎麽麽解決這個問題：涉及到子組件向父組件傳值了（時間調用機制）
            4.事件調用本質：父向子傳遞方法，子調用這個方法，同時把數據當作參數 傳遞給這個方法-->
          </p>
        </div>
      </div>
    </div>
    <!-- 商品參數 -->
    <div class="mui-card">
      <div class="mui-card-header">Produce Params</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <P>Number: {{ goodsinfo.goods_no }}</P>
          <P>Stock: {{ goodsinfo.stock_quantity }}</P>
          <P>Update: {{ goodsinfo.add_time | dateFormat }}</P>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">Descrition</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">Comment</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, // 將路由參數對象中的id挂在到data中
      swipe: [],
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 1 // 保存用戶選中的商品數量，默認用戶買一個
    };
  },
  created() {
    this.getSwipe();
    this.getGoodsInfo();
  },
  methods: {
    getSwipe() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循環輪播圖數組的每一項，為 item 添加img屬性，因爲輪播圖組件，只認識 item.img，不認識 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.swipe = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 獲取商品信息
      this.$http.get("api/goods/getinfo" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 點擊使用編程式導航跳轉到圖文介紹
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 點擊使用編程式導航跳轉到評論頁面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 拼接一個，要保存到 store中car數組裏的商品信息對象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 調用 store 中的 mutations 來將商品加入購物車
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球動畫優化思路
      // 1.先分析導致動畫不準確的本質原因：小球最終位移到的位置，已局限在某一分辨率，
      //   滾動條未滾動的情況下
      // 2.只要分辨率和測試時不一樣，或 滾動條有一定滾動距離，就會出現問題
      // 3.所以，不能把位置的縱橫坐標寫死，而是要動態計算坐標值
      // 4.先得到購物車標簽橫縱坐標，再得到小球的橫縱，
      //   然後讓 y值球差，x值求差，得到的結果，就是縱橫坐標的位移距離
      // 5.如何獲取坐標？ domoObject.getBoundingClientRect()

      // 獲取小球的在頁面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 獲取購物車徽標在頁面中的位置
      const badgePostion = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePostion.left - ballPosition.left;
      const yDist = badgePostion.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 儅子組件吧選中的數量傳遞給父組件的時候，吧選中的值保存到data上
      this.selectedCount = count;
      console.log("父組件拿到的數量值為：" + this.selectedCount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>

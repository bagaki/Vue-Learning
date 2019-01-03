<template>
  <div>
    <div class="mui-numbox" data-numbox-min="initcount" style="height: 25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        value="1"
        @change="countChanged"
        ref="numbox"
        readonly
      >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      // 數量改變
      // 每當數量值改變，則立即把最新的數量同步到 購物車的store中
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount", "goodsid"]
};
</script>

<style lang="scss" scoped>
</style>

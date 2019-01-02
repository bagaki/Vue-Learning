<template>
  <div>
    <!-- 可以使用 watch 屬性監聽父組件傳遞過來的 max 值，
    不管watch會被處罰幾次，最後一次，肯定是個 合法的 max值-->
    <div class="mui-numbox" data-numbox-min="1" :max="max">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        value="1"
        @change="countChanged"
        ref="numbox"
      >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>

  <!-- 分析：子組件什麽時候把 數據傳遞給父組件
  -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    // 初始化數字選擇框組件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      // 每當 文本框的數據被修改的時候，立即把最新的數據，通過事件調用，傳遞給父組件
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
      max: function(newVal, oldVal) {
        mui(".mui-numbox").numbox().setOption("max", newVal);
      }
  }
};
</script>

<style lang="scss" scoped>
</style>

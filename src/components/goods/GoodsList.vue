<template>
  <div class="goods-list">
    <div class="goods-item">
      <img
        src="https://img10.360buyimg.com/n1/s180x180_jfs/t28819/63/856646497/302951/33df8a1a/5bff56f9N2e6e97e2.jpg"
        alt
      >
      <h1 class="title">华为 HUAWEI Mate 20</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥4499.00</span>
          <span class="old">￥5000.00</span>
        </p>
        <p class="sell">
          <span class="hot">Hot!</span>
          <span>Have 60 one</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img
        src="https://img10.360buyimg.com/n7/jfs/t25672/46/199413170/136169/b39478e/5b68fb71N0b40be12.jpg"
        alt
      >
      <h1 class="title">索尼（SONY）DSC-RX100M5A 黑卡数码相机 1英寸大底</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥4499.00</span>
          <span class="old">￥5000.00</span>
        </p>
        <p class="sell">
          <span class="hot">Hot!</span>
          <span>Have 60 one</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img
        src="https://img10.360buyimg.com/n1/s180x180_jfs/t28819/63/856646497/302951/33df8a1a/5bff56f9N2e6e97e2.jpg"
        alt
      >
      <h1 class="title">华为 HUAWEI Mate 20</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥4499.00</span>
          <span class="old">￥5000.00</span>
        </p>
        <p class="sell">
          <span class="hot">Hot!</span>
          <span>Have 60 one</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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

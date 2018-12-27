<template>
  <div class="cmt-container">
    <h3>Issue Comment</h3>
    <hr>
    <textarea placeholder="Please input something(more 120 word)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComments">Issue Comment</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >No.{{ i+1 }}&nbsp;&nbsp;User: {{ item.user_name }}&nbsp;&nbsp;Issue Time: {{ item.add_time | dateFormat }}}</div>
        <div class="cmt-body">{{ item.content === "undefined" ? "Say Nothing": item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">More</mt-button>
  </div>
</template>

<script>
export default {
  date() {
    return {
      pageIndex: 1,
      comments: [],
      msg: "" // 評論輸入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每獲取新評論，不清空老數據，拼接上新數組
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("Comment false");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComments() {
      // 校驗是否爲空
      if (this.msg.trim().length === 0) {
        return Toast("The comment can not be empty");
      }
      // 發表評論
      // 參數1：請求的URL地址
      // 參數2：提交給服務器的數據對象 { content: this.msg }
      // 參數3：定義提交的時候，表單中數據的格式 { emulateJSON: true }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            var cmt = {
              user_name: "No name",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  .h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

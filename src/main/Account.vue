<template>
  <div>
    <h1>This is account.vue do</h1>
    <router-link to="/account/signin">Sign in</router-link>
    <router-link to="/account/register">Register</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
body {
  div {
    background-color: cadetblue;
  }
}
</style>
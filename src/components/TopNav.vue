<template>
  <div>
    <el-menu default-active="1" class="el-menu-demo topnav" mode="horizontal" :router=true theme="dark">
      <el-menu-item index="home">Home</el-menu-item>
      <el-menu-item index="question" to="">问答</el-menu-item>
      <el-submenu index="2">
        <template slot="title">第三方组件</template>
        <el-menu-item index="charts">Echarts</el-menu-item>
        <el-menu-item index="login">Not Found</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'top-nav'
}
</script>

<style>
  body {
     margin: 0
  }
</style>

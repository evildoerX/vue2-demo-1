<template>
  <div class="topnav">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" :router=true>
      <el-menu-item index="/">我的实验室</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3"></el-menu-item>
      </el-submenu>
      <el-menu-item index="/yes-or-no" to="">？？?</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'top-nav'
}
</script>

<style>
</style>

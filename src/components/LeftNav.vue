<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="3">
        <el-menu :router=true>
          <el-submenu index="1">
          <template slot="title">导航一</template>
          <el-menu-item-group title="测试左侧导航">
              <el-menu-item index="/charts">三方库</el-menu-item>
              <el-menu-item index="/question">相同index</el-menu-item>
          </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/question">相同index</el-menu-item>
          <el-menu-item index="3">Not Found</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-card class="box-card">
          <router-view></router-view>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'left-nav'
}
</script>

<style>
/*.else {
  margin: 10 10 10 10;
}*/
</style>

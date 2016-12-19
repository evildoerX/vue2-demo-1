<template>
  <div id='top-nav-else'>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
export default {
  name: 'top-nav-else',
  components: {
    'top-nav': TopNav
  }
}
</script>

<style>
</style>
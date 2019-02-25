<template>
  <div>
    <header-bar/>
      <nuxt />
    <footer-bar/>
  </div>
</template>

<script>
import HeaderBar from '../components/header/Index'
import FooterBar from '../components/footer/index'
export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>


<style>
 
</style>

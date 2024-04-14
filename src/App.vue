<template>
  <div id="app">
    <NavbarComponent></NavbarComponent>
<!--    <HeaderVue></HeaderVue>-->
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import NavbarComponent from './components/Navbar.vue'
// import HeaderVue from "@/components/navbar/headerVue.vue";
import footerComponent from "@/components/navbar/footerComponent.vue";
export default {

  name: 'app',
  components: {
    NavbarComponent,
    footerComponent
    // HeaderVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template lang="pug">
  nav.navbar.nav
    a(href="#").burger.nav-toggle
      - for(var i=0; i<3; i++)
        span
    .navbar__nav.nav-left.nav-menu
      a(href="#" v-for='item in links' @click.prevent="navHandler(item)").navbar__link.nav-item {{item}}
</template>

<script>
  export default{
    name: 'navVue',
    props: ['links'],
    data() {
      return {
      }
    },
    methods: {
      navHandler(item){
        this.$emit('navClick',item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .burger{
    &>span{
      display: block;
      width: 26px;
      height: 3px;
      background: #000;
      &:nth-child(2){
        margin: 4px 0;
      }
    }
  }
  .navbar{
    background: #ccc;
    position: relative;
  }
</style>

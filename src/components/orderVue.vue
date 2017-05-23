<template lang="pug">
ul(v-if='order.length')
  li(v-for='item in order')
    template(v-if='item.quantity')
      div {{item.name}} {{item.quantity}}
p(v-else) no dishes selected
</template>

<script>

  export default{
    name: 'orderVue',
    props: ['order'],
    data() {
      return {
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="scss" >

</style>

<template lang="pug">
  //- .dish-block__body
    //- .dish-block__item(v-for="item in food")
  .column(v-if='foodSearch.length')
    .dish-block.box
      h3.dish-block__heading.title.is-4 {{category}}:
      .dish-block__item(v-for="item in foodSearch")
        dish-input-vue(v-on:total='totalVal' :food='item' :clear="clear" )
</template>

<script>
  import Vue from 'vue'
  import dishInputVue from './dishInputVue.vue'

  // Define a custom filter called "currency".
  Vue.filter('currency', function (value) {
      return value.toFixed(2) +' UAH'
  });

  export default{
    name: 'dishVue',
    props: ['food','clear','search','category'],
    data() {
      return {
        dishQuant: 0,
        total: 0
      }
    },
    computed: {
      foodSearch(){
        let searchVal = this.search.toLowerCase()
        let tt = this.food.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchVal) !== -1){
                    return item;
                }
            })
        return tt
      }
    },
    methods: {
      totalVal(payload) {
        this.$emit('totalMenu',payload)
      }
    },
    components: {
      dishInputVue
    }
  }
</script>

<style lang="scss">

</style>

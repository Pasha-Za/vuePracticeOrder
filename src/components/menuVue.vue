<template lang="pug">
  .menu.container
    .search-block
      .field
        label.label search field
        p.control
          input.input(type='text', placeholder='Search input' v-model="searchInput")
          button(@click="clearSearch").button.is-danger clear
      .search-block__result
        div(v-if='!searchResult.length').notification
          | Sorry, no matches
        br
        //- div.notification(v-for='item in searchResult')
        //-   |{{item.name}} {{item.price | currency}}
    ul.columns
        dish-vue(v-for="item in menu" :food="item.food" v-on:totalMenu="totalMenu" :clear='clear' :search='searchInput' :category='item.category' :key="item.category")
    .card.column
      order-vue(:order="order")
      .total.tag.is-info.is-large(v-bind:class="[totalDiscount!==null ? 'linethrough' : '']") {{total | currency}}
      .total.tag.is-success.is-large(v-if="totalDiscount!==null") {{totalDiscount | currency}}
      .field.discount(v-if="discount")
        label.label input promo code
        p.control
          input.input(type='text', placeholder='Enter code' v-model="codeInput")
          button(@click.prevent="checkPromo").button.is-warning check
          p.price-promo
      button(@click="clearBtn").button.is-danger clear
</template>

<script>
  import dishVue from './dishVue.vue'
  import orderVue from './orderVue.vue'
  import bus from '../bus.js'
  import searchObjProp from '../helpers/searchObjProp'
  let findIndex = require('lodash/findIndex');

  export default{
    name: 'menuVue',
    props: ['menu'],
    data() {
      return {
        total: 0,
        totalDiscount: null,
        order: [],
        clear: 0,
        searchInput: '',
        discount: true,
        codeInput: '',
        promoCodes: ['qwerty','asdfgh','zxcvbn']
      }
    },
    computed: {
      searchResult() {
        let searchArr = [],
            searchInput = this.searchInput

        let dishArray = this.menu.map((item,index)=>{
          return item.food
        })
        let search = dishArray.map((item)=>{
          for (let i = 0; i < item.length; i++) {
            // console.log(item[i])
            searchArr.push(item[i])
          }
          return searchArr
        })

        if(!searchInput){
          return searchArr
        }
        searchInput = searchInput.trim().toLowerCase();

        searchArr = searchArr.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchInput) !== -1){
                    return item;
                }
            })
        return searchArr
      }
    },
    methods: {
      totalMenu(payload){
        if (this.clear===1) {
          this.clear = 0
        }
        this.total += payload.price
        // list logic
        // console.log(payload)
        let array = this.order
        let index = findIndex(array, payload);
        // console.log(index)
        if (index===-1) {
          if(array.length>0){
            let tt = searchObjProp(payload.name,'name',array) || null
            // console.log(tt)
            if(tt===null){
              this.order.push(payload)
            } else {
              console.log(tt)
              this.order[tt.index]['quantity']=payload.quantity
            }
          } else {
            this.order.push(payload)
          }
        } else {
          // console.log(!payload.isAdded&&payload.quantity===0)
          if (!payload.isAdded&&payload.quantity===0) {
            array.splice(index,1)
          }
        }
      },
      clearBtn() {
        this.total = 0
        this.order = []
        this.clear = 1
        this.searchInput= ''
        bus.$emit('clearEvent');
      },
      clearSearch() {
        this.searchInput= ''
      },
      checkPromo(){
        let userCode = this.codeInput
        function findPromo(element) {
          return element === userCode
        }
        let giveDiscount = this.promoCodes.find(findPromo) || null
        if(giveDiscount!==null){
          this.totalDiscount = this.total-(this.total*0.05)
        }
      }
    },
    components: {
      dishVue,
      orderVue
    }
  }
</script>

<style lang="scss" scope>
  .search-block{
    .control{
      padding-right: 60px;
      position: relative;
      input{
        &+button{
          position: absolute;
        }
      }
    }
  }
  .discount{
    max-width: 300px;
    margin: 15px auto 5px;
  }
  .total{
    &.tag.is-info{
      position: relative;
      &::before{
        content: '';
        position: absolute;
        top: 15%;
        left: -5%;
        transform: translate(0%, -50%) rotate(15deg);
        transform-origin: left;
        height: 4px;
        width: 0;
        background: red;
        transition: width 1s;
      }
      &.linethrough{
        &::before{
          width: 110%;
        }
      }
    }
  }
</style>

<template lang="pug">
div.field(v-bind:class="{active: food.isAdded}")
  .dish-block__data
    h4.dish-block__name.title.is-5 {{food.name}}
    .dish-block__info.subtitle.is-6 {{food.info}}
    .dish-block__price.tag.is-info.is-medium {{priceComputed | currency}}
  .dish-block__input.control
    input(type="text" v-model="this.food.quantity" :readonly="true").input
    button(type="button" @click.prevent="incrQuant" v-if="!orderBtn").button.is-info.is-small +
    button(type="button" @click.prevent="decrQuant" v-if="!orderBtn").button.is-info.is-small -
    a(href="#" v-if="orderBtn" @click.prevent="orderHandler").button.is-info order
</template>

<script>
  import bus from '../bus.js'

  export default {
    name: 'dishInputVue',
    props: ['food','clear'],
    data() {
      return {
        orderBtn: true,
        input: {
          // dishQuant: this.food.quantity,
          // dishQuant: 0,
        },
        // foodInfo: {
        //   cost: 0,
        //   quantity: 0,
        //   name: null,
        //   isAdded: this.food.isAdded
        // }
      }
    },
    computed: {
      priceComputed(){
        let newPrice
        if (this.food.price>0) {
          newPrice = this.food.price
        } else {
          newPrice = -(this.food.price)
        }
        return newPrice
      }
    },
    methods: {
      orderHandler(){
        this.orderBtn = !this.orderBtn
        this.incrQuant()
      },
      clearMe: function () {
          // this.$set(this.foodInfo, 'quantity', 0)
          this.$set(this.food, 'quantity', 0)
          // this.$set(this.foodInfo, 'isAdded', null)
          this.$set(this.food, 'isAdded', false)
          // this.$set(this.input, 'dishQuant', 0)
      },
      incrQuant() {
        // this.input.dishQuant += 1
        // this.foodInfo.quantity = this.input.dishQuant
        // this.$set(this.food, 'quantity', this.foodInfo.quantity)

        // this.foodInfo.cost = this.food.price
        // this.foodInfo.name = this.food.name
        this.food.isAdded = true
        // this.foodInfo.isAdded = this.food.isAdded
        // this.$emit('total', this.foodInfo)
        // new
        if(this.food.price>0){
          this.food.price = this.food.price
        } else {
          this.food.price = -(this.food.price)
        }
        this.food.quantity += 1
        // this.$set(this.food, 'quantity', this.input.dishQuant)
        // this.foodInfo.quantity = this.food.quantity
        this.$emit('total', this.food)
      },
      decrQuant() {

        // if(this.food.quantity===0){
        //   this.food.quantity = 0
        // } else {
          this.food.quantity -= 1

          if(this.food.price>0){
            this.food.price = -(this.food.price)
          } else {
            this.food.price = this.food.price
          }
          if(this.food.quantity===0){
            this.food.quantity = 0
            this.food.isAdded = false
            // this.food.price = -(this.food.price)
            this.orderBtn = !this.orderBtn
          }
          this.$emit('total',this.food)
        // }
      }
    },
    mounted() {
      this.dishQuant = this.food.quantity
      bus.$on('clearEvent', this.clearMe);
    }
  }
</script>

<style lang="scss">
  .dish-block{
    &__input{
      margin: 20px 0;
      padding-right: 70px;
      position: relative;
      button{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        &+button{
          right: 35px;
        }
      }
      a.button{
        position: absolute;
        right: 0;
      }
    }
    .field{
      padding: 15px;
      border-radius:5px;
      margin-bottom: 10px;
      &.active{
        background: #23d160;
      }
    }
  }
</style>

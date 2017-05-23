<template lang="pug">
  #app
      nav-vue(:links='navLinks' v-on:navClick="navHandler")
      div(v-if='loading')
        a(href="#").button.is-info.is-loading.is-big LOADING
      div(v-else)
        div(v-if='this.showPage==="menu"')
          h1.title {{msg}}
          menu-vue(:menu='menu')
        div(v-else-if='this.showPage==="contacts"')
          p Contacts text
        div(v-else)
          h1 ERROR {{this.showPage}}
</template>

<script>
import navVue from './components/navVue.vue'
import menuVue from './components/menuVue.vue'

let data = {
  "menu": [
    {
      "category": "burgers",
      "food": [
        {
          "name": "New York",
          "info": "Some text about burger",
          "price": 250
        },
        {
          "name": "Big Apple",
          "info": "Lorem text",
          "price": 150
        },
        {
          "name": "Kebab",
          "info": "wah wah wah",
          "price": 50
        }
      ]
    },
    {
      "category": "hot dogs",
      "food": [
        {
          "name": "Sparcy",
          "info": "Some text",
          "price": 125.6
        },
        {
          "name": "Big Boss",
          "info": "Lorem ipsum",
          "price": 150
        },
        {
          "name": "Kebab dog",
          "info": "wah wah wah",
          "price": 50
        }
      ]
    }
  ]
};

// let url = 'http://beta.json-generator.com/api/json/get/4yqkQpDgX'
// let url = 'http://beta.json-generator.com/api/json/get/4kBc4AogX'
let url = 'http://beta.json-generator.com/api/json/get/Nkf_AJnlQ'
export default {
  name: 'app',
  data () {
    return {
      loading: true,
      showPage:'menu',
      msg: 'dishes menu',
      navLinks: ['menu','about','contacts'],
      // menu: data.menu
      menu: null
    }
  },
  created() {
		this.init()
	},
  methods: {
    navHandler(payload){
      this.showPage = payload
    },
    loadData() {
      axios.get(url)
        .then( response => {
          // console.log(response)
          // this.menu = response.data[0].menu
          this.menu = response.data.menu
          this.loading = false
        })
        .catch( error => {
          console.log(error.name + ': ' + error.message)
          this.showPage = error.message
          this.loading = false
        })
    },
    init() {
      this.loadData()
    }
  },
  components: {
    navVue,
    menuVue
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>

import Vue from 'vue'
import App from './App.vue'
import 'swiper/dist/css/swiper.css'
import '../examples/assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

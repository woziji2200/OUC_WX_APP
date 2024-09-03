import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import {addInterceptor} from './js/request'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

addInterceptor(['request', 'uploadFile'])



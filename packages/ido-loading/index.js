import IdoLoading from './src/ido-loading.vue'

// 为组件提供 install 方法，供按需引入
IdoLoading.install = function(Vue) {
  Vue.component(IdoLoading.name, IdoLoading)
}

export default IdoLoading

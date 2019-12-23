import IdoScroll from './src/ido-scroll.vue'

// 为组件提供 install 方法，供按需引入
IdoScroll.install = function(Vue) {
  Vue.component(IdoScroll.name, IdoScroll)
}

export default IdoScroll

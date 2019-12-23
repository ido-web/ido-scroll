<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="ido-scroll-pull-down" v-if="pullDown">
      <ido-loading :text="pullDownText" inline ref="pullDownLoading"></ido-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="ido-scroll-pull-up" v-if="pullUp">
      <ido-loading :text="pullUpText" inline ref="pullUpLoading"></ido-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import IdoLoading from '../../ido-loading/src/ido-loading'
import { PULL_DOWN_HEIGHT, PULL_DOWN_TEXT_INIT, PULL_DOWN_TEXT_START, PULL_DOWN_TEXT_ING, PULL_DOWN_TEXT_END, PULL_UP_HEIGHT, PULL_UP_TEXT_INIT, PULL_UP_TEXT_START, PULL_UP_TEXT_ING, PULL_UP_TEXT_END } from './config'

export default {
  name: 'IdoScroll',
  components: {
    swiper,
    swiperSlide,
    IdoLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    // 接受内部数据
    data: {
      type: [Array, Object]
    },

    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    // 监听内部数据的变化
    data() {
      this.update()
    }
  },

  methods: {
    /** APIS */
    update() {
      this.$nextTick(() => {
        this.$refs.swiper && this.$refs.swiper.swiper.update()
      })
    },
    // 滑动到顶部
    scrollToTop(speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
    },
    init() {
      // 这些参数不需要动态监听，所以不配置在data中
      // 是否正在下拉或者上拉
      this.pulling = false
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_DOWN_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical',
        // V大写 cnm v大写
        // 而插件是根据屏幕的宽自动给轮播列表项生成的宽，所以宽设置的话也会被行内样式覆盖，这时候需要一个属性 slidesPerView: 'auto' 这时候我们就可以自己设置宽 */
        slidesPerView: 'auto',
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true // 是否自动隐藏
        },
        on: {
          // 滑动的监听事件
          sliderMove: this.scroll,
          // 松手的监听事件
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd // 向上滑动时监听scrollEnd
        }
      }
    },
    touchEnd() {
      if (this.pulling) {
        // 如果没有指定下拉刷新的参数，或者正处于下拉或者上拉的状态中 则不去执行文字的变化
        return
      }
      const swiper = this.$refs.swiper.swiper

      // 当松手的事件，判断是否超过100的高度，如果超过则可以刷新
      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return
        }
        this.pulling = true

        // 开始刷新
        swiper.allowTouchMove = false // 禁止触摸
        swiper.setTransition(swiper.params.speed) // 设置速度
        swiper.setTranslate(PULL_DOWN_HEIGHT) // 移动到刷新100的位置
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        this.$emit('onRefresh', this.pullDownEnd)
      } else if (swiper.isEnd) {
        // 判断是否到底部
        if (!this.pullUp) {
          return
        }

        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight
        if (isPullUp) {
          // 上拉
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed)
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height))
          swiper.params.virtualTranslate = true // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING)
          this.$emit('onLoadmore', this.pullUpEnd)
        }
      }
    },

    scrollEnd() {
      const swiper = this.$refs.swiper.swiper

      // 对外暴漏scrollEnd事件 停止滑动
      this.$emit('onScrollEnd', swiper.translate, swiper, this.pulling)
    },
    pullDownEnd() {
      this.pulling = false

      const swiper = this.$refs.swiper.swiper
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)

      setTimeout(() => {
        // 下拉刷新完全结束后触发事件
        this.$emit('pullDownTransitionEnd')
      }, swiper.params.speed)
    },
    pullUpEnd() {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      // const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
      // swiper.setTransition(swiper.params.speed)
      // swiper.setTranslate(-(totalHeight - swiper.height))

      // setTimeout(() => {
      //   // 下拉刷新完全结束后触发事件
      //   this.$emit('pullDownTransitionEnd')
      // }, swiper.params.speed)
    },
    scroll() {
      const swiper = this.$refs.swiper.swiper

      // 对外暴露scroll事件
      this.$emit('onScroll', swiper.translate, this.$refs.swiper.swiper)
      if (this.pulling) {
        // 正处于下拉或者上拉的状态中 则不去执行文字的变化
        return
      }

      if (swiper.translate > 0) {
        if (!this.pullDown) {
          // 如果没有指定下拉刷新的参数
          return
        }

        let percent = swiper.translate / 100
        // if (percent <= 1) {
        this.percent = Number(percent)
        // }

        // 下拉
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) {
        // 判断是否滚动到底部
        if (!this.pullUp) {
          return // 没有开启上拉加载
        }

        // 判断是否达到触发上啦加载的条件
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'))
        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
        }
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: auto;
}

.ido-scroll-pull-up,
.ido-scroll-pull-down {
  position: absolute;
  left: 0;
  //  默认隐藏
  width: 100%;
}
.ido-scroll-pull-down {
  bottom: 100%;
  height: 80px;
}

.ido-scroll-pull-up {
  top: 100%;
  height: 30px;
}
.box {
  height: 800px;
  width: 100%;
  background-color: skyblue;
}
</style>

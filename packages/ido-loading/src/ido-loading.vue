<template>
  <div class="ido-loading" :class="{ 'ido-loading-inline': inline }">
    <div class="ido-loading-indicator" v-if="indicator === 'on'">
      <slot>
        <img src="../img/loading.gif" alt="" ref="loading" class="ido-loading-indicator-img"/>
        <img src="../img/arrow.png" alt="" ref="img" class="ido-loading-indicator-img" v-if="isPull" />
      </slot>
    </div>

    <span class="ido-loading-text" v-if="text">{{ loadingText }}</span>
  </div>
</template>

<script>
import { prefixStyle } from '../../common/js/dom'

const transform = prefixStyle('transform')
// const transitionDuration = prefixStyle('transitionDuration')

export default {
  name: 'IdoLoading',
  props: {
    indicator: {
      type: String,
      default: 'on',
      validator(value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    text: {
      type: String,
      default: '加载中...'
    },
    // 图标和文字是否在一行显示
    inline: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: 'refresh_up',
      validator(value) {
        return ['refresh_up', 'refresh_down', 'refresh_loading', 'refresh_finish'].indexOf(value) > -1
      }
    },
    isPull: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loadingText: this.text,
      loadingIndicator: this.indicator
    }
  },
  methods: {
    setText(text) {
      this.loadingText = text
    },
    setIndicatorVisible(isShow) {
      if (isShow) {
        this.loadingText = 'on'
      } else {
        this.loadingText = 'off'
      }
    },
    showLoading() {
      this.loading.style.display = 'block'
      this.img.style.display = 'none'
    },
    showArrow() {
      this.loading.style.display = 'none'
      this.img.style.display = 'block'
    },
    hideAll() {
      this.loading.style.display = 'none'
      this.img.style.display = 'none'
    },
    init() {
      this.img = this.$refs.img
      this.loading = this.$refs.loading
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    status() {
      switch (this.status) {
        case 'refresh_up': {
          this.showArrow()
          this.img.style[transform] = 'rotate(0deg)'
          break
        }
        case 'refresh_down': {
          this.showArrow()
          this.img.style[transform] = 'rotate(-180deg)'
          break
        }
        case 'refresh_loading': {
          this.showLoading()
          break
        }
        case 'refresh_finish': {
          this.hideAll()
          break
        }
        default: {
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ido-loading {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.ido-loading-inline {
    .ido-loading-indicator {
      width: 80px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-img {
        width: 25px;
        height: 25px;
        display: block;
        transition: all 0.3s;
      }
    }
    .ido-loading-indicator ~ .ido-loading-text {
      margin-top: 0px;
      margin-left: 6px;
    }
  }

  &-indicator {
    ~ .ido-loading-text {
      margin-top: 6px;
    }
  }
}
</style>

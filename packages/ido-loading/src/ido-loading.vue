<template>
  <div class="ido-loading" :class="{ 'ido-loading-inline': inline }">
    <div class="ido-loading-indicator" v-if="indicator === 'on'">
      <slot>
        <img src="./loading.gif" alt="" />
      </slot>
    </div>

    <span class="ido-loading-text" v-if="text">{{ loadingText }}</span>
  </div>
</template>

<script>
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

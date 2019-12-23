<template>
  <div id="app" class="ido-container">
    <div class="ido-container-content">
      <div class="home">
        <ido-scroll pullDown pullUp :data="mData" @onRefresh="pullToRefresh" @onLoadmore="pullToLoadmore" ref="scroll">
          <div>hahah</div>
        </ido-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import IdoScroll from '../packages/ido-scroll/src/ido-scroll'
// import IdoLoading from '../packages/ido-loading/src/ido-loading'
export default {
  name: 'app',
  components: {
    IdoScroll
    // IdoLoading
  },
  data() {
    return {
      mData: []
    }
  },

  methods: {
    pullToRefresh(end) {
      setTimeout(() => {
        end()
      }, 2000)
    },
    pullToLoadmore(end) {
      setTimeout(() => {
        end()
      }, 2000)
    }
  },

  created() {
    this.mData.push('1')
  }
}
</script>

<style lang="scss" scroped>
.home {
  height: 600px;
  width: 100%;
  overflow: hidden;
}
div {
  width: 100%;
  height: 1800px;
  background-color: skyblue;
}
</style>

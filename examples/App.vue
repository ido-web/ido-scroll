<template>
  <div id="app" class="ido-container">
    <div class="ido-container-content">
      <!-- <basic></basic> -->
      <pull-refresh></pull-refresh>
    </div>
  </div>
</template>

<script>
// import basic from './basic'
import PullRefresh from './pullToRefresh'
export default {
  name: 'app',
  components: {
    // basic
    PullRefresh
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
  }
}
</script>

<style lang="scss" scroped></style>

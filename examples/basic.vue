<template>
  <div class="box">
    <ido-scroll :data="mData">
      <ul>
        <li class="item" v-for="(item, index) in mData" :key="index">
          {{ item }}
        </li>
      </ul>
    </ido-scroll>
  </div>
</template>

<script>
import IdoScroll from '../packages/ido-scroll/src/ido-scroll'
export default {
  name: 'basic',
  components: {
    IdoScroll
    // IdoLoading
  },
  data() {
    return {
      mData: ['ido-web', 'ido-ui-css', 'iso-vue', 'ido-scroll', 'ido-web', 'ido-ui-css', 'iso-vue', 'ido-scroll']
    }
  }
}
</script>

<style scoped>
.box {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.item {
  height: 120px;
  width: 100%;
  background-color: skyblue;
  line-height: 120px;
  text-align: center;
  border-bottom: 1px solid white;
}
</style>

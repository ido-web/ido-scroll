<template>
  <div class="box">
    <ido-scroll :data="mData">
      <ul class="wrap">
        <li class="item" v-for="(item, index) in mData" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </li>
      </ul>
    </ido-scroll>
  </div>
</template>

<script>
import IdoScroll from '../packages/ido-scroll/src/ido-scroll'
import { items } from './config'
export default {
  name: 'basic',
  components: {
    IdoScroll
  },
  data() {
    return {
      mData: []
    }
  },
  methods: {
    init() {
      this.mData = items
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.wrap {
  margin: 10px;
}
.item {
  background-color: #fff;
  padding: 10px;
  height: 270px;
  width: 100%;
  line-height: 120px;
  text-align: center;
  border-bottom: 1px solid white;
  margin-bottom: 5px;
  img {
    width: 100%;
    height: 100%;
    display: block;
    filter: blur(1px);
  }
}
</style>

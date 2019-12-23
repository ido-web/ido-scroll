## ido-scroll
一个功能齐全的vue滚动条列表组件

## 集成

```bash
npm i ido-scroll -S
```

## 使用

ido-scroll依赖vue-awesome-swiper@3.1.3，安装本插件的同时也会安装vue-awesome-swiper。

```javascript
// 导入组件
import IdoScroll from 'ido-scroll'
// 注册
Vue.use(IdoScroll)
```

使用 Vue.use() 全局注册后，即可在任意页面直接使用了，而不需另外引入。

```html
<ido-scroll></ido-scroll>
```

#### 使用示例

对应example/basic组件

```html
  <div class="box">
    <ido-scroll :data="mData">
      <ul>
        <li class="item" v-for="(item, index) in mData" :key="index">
          {{ item }}
        </li>
      </ul>
      <!-- 其它更多内容... --> 
    </ido-scroll>
  </div>
</template>
```

其中传递参数data，可以是包裹内容的数据，当data数据有变化，ido-scroll会调用update()方法来重新计算高度，当然你也可以自己手动调用update()方法来更新。

#### 下拉刷新和上拉加载示例

对应example/pullToRefresh组件

```html
<div class="box">
    <ido-scroll 
       :data="mData" 
       pullDown 
       pullUp 
       @onRefresh="pullToRefresh" 
       @onLoadmore="pullToLoadmore"
       @pullDownTransitionEnd="pullDownTransitionEnd">
        <ul>
            <li class="item" v-for="(item, index) in mData" :key="index">
                {{ item }}
            </li>
        </ul>
         <!-- 其它更多内容... --> 
    </ido-scroll>
</div>
<script>
    ...
    data() {
        return {
            mData: ['ido-web', 'ido-ui-css', 'iso-vue', 'ido-scroll', 'ido-web', 'ido-ui-css', 'iso-vue', 'ido-scroll']
        }
 	},
	methods: {
       // 下拉刷新回调，需要手动调用end()方法来结束
       pullToRefresh(end) {
          setTimeout(() => {
            end()
          }, 2000)
       },
       // 上拉加载更多回调，需要手动调用end()方法来结束
       pullToLoadmore(end) {
          this.getData()
            .then(end)
            .catch(err => {
              console.log(err)
              end()
            })
        }
        
        // 获取数据
        getData() {
          return new Promise(resolve => {
            setTimeout(() => {
              let newData = ['新来的数据', '新来的数据', '新来的数据', '新来的数据', '新来的数据','新来的数据']
              this.mData = this.mData.concat(newData)
              resolve()
            }, 2000)
          })
        },
 	 }
    ...
</script>
```

- 传递`pullDown`参数来开启下拉刷新，通过监听`onRefresh`事件处理下拉刷新的逻辑，`onRefresh`有一个`end`参数，处理完刷新逻辑，需要手动调用end()方法来结束刷新。
- 传递`pullUp`参数来开启上拉加载，通过监听`onLoadmore`事件处理上拉加载的逻辑，`onReonLoadmoreresh`有一个`end`参数，处理完上拉加载逻辑，需要手动调用end()方法来结束上拉加载。
- `pullDownTransitionEnd`参数是监听下拉刷新完成后，位移动画彻底结束的回调，在这里可以处理自己的一些业务逻辑，最典型的就是，当下拉刷新的时候，我们需要隐藏头部的搜索款，让刷新动画彻底完成，我们要显示头部的搜索框。


<template>
  <div class="tantan">
    <movable-area>
      <block v-for="(item, index) in goods" :key="item.id">
        <movable-view
          :damping="20"
          :x="item.x"
          :y="item.y"
          inertia
          out-of-bounds
          direction="all"
          @change="onMovableChange($event, index)"
        >
          <div
            class="item"
            :style="{
              position: 'relative',
              zIndex: index + 1,
              transform: `
                scale(${
                  index == goods.length - 1
                    ? 1
                    : 1 - (goods.length - index) / 100
                })
                translateY(${-index * 10}px)`,
              transition: 'all .3s',
            }"
          >
            <u-image :src="item.cover" :width="700" :height="900"></u-image>
          </div>
        </movable-view>
      </block>
    </movable-area>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      pageNum: 1,
    };
  },

  created() {
    this.getGoodList(4);
  },

  methods: {
    /**
     * 模拟获取数据
     */

    getGoodList(pageSize = 1) {
      console.log("获取新数据");
      for (let index = 0; index < pageSize; index++) {
        this.goods.unshift({
          id: String(index) + String(this.pageNum),
          cover: `/static/images/good_${Math.floor(Math.random() * 4) + 1}.jpg`,
          x: 0,
          y: 0,

          old: {
            x: 0,
            y: 0,
          },
        });

        this.pageNum += 1;
      }
    },

    /**
     * 移动回调
     */
    onMovableChange(event, index) {
      let item = this.goods[index];
      let { x, y, source } = event.detail; // 赋值当前坐标
      // console.log(x, y, source);

      item.old.x = x;
      item.old.y = y;

      // 移动结束/手指离开屏幕
      if (source == "friction") this.onMovableEnd(index);
    },

    /**
     * 移动结束回调
     */
    onMovableEnd(index) {
      let item = this.goods[index];
      let { x, y } = item.old; // 获取当前坐标

      if (x >= 20) {
        // 超出右边界
        this.removeItem(index, "like");
      } else if (x <= -20) {
        // 超出左边界
        this.removeItem(index, "unlike");
      } else {
        // 没有超出边界，回到中心点
        this.resetItem(index);
      }
    },

    /**
     * 移除卡片
     */
    removeItem(index, mode = "like") {
      let item = this.goods[index];
      item.x = item.old.x;
      item.y = item.old.y;

      // 滚动到屏幕外
      this.$nextTick(() => {
        item.x = mode == "like" ? 1000 : -1000; // 喜欢向右滚出、不喜欢向左滚出
        item.y = item.old.y <= 0 ? item.old.y - 100 : item.old.y + 100; // y小于0说明向上滑出，加一点向上的偏移值，效果好一些

        setTimeout(() => {
          this.goods.splice(index, 1); // 移除数据（等动画结束）
          this.getGoodList(); // 继续请求新的数据
        }, 200);
      });
    },

    /**
     * 重设卡片
     */
    resetItem(index) {
      let item = this.goods[index];
      item.x = item.old.x;
      item.y = item.old.y;

      this.$nextTick(() => {
        item.x = 0;
        item.y = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tantan {
  // height: calc(100vh - var(--status-bar-height) - 44px - var(--window-bottom));
  height: calc(100vh);
  overflow: hidden;

  movable-area {
    position: relative;
    width: 300vw;
    height: 300vh;
    left: calc(-100vw);
    top: calc(-105vh);
    background-color: salmon;
  }

  movable-view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 700rpx;
    height: 900rpx;
  }

  .item {
    border-radius: 30rpx;
    box-shadow: 0 0 10rpx 2rpx rgba($color: black, $alpha: 0.2);
    overflow: hidden;
  }
}
</style>

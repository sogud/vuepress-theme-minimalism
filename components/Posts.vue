<template>
  <div :key="$page.title">
    <el-row type="flex" align="top">
      <el-col
        :span="5"
        class="hidden-xs-only"
        :xs="{ span: 5 }"
        :sm="{ span: 5 }"
        :md="{ span: 3 }"
        :lg="{ span: 5 }"
      >
        <div class="toc" ref="toc">
          <TOC :class="titleFixed == true ? 'isFixed' : ''"></TOC>
        </div>
      </el-col>
      <el-col
        :span="18"
        :offset="1"
        :xs="{ span: 24 }"
        :sm="{ span: 18, offset: 0 }"
        :md="{ span: 18, offset: 0 }"
        :lg="{ span: 12, offset: 1 }"
      >
        <div class="content-container">
          <Content></Content>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col
        :span="18"
        :xs="{ span: 18 }"
        :sm="{ span: 23, offset: 0 }"
        :md="{ span: 18, offset: 0 }"
        :lg="{ span: 12 }"
      >
        <!-- <my-comment /> -->
        <Comment />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Posts",
  components: {
    Comment: () => import("./Comment"),
    TOC: () => import("./TOC")
  },
  data() {
    return {
      titleFixed: false
    }
  },
  mounted() {
    this.titleFixed = false
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    //滚动监听，头部固定
    handleScroll() {
      let offsetTop = this.$refs.toc?.getBoundingClientRect()?.top
      this.titleFixed = offsetTop < 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-container {
  padding: 0 10px
}

.toc, .isFixed {
  width: 320px
}

.toc {
  scrollbar-width: none
  -ms-overflow-style: none
  ::-webkit-scrollbar {
    display: none /* Chrome Safari */
  }
}

.isFixed {
  position: fixed
  top: 0
  height: 100vh
  overflow: auto
}
</style>

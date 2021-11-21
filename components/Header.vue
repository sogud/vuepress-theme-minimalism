<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="24" :xs="{ span: 24 }" :sm="{ span: 22 }" :md="{ span: 20 }" :lg="{ span: 12 }">
      <div class="header">
        <div class="container">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="16" :sm="16" :md="16" :lg="14" :xl="16" class="hidden-xs-only">
              <div class="link-group">
                <template v-for="(item, index) in $themeConfig.nav">
                  <NavLink :link="item.link" :key="index">
                    {{ item.text }}
                  </NavLink>
                </template>
              </div>
            </el-col>
            <el-col :xs="5" class="hidden-sm-and-up">
              <i class="el-icon-menu" @click="drawer = true"></i>
            </el-col>
            <SearchBox class="search-box" />
          </el-row>
          <el-drawer title="" :visible.sync="drawer" :with-header="false">
            <el-menu class="el-menu-vertical" @select="drawer = false">
              <template v-for="(item, index) in $themeConfig.nav">
                <el-menu-item :key="index" :index="index">
                  <router-link :to="item.link">
                    <span>{{ item.text }}</span>
                  </router-link>
                </el-menu-item>
              </template>
            </el-menu>
          </el-drawer>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css"

import SearchBox from "@SearchBox"
import NavLink from "@/components/NavLink"
import "@/styles/icon/iconfont.css"
export default {
  name: "Header",
  components: {
    SearchBox,
    NavLink
  },
  data() {
    return {
      drawer: false
    }
  },
  mounted() {
    console.log(this.$themeConfig.nav)
  }
}
</script>

<style lang="stylus" scoped>
.header {
	position: relative
	flex-shrink: 0
	height: 3rem
	line-height: 3rem
	display: block
	color: #666


	.container {

		.link-group {
			a {
				margin-right: 8px
				color: #666
			}
		}
	}
}

.el-menu-vertical {
	color: #ccc
}
</style>

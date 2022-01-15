<template>
  <div>
    <el-row type="flex" justify="center" align="middle" v-for="(item, index) in list" :key="index">
      <el-col
        :span="24"
        :xs="{ span: 24 }"
        :sm="{ span: 22 }"
        :md="{ span: 20 }"
        :lg="{ span: 12 }"
      >
        <ListItem :item="item" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col
        :span="24"
        :xs="{ span: 24 }"
        :sm="{ span: 22 }"
        :md="{ span: 20 }"
        :lg="{ span: 12 }"
      >
        <el-pagination
          layout="prev, pager, next"
          :total="pageTotal"
          :current-page="currentPage"
          class="pagination"
          @current-change="handleCurrentChange"
          style="display: flex; justify-content: center"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue"
import { content } from "@dynamic/metadata"

export default {
  name: "List",
  components: {
    ListItem
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      content: content,
      pageTotal: 0
    }
  },
  computed: {
    pages() {
      return this.$site.pages
    }
  },
  filters: {},
  created() {
    this.content.forEach(item => {
      if (!item.tags) {
        item.tags = ["未分类"]
      }
      if (typeof item.tags === "string") {
        item.tags = item.tags.split(" ")
      }
    })
  },
  mounted() {
    this.pageTotal = this.content.length
    let list = JSON.parse(JSON.stringify(this.content))
    this.list = list.splice(0, 10)
  },
  methods: {
    handleCurrentChange(val) {
      let list = JSON.parse(JSON.stringify(this.content))
      this.list = list.splice((val - 1) * 10, 10)
      this.currentPage = val
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination >>> .el-pager li.active {
	color: $accentColor
	cursor: default
}

.pagination >>> .el-pager li:hover {
	color: $accentColor
}
</style>

<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col
      :span="24"
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 20 }"
      :lg="{ span: 12 }"
    >
      <div class="container">
        <el-tag
          @click="toTags(tag)"
          class="tags"
          v-for="(tag, index) in tagsList"
          :key="index"
          size="medium"
        >
          <span class="iconfont icon-label_fill"></span>
          {{ tag[0].name }}
        </el-tag>
        <el-row
          v-for="(item, index) in hasTagsList"
          :key="index"
        >
          <ListItem :item="item" />
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { tagsList } from "@dynamic/metadata"
import ListItem from "./ListItem.vue"

export default {
  components: {
    ListItem
  },
  data() {
    return {
      tagName: "",
      tagsList: tagsList
    }
  },
  computed: {
    hasTagsList() {
      if (!this.tagsList[this.tagName]) {
        return []
      }
      let arr = this.tagsList[this.tagName].slice(1)
      arr.forEach(item => {
        if (!item.tags) {
          item.tags = ["未分类"]
        }
        if (typeof item.tags === "string") {
          item.tags = item.tags.split(" ")
        }
      })
      return arr
    }
  },
  mounted() {
    if (this.$route.query.tag) {
      this.tagName = this.$route.query.tag
    }
  },
  methods: {
    toTags(tag) {
      this.tagName = tag[0].name
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './../styles/config';
@import './../styles/list';

.container {
  min-height: 40vh;

  .tags {
    margin: 5px;
    font-size: 1em;
    color: $accentColor;
    background-color: $bgColor;
    border: none;
    cursor: pointer;
  }
}
</style>

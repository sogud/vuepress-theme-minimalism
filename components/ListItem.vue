<template>
  <div class="title-box">
    <div @click="toContent(item)">
      <div class="title">{{ item.title }}</div>
      <div class="date-time">{{ item.lastUpdated }}</div>
    </div>
    <div>
      <a class="tag" @click="toTags(item)" v-for="(item, index) in item.tags" :key="index">
        <span>{{ item }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    pages() {
      return this.$site.pages
    }
  },

  created() {},
  mounted() {},
  methods: {
    toContent(item) {
      this.$router.push(item.path)
    },
    toTags(tag) {
      this.$router.push({ path: `/tags?tag=${tag}` })
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-box {
  &:first-child {
    margin-top: 20px
  }

  &:last-child {
    margin-bottom: 10px
  }

  .date-time {
    color: #ccc
    font-size: 0.7rem
  }

  .title {
    font-size: 1rem
    line-height: 2
    color: #666
    cursor: pointer

    &:hover {
      text-shadow: 1px 1px 1px #ddd
    }
  }



  .tag {
    color: $accentColor
    margin-right: 30px
    cursor: pointer
    font-size: .5rem
    &:hover {
      text-shadow: 0px 0px 5px #ddd
    }
  }
}
</style>

<template>
  <li class="post-tag">
    <router-link :to="'/tag/' + tag">
      <span>{{ tag }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "PostTag",
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.post-tag
    height 26px

  &:not(:last-child)
    margin-right 10px

  a
    position relative
    text-decoration none
    height 26px
    display inline-block

    span
      color $postTagColor
      transition color 0.2s
    &:hover
      span
         color: rgba($postTagColor, 0.8);
</style>

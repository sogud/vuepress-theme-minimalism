<template>
  <main class="home">
    <div>
      <PureCat class="cat" @click.native="jumpTo" />
    </div>
  </main>
</template>

<script>
import PureCat from "@theme/components/design/PureCat/PureCat.vue"

export default {
  components: {
    PureCat
  },
  data() {
    return {
    }
  },
  computed: {
    data() {
      return this.$page.frontmatter
    }
  },
  methods: {
    jumpTo() {
      this.$router.push("/list/")
    }
  }
}
</script>
<style lang="stylus" scoped>
.home {
  background: #161616;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cat {
  cursor: pointer;
}
</style>

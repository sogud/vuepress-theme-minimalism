<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="24" :xs="{ span: 24 }" :sm="{ span: 22 }" :md="{ span: 20 }" :lg="{ span: 12 }">
      <div class="footer">
        <span class="text" v-html="$site.themeConfig.footer.contact"></span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="stylus" scoped>
.footer {
	margin: 20px
	background: $accentColor
	position: relative
	flex-shrink: 0
	height: 5rem
  line-height: 5rem
	display: block
	color: $textColor
	text-align: center
	border-radius: 5px
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)

	.text {
		text-align: center
	  color: #fff
		position: relative

		a {
			color: #fff !important
			// color: $textColor
			&:hover {
				text-decoration: underline
			}
		}
	}
}
</style>

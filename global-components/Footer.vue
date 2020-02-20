<template>

	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="24"
						:xs="{span: 24}"
						:sm="{span: 23,offset: 6}"
						:md="{span: 20,offset:0}"
						:lg="{span: 12}">
			<div class="footer">
				<span class="text">
					©2020 Power by <a href="https://vuepress.vuejs.org">VuePress</a> <a href="https://github.com/onnezezt/vuepress-theme-minimalism">Theme minimalism</a>
				</span>
			</div>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="stylus" scoped>
.footer {
	margin: 20px
	background: $accentColor
	position: relative
	flex-shrink: 0
	height: 7rem
	display: block
	// width: 100%
	color: $textColor
	text-align: center

	.text {
		text-align: center
		position: relative
		top: 3rem

		a {
			color: $textColor

			&:hover {
				text-decoration: underline
			}
		}
	}
}
</style>
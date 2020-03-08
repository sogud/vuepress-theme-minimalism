<template>

	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="24"
						:xs="{span: 24}"
						:sm="{span: 22}"
						:md="{span: 20}"
						:lg="{span: 12}">
			<div class="footer">
				<span class="text"
							v-html="$site.themeConfig.footerText">
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
	height: 8rem
	display: block
	// width: 100%
	color: $textColor
	text-align: center
	border-radius: 5px
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)

	.text {
		text-align: center
		position: relative
		top: 4rem

		a {
			color: $textColor

			&:hover {
				text-decoration: underline
			}
		}
	}
}
</style>
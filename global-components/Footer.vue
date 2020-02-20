<template>

	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="24"
						:xs="{span: 24}"
						:sm="{span: 23,offset: 6}"
						:md="{span: 20,offset:0}"
						:lg="{span: 12}">
			<div class="footer"></div>
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
	color: #333
	text-align: center
	// line-height: 60px
}
</style>
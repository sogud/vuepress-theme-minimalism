<template>

	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="24"
						:xs="{span: 24}"
						:sm="{span: 24}"
						:md="{span: 20}"
						:lg="{span: 14}">
			<div class="header"></div>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="stylus" scoped>
.header {
	margin: 20px
	background: #399c9c
	position: relative
	flex-shrink: 0
	height: 6rem
	display: block
	// width: 100%
	color: #333
	text-align: center
	// line-height: 60px
}
</style>
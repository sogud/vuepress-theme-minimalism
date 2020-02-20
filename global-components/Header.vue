<template>
	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="18"
						:xs="{span: 24}"
						:sm="{span: 24,offset: 6}"
						:md="{span: 18,offset:0}"
						:lg="{span: 12}">
			<div class="header">
				<div class="container">
					<router-link to="/"
											 style="float: left;margin-left: 60px;">首页</router-link>
					<router-link to="/list">全部</router-link>
					<router-link to="/tags">分类</router-link>
					<!-- <router-link to="/timeline">时间线</router-link> -->
				</div>
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
.header {
	margin: 20px
	background: $accentColor
	position: relative
	flex-shrink: 0
	height: 7rem
	display: block
	// width: 100%
	color: #333

	// 
	.container {
		text-align: right
		padding: 0 100px 0 0
		line-height: 7rem
		color: #fff

		a {
			font-size: 1rem
			color: #fff
		}
	}
}
</style>
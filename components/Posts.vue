<template>
	<div :key="$page.title">
		<el-row type="flex"
						justify="center"
						align="middle">
			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 24}"
							:md="{span: 20}"
							:lg="{span: 10}">
				<Content></Content>
				<my-comment />
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'Posts',
	components: {
		MyComment: () => import('./MyComment')
	},
	mounted() {
		console.log('TCL: mounted -> this.$site', this.$site)
		console.log('TCL: mounted -> this.$page', this.$page)
	}
}
</script>

<style lang="scss" scoped>
</style>
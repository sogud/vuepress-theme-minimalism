<template>
	<div>
		<el-row type="flex"
						justify="center"
						align="middle">
			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 24}"
							:md="{span: 20}"
							:lg="{span: 12}">
				<Content />
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'Posts',
	mounted() {
		console.log('TCL: mounted -> this.$site', this.$site)
		console.log('TCL: mounted -> this.$page', this.$page)
	}
}
</script>

<style lang="scss" scoped>
</style>
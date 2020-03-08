<template>
	<div :key="$page.title">
		<el-row type="flex"
						align="top">
			<el-col :span="5"
							class="hidden-xs-only"
							:xs="{span: 5}"
							:sm="{span: 5}"
							:md="{span: 3}"
							:lg="{span: 5}">
				<div class="toc"
						 ref="toc">
					<TOC :class="titleFixed == true ? 'isFixed' :''"></TOC>
				</div>
			</el-col>
			<el-col :span="18"
							:offset="1"
							:xs="{span: 24}"
							:sm="{span: 18,offset:0}"
							:md="{span: 18,offset:0}"
							:lg="{span: 12,offset:1}">
				<div class="content-container">
					<Content></Content>
				</div>
			</el-col>

		</el-row>
		<el-row type="flex"
						justify="center"
						align="middle">
			<el-col :span="18"
							:xs="{span: 18}"
							:sm="{span: 23,offset: 0}"
							:md="{span: 18,offset:0}"
							:lg="{span: 12}">
				<my-comment />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
export default {
	name: 'Posts',
	components: {
		MyComment: () => import('./MyComment'),
		TOC: () => import('./TOC')
	},
	data() {
		return {
			titleFixed: false
		}
	},
	mounted() {
		console.log(this.$page)
		this.titleFixed = false
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		//滚动监听，头部固定
		handleScroll() {
			let offsetTop = this.$refs.toc.getBoundingClientRect().top
			this.titleFixed = offsetTop < 0
			// some code
		}
	}
}
</script>

<style lang="stylus" scoped>
.toc {
	margin-left: 45px
	width: 380px
}

.content-container {
	padding: 0 10px
}

.isFixed {
	position: fixed
	top: 0
	// padding 20px
	// width: 20.83333%
	width: 380px
	height: 100vh
	overflow: auto
}
</style>
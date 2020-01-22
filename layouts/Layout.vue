<template>
	<div class="theme-container">
		<Home v-if="$page.frontmatter.home" />
		<div v-else>
			<Header />
			<el-container>
				<!-- <el-header>Header</el-header> -->
				<el-main>
					<keep-alive>
						<component :is="whichComponent"></component>
					</keep-alive>
				</el-main>
			</el-container>
			<Footer />
		</div>
	</div>
</template>
<script>
import Home from '@/components/Home.vue'
import List from '@/components/List.vue'
import Posts from '@/components/Posts.vue'
export default {
	components: { Home, List, Posts },
	computed: {
		pages() {
			return this.$site.pages
		},
		whichComponent() {
			const compArr = ['List', 'All', 'Posts']
			const Path = this.$page.relativePath
			let comp = ''
			compArr.forEach(item => {
				if (Path.includes(item)) {
					comp = item
				}
			})
			return comp
		}
	},
	mounted() {
		const comments = [
			'',
			'                    .::::.            快捷键：',
			'                  .::::::::.            j：下移',
			'                 :::::::::::            k：上移',
			"             ..:::::::::::'             t：移到最顶",
			"           '::::::::::::'               b：移到最底",
			'             .::::::::::                n：下移很多',
			"        '::::::::::::::..               m：上移很多",
			'             ..::::::::::::.',
			'           ``::::::::::::::::',
			"            ::::``:::::::::'        .:::.",
			"           ::::'   ':::::'       .::::::::.",
			"         .::::'      ::::     .:::::::'::::.",
			"        .:::'       :::::  .::::::::'  ':::::.",
			"       .::'        :::::::::::::::'      ':::::.",
			"      .::'        :::::::::::::::'          ':::.",
			"  ...:::          :::::::::::::'              ``::.",
			" ```` ':.         '::::::::::'                  ::::..",
			"                    ':::::'                    ':'````..",
			''
		]

		comments.forEach(item => {
			console.log('%c' + item, 'color: #399c9c')
		})
		console.log('TCL: whichComponent -> whichComponent', this.whichComponent)
	}
}
</script>

<style lang="stylus" scoped>
.el-header, .el-footer {
	background-color: #B3C0D1
	color: #333
	text-align: center
	line-height: 60px
}
</style>
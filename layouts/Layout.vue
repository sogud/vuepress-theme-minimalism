<template>
	<div class="theme-container">
		<!-- <canvas id="evanyou"></canvas> -->
		<transition name="custom-classes-transition"
								enter-active-class="animated fadeIn">
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
				<BackTop />
				<Footer />
			</div>
		</transition>
	</div>
</template>
<script>
import '@/util/fireworks'
// import evanyou from '@/util/evan-you'
import Home from '@/components/Home.vue'
import List from '@/components/List.vue'
import Posts from '@/components/Posts.vue'
import BackTop from '@/components/BackTop.vue'
export default {
	components: { Home, List, Posts, BackTop },
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
		// evanyou()
		console.log('TCL: whichComponent -> whichComponent', this.whichComponent)
	}
}
</script>

<style lang="stylus" scoped>
@import './../styles/animeition'

.el-header, .el-footer {
	background-color: #B3C0D1
	color: #333
	text-align: center
	line-height: 60px
}

#evanyou {
	position: fixed
	width: 100%
	height: 100%
	top: 0
	left: 0
	z-index: -1
}
</style>
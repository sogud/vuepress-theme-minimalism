<template>
	<div class="theme-container"
			 :class="isDark?'dark':''">
		<!-- <canvas id="evanyou"></canvas> -->
		<div class="dark-icon"
				 v-if="themeConfig.darkMode.switch"
				 @click="isDark=!isDark"></div>
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
import Home from '@/components/Home'
import List from '@/components/List'
import Tags from '@/components/Tags'
import TimeLine from '@/components/TimeLine'
import Posts from '@/components/Posts'
import BackTop from '@/components/BackTop'
export default {
	components: { Home, List, Posts, BackTop, Tags, TimeLine },
	data() {
		return {
			isDark: false
		}
	},
	computed: {
		pages() {
			return this.$site.pages
		},
		themeConfig() {
			return this.$site.themeConfig
		},
		whichComponent() {
			const compArr = ['List', 'All', 'Posts', 'TimeLine', 'Tags']
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
		console.log('TCL: whichComponent -> this.$page.', this.$page, this.$site)
		console.log('TCL: whichComponent -> whichComponent', this.whichComponent)
	}
}
</script>

<style lang="stylus" scoped>
@import './../styles/animeition'
@import './../styles/dark'

.dark-icon {
	position: fixed
	top: 0
	right: 0
	width: 100px
	height: 100px
	background: #ccc
	cursor: pointer
	z-index: 100
}

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
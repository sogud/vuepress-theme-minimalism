<template>
	<div class="theme-container"
			 :class="isDark?'dark':''">
		<div class="dark-icon"
				 v-if="themeConfig.darkMode.switch"
				 @click="isDark=!isDark">
			<!-- <svg v-if="isDark"
					 class="icon icon-dark"
					 aria-hidden="true">
				<use xlink:href="#icon-yueliang"></use>
			</svg>
			<svg v-else
					 class="icon icon-dark"
					 aria-hidden="true">
				<use xlink:href="#icon-taiyang"></use>
			</svg> -->
			<span v-if="isDark"
						class="iconfont icon-yueliang"></span>
			<span v-else
						class="iconfont icon-taiyang"></span>
		</div>
		<transition name="custom-classes-transition"
								enter-active-class="animated fadeIn">
			<Home v-if="$page.frontmatter.home" />
			<div v-else>
				<Header />
				<el-container>
					<el-main>
						<!-- <keep-alive> -->
						<component :is="whichComponent"></component>
						<!-- </keep-alive> -->
					</el-main>
				</el-container>
				<BackTop />
				<Footer />
			</div>
		</transition>
	</div>
</template>
<script>
import '@/styles/icon/iconfont.css'
import Home from '@/components/Home'
import List from '@/components/List'
import Tags from '@/components/Tags'
import TimeLine from '@/components/TimeLine'
import Posts from '@/components/Posts'
import BackTop from '@/components/BackTop'
// import '@/styles/icon/iconfont.js'
import { CursorSpecialEffects } from '@/util/fireworks.js'
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
		this.window = window
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
		const cursorSpecialEffects = new CursorSpecialEffects()
		cursorSpecialEffects.init()
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
	z-index: 100

	span {
		font-size: 3rem
		color: #e6a23c
		cursor: pointer
	}

	.icon-dark {
		cursor: pointer
		width: 3rem
		height: 3rem
	}
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
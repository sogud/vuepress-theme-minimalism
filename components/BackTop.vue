<template>
	<div>
		<transition name="custom-classes-transition"
								enter-active-class="animated fadeInDownBig"
								leave-active-class="animated fadeOutUpBig">
			<div v-if="isVisible"
					 class="back-to-top"
					 @click="backTop">
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'BackTop',
	data() {
		return {
			isVisible: false
		}
	},
	mounted() {
		window.addEventListener('scroll', this.scrollToTop)
	},
	destroyed() {
		window.removeEventListener('scroll', this.scrollToTop)
	},
	methods: {
		// 点击图片回到顶部方法，加计时器是为了过渡顺滑
		backTop() {
			let timer = setInterval(() => {
				let ispeed = Math.floor(-this.scrollTop / 5)
				document.documentElement.scrollTop = document.body.scrollTop =
					this.scrollTop + ispeed
				if (this.scrollTop === 0) {
					clearInterval(timer)
				}
			}, 16)
		},

		// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
		scrollToTop() {
			let scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop
			this.scrollTop = scrollTop
			if (this.scrollTop > 0) {
				this.isVisible = true
			} else {
				this.isVisible = false
			}
		}
	}
}
</script>

<style lang="stylus">
@import './../styles/animeition'

.back-to-top {
	cursor: pointer
	position: fixed
	right: 50px
	top: 0px
	z-index: 2
	width: 70px
	height: 900px
	background: url('./../styles/images/scroll.png')
	transition: all 0.5s ease-in-out
	opacity: 1
}

@media (max-height: 850px) {
	/* code */
	.back-to-top {
		top: -300px
		right: 0px
	}
}
</style>
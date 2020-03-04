<template>
	<main class="home"
				:style="homeBackground"
				aria-labelledby="main-title">
		<transition name="custom-classes-transition"
								enter-active-class="animated bounceIn"
								leave-active-class="animated fadeOutUpBig">
			<div class="hero"
					 :class="$site.themeConfig.homeBackground.show==false?'heroBackground':''"
					 v-if="isVisible">
				<router-link to="/list">
					<span class="iconfont icon-sort"></span>
					{{$site.themeConfig.headerText.all}}
				</router-link>
				<router-link to="/tags">
					<span class="iconfont icon-label_fill"></span>
					{{$site.themeConfig.headerText.tags}}
				</router-link>
				<router-link to="/timeline">
					<span class="iconfont icon-schedule"></span>
					{{$site.themeConfig.headerText.timeline}}
				</router-link>
				<router-link to="/">
					<span class="iconfont icon-home"></span>
					{{$site.themeConfig.headerText.index}}
				</router-link>
				<!-- <NavLink class="action-button title"
								 :item="actionLink" /> -->
				<!-- <img v-if="data.heroImage"
					 :src="$withBase(data.heroImage)"
					 :alt="data.heroAlt || 'hero'"> -->

				<!-- <p class="action"
				 v-if="data.actionText && data.actionLink">
				<NavLink class="action-button"
								 :item="actionLink" />
			</p> -->
			</div>
		</transition>
	</main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
	components: { NavLink },
	data() {
		return {
			isVisible: false
		}
	},
	computed: {
		data() {
			return this.$page.frontmatter
		},
		homeBackground() {
			if (this.$site.themeConfig.homeBackground.show) {
				return {
					background: `url(${this.$site.themeConfig.homeBackground.fileName})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}
			}
		},
		actionLink() {
			return {
				link: this.data.actionLink,
				text: this.data.actionText
			}
		}
	},
	mounted() {
		console.log(this.$site)
		this.isVisible = true
	},
	beforeDestroy() {
		this.isVisible = false
	}
}
</script>

<style lang="stylus">
@import './../styles/animeition'

.heroBackground {
	background: $accentColor !important
}

.home {
	// background: #fff
	display: flex
	justify-content: center
	align-items: center
	height: 100vh
	// background: url('https://i.loli.net/2019/11/17/GAYyzeKsiWjP5qO.jpg')
	background-size: cover
	background-position: center

	.hero {
		display: flex
		align-items: center
		justify-content: center
		width: 30rem
		height: 6rem
		box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4)
		backdrop-filter: blur(20px)
		transition: 0.5s ease

		&:hover {
			box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.137), 0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28), 0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5)
		}

		a {
			margin: 0 5px
			color: #ffffffa6 !important

			&:hover {
				color: #ffffff !important
			}
		}

		.title {
			padding-left: 0.375em
			font-size: 1.6em
			font-family: Lato, sans-serif
			font-weight: 200
			letter-spacing: 0.65em
			color: white

			@media (max-width: 640px) {
				font-size: 1em
			}
		}
	}
}

@media (max-width: $MQMobile) {
	.home {
		.features {
			flex-direction: column
		}

		.feature {
			max-width: 100%
			padding: 0 2.5rem
		}
	}
}

@media (max-width: $MQMobileNarrow) {
	.home {
		padding-left: 1.5rem
		padding-right: 1.5rem

		.hero {
			img {
				max-height: 210px
				margin: 2rem auto 1.2rem
			}

			h1 {
				font-size: 2rem
			}

			h1, .description, .action {
				margin: 1.2rem auto
			}

			.description {
				font-size: 1.2rem
			}

			.action-button {
				font-size: 1rem
				padding: 0.6rem 1.2rem
			}
		}

		.feature {
			h2 {
				font-size: 1.25rem
			}
		}
	}
}
</style>

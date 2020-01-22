<template>
	<main class="home"
				aria-labelledby="main-title">
				
		<div class="hero">
			<NavLink class="action-button"
								 :item="actionLink" />
			<!-- <img v-if="data.heroImage"
					 :src="$withBase(data.heroImage)"
					 :alt="data.heroAlt || 'hero'"> -->

			<!-- <p class="action"
				 v-if="data.actionText && data.actionLink">
				<NavLink class="action-button"
								 :item="actionLink" />
			</p> -->
		</div>
	</main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
	components: { NavLink },

	computed: {
		data() {
			return this.$page.frontmatter
		},

		actionLink() {
			return {
				link: this.data.actionLink,
				text: this.data.actionText
			}
		}
	}
}
</script>

<style lang="stylus">
.home {
	// background: #fff
	display: flex
	justify-content: center
	align-items: center
	height: 100vh

	.hero {
		display flex
		align-items center
		justify-content center
		width 30rem
		height 6rem
		background #399c9c

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

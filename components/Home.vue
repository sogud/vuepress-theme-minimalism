<template>
  <main class="home" :style="homeBackground" aria-labelledby="main-title">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceIn"
      leave-active-class="animated fadeOutUpBig"
    >
      <div
        class="hero"
        :class="$site.themeConfig.home.background.show == false ? 'heroBackground' : ''"
        v-if="isVisible"
      >
        <router-link to="/list">Hi</router-link>
      </div>
    </transition>
  </main>
</template>

<script>
export default {
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
      if (this.$site.themeConfig.home.background.show) {
        return {
          background: `url(${this.$site.themeConfig.home.background.fileName})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
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
		height: 5rem
		backdrop-filter: blur(20px)
		transition: 0.5s ease
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)

		&:hover {
		box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.3)
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

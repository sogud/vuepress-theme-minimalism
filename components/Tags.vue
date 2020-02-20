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
				<div class="container">
					<el-tag @click="toTag(tag)"
									class="tags"
									v-for="(tag, index) in tagsList"
									:style="randomRgb()"
									:key="index"
									size="medium">{{tag[0].name}}</el-tag>
					<el-row v-for="(item,index) in hasTagsList"
									:key="index">
						<el-card class="box-card"
										 shadow="hover">
							<div slot="header"
									 @click="toContent(item)"
									 class="clearfix">
								<div class="date-time">{{item.lastUpdated}}</div>
								<el-popover placement="top"
														v-if="$site.themeConfig.PostsListPopover"
														:offset="155"
														:title="item.title"
														width="300"
														trigger="hover"
														:content="item.excerpt">
									<div class="title"
											 slot="reference">{{item.title}}</div>
								</el-popover>
								<div v-else
										 class="title">{{item.title}}</div>
							</div>
							<div class="bottom clearfix">
								<a class="tag"
									 v-for="(item,index) in item.tags"
									 :key="index">
									#{{ item }}
								</a>
								<!-- <time class="time">{{ item.excerpt }}</time> -->
							</div>
						</el-card>

					</el-row>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import tagsList from '@/data/tagsList.js'
export default {
	data() {
		return {
			tagName: '',
			tagsList: tagsList
		}
	},
	computed: {
		hasTagsList() {
			if (!this.tagsList[this.tagName]) {
				return []
			}
			let arr = this.tagsList[this.tagName].slice(1)
			arr.forEach(item => {
				if (!item.tags) {
					item.tags = ['未分类']
				}
				if (typeof item.tags === 'string') {
					item.tags = item.tags.split(' ')
				}
			})
			return arr
		}
	},
	mounted() {
		console.log(this.$route)
		if (this.$route.query.tag) {
			this.tagName = this.$route.query.tag
		}
	},
	methods: {
		toTag(tag) {
			this.tagName = tag[0].name
		},
		toContent(item) {
			this.$router.push(item.path)
		},
		randomRgb() {
			var R = Math.floor(Math.random() * 255)
			var G = Math.floor(Math.random() * 255)
			var B = Math.floor(Math.random() * 255)
			return { background: 'rgb(' + R + ',' + G + ',' + B + ')' }
		}
	}
}
</script>

<style lang="stylus" scoped>
@import './../styles/list'

.container {
	padding: 0 30px
	min-height: 40vh

	.tags {
		margin: 5px
		color: #fff
		border: none
		cursor: pointer
	}
}
</style>
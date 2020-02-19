<template>
	<div>
		<el-row type="flex"
						justify="center"
						align="middle"
						v-for="(item,index) in data"
						:key="index">
			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 24}"
							:md="{span: 20}"
							:lg="{span: 12}"
							class="post-card">
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
			</el-col>
		</el-row>
	</div>
</template>

<script>
import data from '@/data/content'

export default {
	name: 'List',
	data() {
		return {
			data: data
		}
	},
	computed: {
		pages() {
			return this.$site.pages
		}
	},
	filters: {},
	created() {
		this.data.forEach(item => {
			if (!item.tags) {
				item.tags = ['未分类']
			}
			if (typeof item.tags === 'string') {
				item.tags = item.tags.split(' ')
			}
		})
	},
	mounted() {
		console.log('TCL: data', this.data)
		console.log('TCL: mounted -> this.$site', this.$site)
		console.log('TCL: mounted -> this.$page', this.$page)
		console.log('TCL: pages', this.pages)
	},
	methods: {
		toContent(item) {
			console.log('TCL: toDetail -> item', item)
			this.$router.push(item.path)
		}
	}
}
</script>

<style lang="stylus" scoped>
.box-card {
	margin: 10px

	&:first-child {
		margin-top: 20px
	}

	&:last-child {
		margin-bottom: 10px
	}

	.date-time {
		color: #ccc
		margin: 10px 0 20px 30px
		font-size: 0.75rem
	}

	.title {
		font-size: 1.4rem
		margin-left: 30px
		color: #666
		cursor: pointer

		&:hover {
			color: #9c396b
			text-shadow: 1px 1px 1px #ddd
		}
	}

	.tag {
		color: #399c9c
		margin-left: 30px
		cursor: pointer

		&:hover {
			color: #9c396b
			text-shadow: 1px 1px 1px #ddd
		}
	}
}
</style>
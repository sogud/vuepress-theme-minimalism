<template>
	<div>
		<el-row type="flex"
						justify="center"
						align="middle"
						v-for="(item,index) in content"
						:key="index">
			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 24}"
							:md="{span: 20}"
							:lg="{span: 12}"
							class="post-card">
				<el-card class="box-card"
								 shadow="always">
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
							 @click="toTags(item)"
							 v-for="(item,index) in item.tags"
							 :key="index">
							<span class="iconfont icon-label_fill"></span> {{ item }}
						</a>
						<!-- <time class="time">{{ item.excerpt }}</time> -->
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import content from '@/data/content'

export default {
	name: 'List',
	data() {
		return {
			content: content
		}
	},
	computed: {
		pages() {
			return this.$site.pages
		}
	},
	filters: {},
	created() {
		this.content.forEach(item => {
			if (!item.tags) {
				item.tags = ['未分类']
			}
			if (typeof item.tags === 'string') {
				item.tags = item.tags.split(' ')
			}
		})
	},
	mounted() {
    console.log("TCL: mounted -> this.$page", this.$page)
	},
	methods: {
		toContent(item) {
			this.$router.push(item.path)
		},
		toTags(tag) {
			this.$router.push({ path: `tags.html?tag=${tag}` })
		}
	}
}
</script>

<style lang="stylus" scoped>
@import './../styles/list'
</style>
<template>
	<div>
		<el-row type="flex"
						justify="center"
						align="middle"
						v-for="(item,index) in list"
						:key="index">
			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 22}"
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
		<el-row type="flex"
						justify="center"
						align="middle">

			<el-col :span="24"
							:xs="{span: 24}"
							:sm="{span: 22}"
							:md="{span: 20}"
							:lg="{span: 12}"
							class="post-card">
				<el-pagination layout="prev, pager, next"
											 :total="pageTotal"
											 :current-page="currentPage"
											 class="pagination"
											 @current-change="handleCurrentChange"
											 style="display: flex;justify-content: center;">
				</el-pagination>
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
			list: [],
			currentPage: 1,
			content: content,
			pageTotal: 0
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
		this.pageTotal = this.content.length
		let list = JSON.parse(JSON.stringify(this.content))
		this.list = list.splice(0, 10)
	},
	methods: {
		handleCurrentChange(val) {
			let list = JSON.parse(JSON.stringify(this.content))
			this.list = list.splice((val - 1) * 10, 10)
			this.currentPage = val
		},
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

.pagination >>> .el-pager li.active {
	color: $accentColor
	cursor: default
}

.pagination >>> .el-pager li:hover {
	color: $accentColor
}
</style>
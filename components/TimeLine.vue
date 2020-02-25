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
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in timeLineData"
														:key="index"
														:icon="activity.icon"
														:type="activity.type"
														:color="activity.color"
														:size="activity.size"
														:timestamp="activity.timestamp">

						<span class="time">{{activity.time}}</span>
						<el-row v-for="(item,index) in activity.data"
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
										 @click="toTags(item)"
										 v-for="(item,index) in item.tags"
										 :key="index">
										#{{ item }}
									</a>
								</div>
							</el-card>
						</el-row>
					</el-timeline-item>
				</el-timeline>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import timeLineData from '@/data/TimeLine'
export default {
	data() {
		return {
			timeLineData: timeLineData,
			activities: [
				{
					content: '支持使用图标',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					type: 'primary',
					icon: 'el-icon-more'
				},
				{
					content: '支持自定义颜色',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87'
				},
				{
					content: '支持自定义尺寸',
					timestamp: '2018-04-03 20:46',
					size: 'large'
				},
				{
					content: '默认样式的节点',
					timestamp: '2018-04-03 20:46'
				}
			]
		}
	},
	created() {
		this.timeLineData.forEach(timeLine => {
			timeLine.data.forEach(item => {
				if (!item.tags) {
					item.tags = ['未分类']
				}
				if (typeof item.tags === 'string') {
					item.tags = item.tags.split(' ')
				}
			})
		})
	},
	mounted() {
		console.log('TCL: mounted -> this.timeLineData', this.timeLineData)
	},
	methods: {
		toContent(item) {
			console.log('TCL: toContent -> item', item)
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

.time {
	font-size: 1.4rem
	color: #666
}
</style>
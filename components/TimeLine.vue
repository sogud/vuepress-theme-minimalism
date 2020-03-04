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
						<span class="time iconfont icon-schedule"></span>
						<span class="time">{{ activity.time}}</span>
						<el-row v-for="(item,index) in activity.data"
										:key="index">
							<el-card class="box-card"
											 shadow="always">
								<div @click="toContent(item)"
										 class="clearfix">
									<div class="date-time">{{item.lastUpdated}}</div>
									<div class="title">{{item.title}}</div>
									<a class="tag"
										 @click="toTags(item)"
										 v-for="(item,index) in item.tags"
										 :key="index">
										<span class="iconfont icon-label_fill"></span> {{ item }}
									</a>
								</div>
								<!-- <div class="bottom clearfix">
									<a class="tag"
										 @click="toTags(item)"
										 v-for="(item,index) in item.tags"
										 :key="index">
										#{{ item }}
									</a>
								</!-->
							</el-card>
						</el-row>
					</el-timeline-item>
				</el-timeline>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import timeLineData from '@/data/timeLine'
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
.time {
	font-size: 1.4rem
	color: #666
}

.box-card {
	// margin: 10px
	&:first-child {
		margin-top: 20px
	}

	&:last-child {
		margin-bottom: 10px
	}

	.date-time {
		color: #ccc
		margin: 10px 0 0px 30px
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
		color: $accentColor
		margin-left: 30px
		cursor: pointer

		&:hover {
			color: #9c396b
			text-shadow: 1px 1px 1px #ddd
		}
	}
}
</style>
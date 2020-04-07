<template>
	<el-row type="flex"
					justify="center"
					align="middle">
		<el-col :span="24"
						:xs="{span: 24}"
						:sm="{span: 22}"
						:md="{span: 20}"
						:lg="{span: 12}">
			<div class="header">
				<div class="container">
					<el-row type="flex"
									class="row-bg"
									justify="space-between">
						<el-col :span="16"
										:sm="16"
										:md="16"
										:lg="14"
										:xl="16"
										class="hidden-xs-only">
							<div class="link-group">
								<router-link to="/list/">
									<span class="iconfont icon-sort"></span>
									<span>{{$site.themeConfig.headerText.all}}</span>
								</router-link>
								<router-link to="/tags/">
									<span class="iconfont icon-label_fill"></span>
									<span>{{$site.themeConfig.headerText.tags}}</span>
								</router-link>
								<router-link to="/timeline/">
									<span class="iconfont icon-schedule"></span>
									<span>{{$site.themeConfig.headerText.timeline}}</span>
								</router-link>
								<router-link to="/">
									<span class="iconfont icon-home"></span>
									<span>{{$site.themeConfig.headerText.index}}</span>
								</router-link>
							</div>

						</el-col>
						<el-col :xs="5"
										class="hidden-sm-and-up">
							<i class="el-icon-menu"
								 @click="drawer = true"></i>
						</el-col>
						<el-col :span="8"
										:xs="22"
										:sm="8"
										:md="8"
										:lg="10"
										:xl="8">
							<span class="search">
								<span class="iconfont icon-nav-search"></span>
								<el-autocomplete class="inline-input"
																 v-model="searchValue"
																 :fetch-suggestions="querySearch"
																 :trigger-on-focus="false"
																 @select="handleSelect"></el-autocomplete>
								{{$site.themeConfig.headerText.seacrh}}
							</span>
						</el-col>
					</el-row>
					<el-drawer title="我是标题"
										 :visible.sync="drawer"
										 :with-header="false">
						<el-menu class="el-menu-vertical"
										 @select="drawer=false">
							<el-menu-item index="1">
								<router-link to="/list">
									<span class="iconfont icon-sort"></span>
									<span>{{$site.themeConfig.headerText.all}}</span>
								</router-link>
							</el-menu-item>
							<el-menu-item index="2">
								<router-link to="/tags">
									<span class="iconfont icon-label_fill"></span>
									<span>{{$site.themeConfig.headerText.tags}}</span>
								</router-link>
							</el-menu-item>
							<el-menu-item index="3">
								<router-link to="/timeline">
									<span class="iconfont icon-schedule"></span>
									<span>{{$site.themeConfig.headerText.timeline}}</span>
								</router-link>
							</el-menu-item>
							<el-menu-item index="4">
								<router-link to="/">
									<span class="iconfont icon-home"></span>
									<span>{{$site.themeConfig.headerText.index}}</span>
								</router-link>
							</el-menu-item>
						</el-menu>
					</el-drawer>
				</div>
			</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import searchList from '@/data/search'
import '@/styles/icon/iconfont.css'
export default {
	name: 'Header',
	data() {
		return {
			searchValue: '',
			restaurants: searchList,
			drawer: false
		}
	},
	mounted() {
		// this.restaurants = searchList
		console.log('TCL: mounted -> this.restaurants', this.restaurants)
	},
	methods: {
		querySearch(queryString, cb) {
			console.log('TCL: querySearch -> queryString', queryString)
			var restaurants = this.restaurants
			var results = queryString
				? restaurants.filter(this.createFilter(queryString))
				: restaurants
			// 调用 callback 返回建议列表的数据
			console.log('TCL: querySearch -> results', results)
			cb(results)
		},
		createFilter(queryString) {
			return restaurant => {
				return (
					restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
					0
				)
			}
		},
		handleSelect(item) {
			this.$router.push(item.path)
			this.searchValue = ''
		}
	}
}
</script>

<style lang="stylus" scoped>
.header {
	margin: 20px
	background: $accentColor
	position: relative
	flex-shrink: 0
	height: 8rem
	display: block
	// width: 100%
	color: #333
	border-radius: 5px
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)

	// 
	.container {
		text-align: left
		padding: 0 60px
		line-height: 8rem
		color: #fff

		.search {
			span {
				cursor: pointer
			}
		}

		.link-group {
			a {
				font-size: 1rem
				margin: 0 3px
				color: #fff
			}
		}
	}
}

.search >>> .el-input__inner {
	display: none
	-webkit-appearance: none
	background-color: $accentColor
	background-image: none
	border-radius: 0px
	border: 0px solid #DCDFE6
	border-bottom: 1px solid #DCDFE6
	box-sizing: border-box
	color: #fff
	display: inline-block
	font-size: inherit
	height: 1rem
	line-height: 1rem
	outline: 0
	padding: 0 0px
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
	width: 100%
}

.el-menu-vertical {
	color: #ccc
}
</style>
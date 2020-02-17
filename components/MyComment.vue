<template>
	<Vssue :title="$page.title"
				 :options="options" />
</template>

<script>
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'

export default {
	name: 'MyComment',
	components: {
		Vssue: VssueComponent
	},
	data() {
		return {
			title: 'Vssue Demo'
		}
	},
	computed: {
		options() {
			return Object.assign({ api: GithubV3 }, this.$themeConfig.vssue.option)
		}
	}
}
</script>
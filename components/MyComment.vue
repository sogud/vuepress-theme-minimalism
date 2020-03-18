<template>
	<div>
		<div v-if="$site.themeConfig.vssue.use">
			<Vssue :title="$page.title"
						 :options="options" />
		</div>
		<div v-if="$site.themeConfig.disqus.use">
			<div id="disqus_thread"></div>
		</div>
	</div>

</template>

<script>
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'

export default {
	name: 'MyComment',
	components: {
		Vssue: VssueComponent,
	},
	data() {
		return {
			title: 'Vssue'
		}
	},
	computed: {
		options() {
			return Object.assign({ api: GithubV3 }, this.$themeConfig.vssue.option)
		}
	},
	mounted() {
		this.disqusName = this.$site.themeConfig.disqus.option.name
		/**
		 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
		 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
		/*
		var disqus_config = function () {
		this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
		this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
		};
		*/
		var d = document,
			s = d.createElement('script')
		s.src = `https://${this.disqusName}.disqus.com/embed.js`
		s.setAttribute('data-timestamp', +new Date())
		;(d.head || d.body).appendChild(s)
	}
}
</script>
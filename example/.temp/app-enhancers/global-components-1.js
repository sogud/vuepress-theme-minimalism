import Vue from 'vue'
Vue.component("demo-component", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/example/.vuepress/components/demo-component"))
Vue.component("OtherComponent", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/example/.vuepress/components/OtherComponent"))
Vue.component("Foo-Bar", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/example/.vuepress/components/Foo/Bar"))
Vue.component("BaseListLayout", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/global-components/BaseListLayout"))
Vue.component("BlogTag", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/global-components/BlogTag"))
Vue.component("BlogTags", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/global-components/BlogTags"))
Vue.component("NavLink", () => import("/Users/shunshun/Github/blogs/docs/.vuepress/theme/global-components/NavLink"))


export default {}
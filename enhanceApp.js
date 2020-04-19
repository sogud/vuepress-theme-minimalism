import ElementUI from 'element-ui/lib'
import routes from './router/routes'
import 'element-ui/lib/theme-chalk/index.css'
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(routes, { router })
  Vue.use(ElementUI)
}

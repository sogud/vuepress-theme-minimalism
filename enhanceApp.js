// import Vuetify from './node_modules/vuetify/lib'
// import './node_modules/vuetify/dist/vuetify.min.css'
// const Vuetify = require('./node_modules/vuetify/lib')
// import Vuetify from './node_modules/vuetify/dist/vuetify.min.js'
// import Vuetify, { VLayout } from './node_modules/vuetify/lib'
import ElementUI from 'element-ui/lib'
import 'element-ui/lib/theme-chalk/index.css';
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  // Vuetify,
}) => {
  Vue.use(ElementUI)
  // Vue.use(Vuetify)
}

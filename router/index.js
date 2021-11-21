import Layout from "../layouts/Layout.vue"

const install = (Vue, { router }) => {
  const routes = [
    {
      name: "/",
      path: "/",
      component: Layout
    },
    {
      name: "list",
      path: "/list",
      component: Layout
    },
    {
      name: "tags",
      path: "/tags",
      component: Layout
    },
    {
      name: "timeline",
      path: "/timeline",
      component: Layout
    }
  ]

  router.addRoutes(routes)

  router.beforeEach((to, from, next) => {
    next()
  })
}

export default {
  install
}

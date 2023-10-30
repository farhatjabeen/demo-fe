const routers = [

  {
    layout: "AuthLayout",
    path: "/auth",
    childrens: [
      {
        component: "Login",
        childPath: "/login",
      },
    ]
  },
  {
    layout: "MainLayout",
    path: "/",
    childrens: [
      {
        component: "home",
        childPath: "/",
      },
      {
        component: "findMissingItem",
        childPath: "/findMissingItem",
      },
    ]
  },
  // {
  //   init: '/auth/login',
  //   path: '/'
  // },
  {
    component: 'Page404',
    path: '*'
  },
]


export default routers

const routers = [

  {
    layout: "AuthLayout",
    path: "/",
    childrens: [
      {
        component: "home",
        childPath: "/",
      },
      {
        component: "findMissingItem",
        childPath: "/findMissingItem/:itemName",
      },
      {
        component: "MyProfile",
        childPath: "/myProfile",
      },
      {
        component: "Login",
        childPath: "/login",
      },
    ]
  },
  {
    layout: "MainLayout",
    path: "/user",
    childrens: [
      
      
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

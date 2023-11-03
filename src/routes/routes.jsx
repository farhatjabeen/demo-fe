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
        childPath: "/findMissingItem/:itemName/:location",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addMoreDetails/:itemName/:location",
      },
      {
        component: "QueryPublished",
        childPath: "/queryPublished",
      },
      {
        component: "MyProfile",
        childPath: "/myProfile",
      },
      {
        component: "ViewItem",
        childPath: "/viewItem/:id",
      },
      {
        component: "ContactUs",
        childPath: "/contactUs",
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

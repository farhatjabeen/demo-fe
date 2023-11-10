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
      {
        component: "itemDetails",
        childPath: "/itemDetails",
      },
      {
        component: "BusinessSignIn",
        childPath: "/businessSignIn",
      },
      {
        component: "CompanyProfile",
        childPath: "/companyProfile",
      },
      {
        component: "AllItems",
        childPath: "/allItems",
      }
    ]
  },
  {
    layout: "MainLayout",
    path: "/user",
    childrens: [
      {
        component: "MyProfile",
        childPath: "/myProfile",
      },
    ]
  },
  {
    layout: "AdminAuthLayout",
    path: "/admin",
    childrens: [
      {
        component: "signIn",
        childPath: "/signIn",
      },
    ]
  },
  {
    layout: "AdminMainLayout",
    path: "/admin/user",
    childrens: [
      {
        component: "foundItems",
        childPath: "/foundItems",
      },
      {
        component: "user",
        childPath: "/users",
      },
      {
        component: "user",
        childPath: "/businessUser",
      },
      {
        component: "itemDetails",
        childPath: "/itemDetails",
      },
    ]
  },
  {
    component: "Page404",
    path: "*",
  },
];

export default routers;

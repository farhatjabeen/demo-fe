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
      {
        component: "signIn",
        childPath: "/signIn",
      },
      {
        component: "drawer",
        childPath: "/drawer",
      },
      {
        component: "foundItems",
        childPath: "/foundItems",
      },
      {
        component: "itemDetails",
        childPath: "/itemsDetails",
      },
      {
        component: "user",
        childPath: "/user",
      },
    ],
  },
  {
    layout: "MainLayout",
    path: "/user",
    childrens: [],
  },
  {
    component: "Page404",
    path: "*",
  },
];

export default routers;

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
        childPath: "/findmissingitem/:itemname/:location",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addMoredetails/:itemname/:location",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addmoredetails",
      },
      {
        component: "BusinessItemDetails",
        childPath:"/businessitemdetails"
      },
      {
        component: "QueryPublished",
        childPath: "/querypublished",
      },
      {
        component: "ViewItem",
        childPath: "/viewitem/:id",
      },
      {
        component: "ContactUs",
        childPath: "/contactus",
      },
      {
        component: "Login",
        childPath: "/login",
      },
      {
        component: "itemDetails",
        childPath: "/itemdetails",
      },
      {
        component: "BusinessSignIn",
        childPath: "/businessSignin",
      },
      {
        component: "BusinessSignUp",
        childPath: "/businessignup",
      },
      {
        component: "CompanyProfile",
        childPath: "/companyprofile",
      },
      {
        component: "AllItems",
        childPath: "/allitems",
      },
      {
        component: "AboutUs",
        childPath: "/aboutus",
      },
      {
        component: "BusinessHome",
        childPath: "/businesshome",
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
        component: "addFoundItems",
        childPath: "/foundItems/addfoundItems",
      },
      {
        component: "editFoundItems",
        childPath: "/foundItems/editfoundItems",
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
        component: "settings",
        childPath: "/settings",
      },
      {
        component: "itemDetails",
        childPath: "/foundItems/itemDetails",
      },
    ]
  },
  {
    component: "Page404",
    path: "*",
  },
];

export default routers;

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
        childPath: "/findmissingitem/:itemName/:location",
      },
      {
        component: "findMissingItem",
        childPath: "/findmissingitem/:itemNameAgain",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addMoredetails/:newItem/:location",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addmoredetails",
      },
      {
        component: "BusinessItemDetails",
        childPath:"/businessitemdetails/:id"
      },
      {
        component: "QueryPublished",
        childPath: "/querypublished",
      },
      {
        component: "ClaimItem",
        childPath: "/claimitem/:id",
      },
      {
        component: "MyListings",
        childPath: "/mylistings",
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
        component: "termsOfUse",
        childPath: "/termsofuse",
      },
      {
        component: "privacyPolicy",
        childPath: "/privacypolicy",
      },
      {
        component: "BusinessHome",
        childPath: "/businesshome",
      },
      {
        component: "changePassword",
        childPath: "/changepassword",
      },
    ]
  },
  {
    layout: "MainLayout",
    path: "/user",
    childrens: [
      {
        component: "MyProfile",
        childPath: "/myprofile",
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
        component: "editFoundItems",
        childPath: "/foundItems/editfoundItems/:id",
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
        childPath: "/foundItems/itemDetails/:id",
      },
    ]
  },
  {
    component: "Page404",
    path: "*",
  },
];

export default routers;

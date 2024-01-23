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
        component: "home",
        childPath: "/user/:resetPassword/:tokens",
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
        childPath: "/addMoreDetails",
      },
      {
        component: "AddMoreDetails",
        childPath: "/addMoreDetails/:id",
      },
      {
        component: "BusinessItemDetails",
        childPath:"/businessitemdetails/:id"
      },
      {
        component: "QueryPublished",
        childPath: "/querypublished/:id",
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
        component: "forgotPassword",
        childPath: "/businessSignin/resetpassword/:token",
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
        component: "editDetails",
        childPath: "/editdetails/:id",
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
        component: "detailPage",
        childPath: "/businesshome/detailpage",
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
        childPath: "/myProfile"
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
      {
        component: "resetPasswordAdmin",
        childPath: "/resetPassword/:token",
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
        component: "foundItems",
        childPath: "/foundItems/:item",
      },
      {
        component: "foundItems",
        childPath: "/foundItems/:item/:category",
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
        component: "user",
        childPath: "/logout",
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

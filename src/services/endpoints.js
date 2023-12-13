const apiPath = {
    login: '/user/login',
    loginGeneralUser: '/user/login',
    logoutGeneralUser: '/user/logout',
    logoutBusinessUser: '/business/signup',
    checkEmail: '/user/emailExist',
    registerGeneralUser: '/user/signup',
    registerBusinessUser: '/business/signup',
    loginAdmin: '/admin/login',
    resetPasswordAdmin:'/admin/resetPassword',
    businessProfile: '/business/userDetails',
    userProfile: '/user/editProfile',
    editBusinessProfile: '/business/editProfile',
    contactAdmin: '/user/sendQueryToAdmin',
    items: {
        fetchItems: '/business/getItems',
        fetchFoundItems: '/admin/getAllItem',
        fetchUserItems: '/admin/getAllUser',
        fetchBusinessUserItems: '/admin/getAllBusinessUser',
        getItembyid:'/admin/item',
        updateFoundItems:'/admin/updateItem',
        deleteItem:'/admin/deleteItem',
        deleteUser:'/admin/deleteUser',
        itemReport:'/admin/generateItemReport',
        deleteBusinessUser:'/admin/deleteUser',
        searchByKeyword: '/user/getItemByKeyword',
        searchById: '/user/item',
        myListing:'/user/myListings',
        viewById: '/business/item',
        generalUserItemsById: '/user/item',
        deleteUserItemId: '/user/removeListing',
        searchByLocation: '/user/getItemByLocation',
        claimItem: '/user/contactToClaim',
        locationDropdown: '/user/dropDownSearchLocation',
        categoryDropdown:'/user/dropDownSearchCategories',
        itemDropdown: '/user/searchItemCategories'
    }
}

const ApiMethods = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

let endpoints = {
    apiPath,
    ApiMethods
}

export default endpoints;

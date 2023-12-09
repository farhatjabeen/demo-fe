const apiPath = {
    login: '/user/login',
    loginGeneralUser: '/user/login',
    logoutGeneralUser: '/user/logout',
    checkEmail: '/user/emailExist',
    registerGeneralUser: '/user/signup',
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
        updateFoundItems:'/admin/updateItem',
        deleteItem:'/admin/deleteItem',
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

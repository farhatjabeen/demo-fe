const apiPath = {
    login: '/user/login',
    loginGeneralUser: '/user/login',
    logoutGeneralUser: '/user/logout',
    checkEmail: '/user/emailExist',
    registerGeneralUser: '/user/signup',
    loginAdmin: '/admin/login',
    businessProfile: '/business/userDetails',
    editBusinessProfile: '/business/editProfile',
    contactAdmin: '/user/sendQueryToAdmin',
    items: {
        fetchItems: '/business/getItems',
        fetchFoundItems: '/admin/getAllItem',
        fetchUserItems: '/admin/getAllUser',
        fetchBusinessUserItems: '/admin/getAllBusinessUser',
        updateFoundItems:'/admin/updateItem',
        searchByKeyword: '/user/getItemByKeyword',
        searchById: '/user/item',
        myListing:'/user/myListings',
        viewById: '/business/item',
        generalUserItemsById: '/user/item',
        searchByLocation: '/user/getItemByLocation',
        claimItem: '/user/contactToClaim',
        locationDropdown: '/user/dropDownSearchLocation',
        categoryDropdown:'/user/dropDownSearchCategories'
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

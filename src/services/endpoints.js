const apiPath = {
    login: '/user/login',
    loginGeneralUser: '/user/login',
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
        viewById: '/business/item',
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

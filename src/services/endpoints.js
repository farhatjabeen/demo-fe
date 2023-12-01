const apiPath = {
    login: '/user/login',
    loginAdmin: '/admin/login',
    resetPasswordAdmin:'/admin/resetPassword',
    businessProfile: '/business/userDetails',
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
        viewById: '/business/item',
        searchByLocation: '/user/getItemByLocation',
        claimItem: '/user/contactToClaim',
        locationDropdown: '/user/dropDownSearchLocation'
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

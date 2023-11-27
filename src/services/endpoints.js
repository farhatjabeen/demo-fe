const apiPath = {
    login: '/user/login',
    businessProfile: '/business/userDetails',
    editBusinessProfile: '/business/editProfile',
    items: {
        fetchItems: '/business/getItems',
        fetchFoundItems: '/admin/getAllItem',
        searchByKeyword: '/user/getItemByKeyword',
        searchById: '/user/item',
        
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

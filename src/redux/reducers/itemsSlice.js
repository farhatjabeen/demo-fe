import { createSlice } from "@reduxjs/toolkit";
import apiRequest from '../../services'
import endpoints from "../../services/endpoints";
import { Toast } from "../../components/toast";

let initialState = {
    itemDetails: [],
    foundItemDetails: [],
    searchKey: [],
    searchId: [],
    viewDetailsById: [],
    viewDetailsByLocation: [],
    dropdownLocationValues: [],
    dropdownCategoryValues: [],
    dropdownItemValues: [],
}

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        saveItemDetails: (state, action) => {
            state.itemDetails = { ...action.payload }
        },
        saveFoundItemDetails: (state, action) => {
            state.foundItemDetails = { ...action.payload }
        },
        saveUpdateFoundItems: (state, action) => {
            state.updateFoundItems = { ...action.payload }
        },
        saveUserDetails: (state, action) => {
            state.userDetails = { ...action.payload }
        },
        saveBusinessUserDetails: (state, action) => {
            state.businessUserDetails = { ...action.payload }
        },
        saveItemData: (state, action) => {
            state.searchKey = { ...action.payload }
        },
        saveItemDataById: (state, action) => {
            state.searchId = { ...action.payload }
        },
        viewItemDetailsById: (state, action) => {
            state.viewDetailsById = { ...action.payload }
        },
        viewItemDetailsByLocation: (state, action) => {
            state.viewDetailsByLocation = { ...action.payload }
        },
        dropdownLocation: (state, action) => {
            state.dropdownLocationValues = { ...action.payload }
        },
        dropdownCategory: (state, action) => {
            state.dropdownCategoryValues = { ...action.payload }
        },
        dropdownItem: (state, action) => {
            state.dropdownItemValues = { ...action.payload }
        },
        clearItemState: () => initialState
    }
});

//get items
export const fetchItems = (currentPage, PageLimit = 10) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchItems}?page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken'
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemDetails({ list, pageMeta }))
            Toast({ type: "success", message: res.message })
            return resolve(true);
        }).catch(err => {
            console.log(err)
            Toast({ type: "error", message: err.message })
            return err
        })
    })
}

//get items in admin
export const adminFetchItems = (currentPage = 1, PageLimit = 10, selectedCategory, searchTerm, itemcode) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchFoundItems}?page=${currentPage}&limit=${PageLimit}&category=${selectedCategory || ''}&itemName=${searchTerm || ''}&itemcode=${itemcode}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveFoundItemDetails({ list, pageMeta }))
            Toast({ type: "success", message: res.message })
            return resolve(true);
        }).catch(err => {
            console.log(err)
            Toast({ type: "error", message: err.message })
            return err
        })
    })
};

//get user in admin
export const adminFetchUser = (currentPage = 1, PageLimit = 10, searchUserTerm) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchUserItems}?page=${currentPage}&limit=${PageLimit}&usercode=${searchUserTerm || ''}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveUserDetails({ list, pageMeta }))
            Toast({ type: "success", message: res.message })
            return resolve(true);
        }).catch(err => {
            console.log(err)
            Toast({ type: "error", message: err.message })
            return err
        })
    })
};


//get businessUser in admin
export const adminFetchBusinessUser = (currentPage = 1, PageLimit = 10, searchBusinessTerm) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.fetchBusinessUserItems}?page=${currentPage}&limit=${PageLimit}&usercode=${searchBusinessTerm || ''}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'adminToken'
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveBusinessUserDetails({ list, pageMeta }))
            Toast({ type: "success", message: res.message })
            return resolve(true);
        }).catch(err => {
            console.log(err)
            Toast({ type: "error", message: err.message })
            return err
        })
    })
};

// get items by keyword 
export const searchItem = (itemName, currentPage = 1, PageLimit = 10) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.searchByKeyword}?keyword=${itemName}&page=${currentPage}&limit=${PageLimit}`,
            method: endpoints.ApiMethods.GET,
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemData({ list, pageMeta }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// my listings general user
export const myListingItems = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.myListing,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(saveItemDetails({ list, pageMeta }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const deleteMyListingItems = ({ itemId }) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.deleteUserItemId}?itemId=${itemId}`,
            method: endpoints.ApiMethods.DELETE,
            isAuth: true
        }).then(() => {
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// get items by item name and location
export const searchByLocation = (itemName, location) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.searchByLocation}?page=1&limit=10&itemName=${itemName}&location=${location}`,
            method: endpoints.ApiMethods.GET,
        }).then((res) => {
            const { list, pageMeta } = res.data
            dispatch(viewItemDetailsByLocation({ list, pageMeta }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const searchKey = (state) => {
    if (state.items?.searchKey.list) {
        return state.items?.searchKey
    } else {
        return state.items?.viewDetailsByLocation
    }
};

// get items by id
export const searchItemById = (itemId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.searchById}/${itemId}`,
            method: endpoints.ApiMethods.GET
        }).then((res) => {
            const { _id, itemImage, itemName, location, foundDate, foundTime } = res.data
            // if (Array.isArray(itemImage) && itemImage.length > 0) {
            //     dispatch(saveItemDataById(itemImage))
            // }
            dispatch(saveItemDataById({ _id, itemImage, itemName, location, foundDate, foundTime }))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
};

// get item details of business user by id
export const viewItemById = (itemId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.viewById}/${itemId}`,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken',
        }).then((res) => {
            const { itemImage, itemName, itemCategory, itemDescription,
                keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId } = res.data
            // if (Array.isArray(itemImage) && itemImage.length > 0) {
            //     dispatch(viewItemDetailsById(itemImage))
            // }

            dispatch(viewItemDetailsById({ itemImage, itemName, itemCategory, itemDescription, keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId }))

            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// get item details of general user by id
export const viewUserItemById = (itemId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.generalUserItemsById}/${itemId}`,
            method: endpoints.ApiMethods.GET,
        }).then((res) => {
            const { itemImage, itemName, itemCategory, itemDescription, keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId } = res.data

            if (Array.isArray(itemImage) && itemImage.length > 0) {
                dispatch(viewItemDetailsById(itemImage))
            }
            dispatch(viewItemDetailsById({ itemImage, itemName, itemCategory, itemDescription, keywords, location, locationIdentifiers, userName, mobileNumber, emailMailId }))

            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

// claim item - Temporarily not using 
// export const claimItemNow = (itemId) => async (dispatch) => {
//     return new Promise((resolve, reject) => {
//         apiRequest({
//             url: `${endpoints.apiPath.items.claimItem}/${itemId}`,
//             method: endpoints.ApiMethods.POST,
//             isAuth: true,
//         }).then(() => {
//             return resolve(true);
//         }).catch((err) => {
//             console.log(err)
//             return err;
//         })
//     })
// }

//location drop down data
export const locationDropdownValues = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.locationDropdown,
            method: endpoints.ApiMethods.GET,
            isAuth: true,
            tokenType: 'businessUserToken',
        }).then((res) => {
            dispatch(dropdownLocation(res.data))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

//category drop down data
export const categoryDropdownValues = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.categoryDropdown,
            method: endpoints.ApiMethods.GET,
        }).then((res) => {
            dispatch(dropdownCategory(res.data))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

//item drop down data
export const itemDropdownValues = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: endpoints.apiPath.items.itemDropdown,
            method: endpoints.ApiMethods.GET,
            isAuth: true
        }).then((res) => {
            console.log(res.data, 'res.data')
            dispatch(dropdownItem(res.data))
            return resolve(true)
        }).catch(err => {
            console.log(err)
            return err;
        })
    })
}

export const clearItemData = () => (dispatch) => {
    try {
        dispatch(clearItemState());
    } catch (error) {
        return error
    }
}
//update found item in admin
export const adminUpdateFoundItems = (values, itemId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiRequest({
            url: `${endpoints.apiPath.items.updateFoundItems}?itemId=${itemId}}`,
            method: endpoints.ApiMethods.PUT,
            isAuth: true,
            tokenType: 'adminToken',
            data: values
        }).then((res) => {
            console.log(res)
        }).then((res) => {
            const { list } = res.data
            dispatch(saveUpdateFoundItems({ list }))
            return resolve(true);
        }).catch(err => {
            console.log(err)
            return err
        })
    })
};
//delete in admin
export const deleteItem = (itemId, context) => (dispatch) => {
    try {
        if (context === "foundItems") {
            apiRequest({
                url: `${endpoints.apiPath.items.deleteItem}?itemId=${itemId}`,
                method: endpoints.ApiMethods.DELETE,
                isAuth: true,
                tokenType: 'adminToken',
            });
        } else if (context === "user") {
            apiRequest({
                url: `${endpoints.apiPath.items.deleteUser}?userId=${itemId}`,
                method: endpoints.ApiMethods.DELETE,
                isAuth: true,
                tokenType: 'adminToken',
            });
        }
        else if (context === "businessUser") {
            apiRequest({
                url: `${endpoints.apiPath.items.deleteBusinessUser}?userId=${itemId}`,
                method: endpoints.ApiMethods.DELETE,
                isAuth: true,
                tokenType: 'adminToken',
            });
        }

        dispatch(adminFetchItems());
        Toast({ type: "success", message: "Item deleted successfully." });
    } catch (error) {
        console.error(error);
        if (error?.status === 400 && error?.data === "Item not found") {
            Toast({ type: "error", message: "Item not found. Please refresh the page." });
        } else {
            Toast({ type: "error", message: "Error deleting item." });
        }
    }
};

export const updateFoundItems = (state) => state.items?.updateFoundItems;
export const itemDetails = (state) => state.items?.itemDetails;
export const userDetails = (state) => state.items?.userDetails;
export const foundItemDetails = (state) => state.items?.foundItemDetails;
export const searchDetailsById = (state) => state.items?.searchId;
export const viewDetails = (state) => state.items?.viewDetailsById;
export const locationDetails = (state) => state.items?.dropdownLocationValues;
export const categoryDetails = (state) => state.items?.dropdownCategoryValues;
export const itemDropdown = (state) => state.items?.dropdownItemValues;
export const businessUserDetails = (state) => state.items?.businessUserDetails;

export const {
    saveItemData,
    saveMyListingItems,
    dropdownLocation,
    dropdownCategory,
    saveFoundItemDetails,
    clearItemState,
    saveItemDataById,
    viewItemDetailsById,
    viewItemDetailsByLocation,
    saveUpdateFoundItems,
    saveBusinessUserDetails,
    saveItemDetails,
    clearData,
    saveUserDetails,
    dropdownItem
} = itemsSlice.actions;

export default itemsSlice.reducer;

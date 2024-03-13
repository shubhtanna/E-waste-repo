const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SENDOTP_API : BASE_URL + "/user/sendotp",
    SIGNUP_API : BASE_URL + "/user/signup",
    LOGIN_API : BASE_URL + "/user/login",
    DELETE_ACCOUNT_API : BASE_URL + "/user/deleteaccount",
    CONTACT_US_API : BASE_URL + "/user/contactus"
}

//vendor end points

export const vendorEndpoints = {
    GET_VENDOR_DETAILS_API : BASE_URL + "/admin/getallvendor",
    UPDATE_VENDOR_DETAILS_API : BASE_URL + "/vendor/updatevendordetails",
    GET_ALL_VENDOR_DETAILS_API : BASE_URL + "/admin/getallvendor"
}

//Individual endpoints 

export const individualEndpoints = {
    UPDATE_INDIVIDUAL_API : BASE_URL + "/individual/updateindividualdetails" ,
    GET_ALL_INDIVIDUAL_ACCOUNT_API : BASE_URL + "/admin/getallindividual",
    GET_POST_OF_PRODUCT : BASE_URL + "individual/getuserproducts",
    GET_SHOP_BY_CITY : BASE_URL + "/individual/getshopbycity",
}

//product end points

export const productEndpoints = {
    CREATE_PRODUCT_API : BASE_URL + "/individual/createproduct",
    GET_ONE_PRODUCT_API : BASE_URL + "/admin/getoneproduct",
    UPDATE_PRODUCT_API : BASE_URL + "/individual/updateproduct",
    DELETE_PRODUCT_API : BASE_URL + "/individual/deleteproduct",
    GET_INTRESTED_VENDOR_ON_PRODUCTS_API : BASE_URL + "/indivodual/interestedproduct",
    GET_ALL_PRODUCTS_API : BASE_URL + "/individual/getallproducts",
    GET_ALL_INTRESTED_PRODUCT_OF_THAT_USER_API : BASE_URL + "/individual/getallinterestedproducts",
    GET_ALL_INTRSTED_USER_ON_THAT_PRODUCT_API : BASE_URL + "/individual/getAllIntrestedUsers"

}

//category end points

export const categoryEndpoints = {
    CREATE_CATEGORY_API : BASE_URL + "/admin/createcategory",
    UPDATE_CATEGORY_API : BASE_URL + "/admin/updatecategory",
    DELETE_CATEGORY_API : BASE_URL + "/admin/deletecategory",
}

// Brand end points

export const brandEndpoints = {
    CREATE__BRAND_API : BASE_URL + "/admin/createbrand",
    UPDATE_BRAND_API : BASE_URL + "/admin/updatebrand",
    DELETE_BRAND_API : BASE_URL + "/admin/deletebrand",
}
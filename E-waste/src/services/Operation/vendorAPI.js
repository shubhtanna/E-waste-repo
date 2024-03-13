import { setLoading } from "../../Slices/authSlice";
import { apiConnector } from "../apiConnector";
import { vendorEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
    GET_VENDOR_DETAILS_API,
    GET_ALL_VENDOR_DETAILS_API,
    UPDATE_VENDOR_DETAILS_API
} = vendorEndpoints

export const getAllVendorDetails = async(token) => {
    let result = [];
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("GET", GET_ALL_VENDOR_DETAILS_API,null,{
            authorization: `Bearer ${token}`,
        })

        console.log("GET_ALL_VENDOR_DETAILS_API RESPONSE.....",response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("All vendor fetched successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("GET_ALL_VENDOR_DETAILS_API ERROR.....",error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
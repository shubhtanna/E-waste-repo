import { setLoading, setToken } from "../../Slices/authSlice";
import { setUser } from "../../Slices/userSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    DELETE_ACCOUNT_API,
    CONTACT_US_API
} = endpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastid = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            })
            console.log("SENDOTP_API API RESPONSE.....", response);
            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP_API ERROR.....", error);
            toast.error("could not send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastid);
    }
}

export function signUp(
    AccountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                AccountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("SIGNUP_API RESPONSE....", response);
            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successfully")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP_API ERROR....", error);
            toast.error("Signup failed");
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN_API RESPONSE....", response);
            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/7.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("LOGIN API ERROR....", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/")
    }
}

export function deleteAccount(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        try {
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
                authorization: `Bearer ${token}`,
            })
            console.log("DELETE_ACCOUNT_API RESPONSE.....", response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))

        } catch (error) {
            console.log("DELETE_ACCOUNT_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId);
    }
}

export function contactUs (token,name,email,message){
    return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST", CONTACT_US_API,data, {
            authorization: `Bearer ${token}`,
            name,email,message
        } );
        console.log("CONTACT_US_API RESPONSE.....",response)

        if(!response?.data?.success){
            throw new Error("could not send contact us")
        }
        toast.success("successfully send");
        navigate("/")
    } catch (error) {
        console.log("CONTACT_US_API ERROR.....",error);
        toast.error("could not send your data")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
    }
}
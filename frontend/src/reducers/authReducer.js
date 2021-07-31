import { toast } from 'react-toastify'
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    _id: null,
    email: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_UP":
        case "SIGN_IN":
            toast("Signed up")
            const user = jwtDecode(action.token)
            return {
                ...initialState,
                token: action.token,
                username: user.username,
                _id: user._id,
                email: user.email
            }
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                token: null,
                name: null,
                email: null,
                _id: null,
            };
        default:
            return state;
    }
};
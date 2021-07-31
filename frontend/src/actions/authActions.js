import axios from 'axios';
import { url } from "../api/api";
import { toast } from "react-toastify";

export const signUp = (user) => {
    return (dispatch) => {
        axios.post(`${url}/signup`, user).then(token => {
            localStorage.setItem("token", token.data)
            dispatch({
                type: "SIGN_UP",
                token: token.data
            })
        }).catch(err => {
            console.log(err.response)
            toast.error(err.response?.data)
        })
    }
}

export const signIn = (user) => {
    return (dispatch) => {
        axios
            .post(`${url}/signin`, user)
            .then((token) => {
                localStorage.setItem("token", token.data);

                dispatch({
                    type: "SIGN_IN",
                    token: token.data,
                });
            })
            .catch((error) => {
                console.log(error.response);

                toast.error(error.response?.data);
            });
    };
};

export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
        });

    };
};

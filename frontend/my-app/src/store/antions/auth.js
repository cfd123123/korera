//middleware
import axios from 'axios';
import { Alert } from 'bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import * as actionTypes from './actionTypes';

//action creater
export const auth = (username, password , formIsValid) => {   //in Auth/Auth.js file.
    return dispatch => {
        dispatch(authStart());
        const authData = {
            userName: username,
            password: password,
        };
        let url = 'http://localhost:8080/authenticate';
        console.log("authData");
        console.log(authData);
        axios.post(url, authData)
            .then(response => {
                console.log("response");
                console.log(response);
                console.log(response.data);
                //const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authSuccess(response.data.token, response.data.userId));
                //this.props.history.push('/')
                //<Link to = "/help" /> 
            })
            .catch(err => {
                console.log("errmessage----------------------");
                console.log(err);
                alert("username or password Wrong, Please Try Again")
                //dispatch(authFail(err.response.data.error));
            });
        };
};

export const SignUp = (username, password, formIsValid) => {   //in Auth/Auth.js file.
    return dispatch => {
        const authData = {
            userName: username,
            password: password,
            role: "Customer",
        };
        let url = 'http://localhost:8080/users/create';
        console.log("authData");
        console.log(authData);
        axios.post(url, authData)
            .then(response => {
                console.log("response");
                console.log(response);
                console.log(response.data);
                alert("SignUp Successfully ")
                //this.props.history.push('/')
            })
            .catch(err => {
                console.log("errmessage----------------------");
                console.log(err);
                alert("something wrong, please try again")
                //dispatch(authFail(err.response.data.error));
            });
    };
};



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');            //do operation here instead of in reducer
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};



export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
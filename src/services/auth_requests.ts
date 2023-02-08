import axios from "axios";
import {store} from "../redux/store";
import {setLoggedIn} from "../redux/actions";

const API_URL: string = "http://localhost:8080/api/auth/";

export async function sendLoginRequest(username: string, password: string) {
    try {
        const response = await axios.post(API_URL + "login", {username: username, password: password});
        const accessToken = await response.data.accessToken;
        const refreshToken = await response.data.refreshToken;
        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
            store.dispatch(setLoggedIn(true));
        }
        return response;
    } catch (err: any) {
        if (err.response.status === 400 || err.response.status === 401) {
            throw new Error("Wrong username or password");
        } else {
            throw err;
        }
    }
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    store.dispatch(setLoggedIn(false));
}

export async function sendRegisterRequest(username: string, password: string) {
    try {
        return await axios.post(API_URL + "register", {
            username: username,
            password: password
        }).then(() => sendLoginRequest(username, password));
    } catch (err: any) {
        if (err.response.status === 409) {
            throw new Error("Username already exists");
        } else if (err.response.status === 400) {
            throw new Error("Username must be from 3 to 10 symbols long. Valid characters: [ a-z, A-Z, 0-9, _ ]");
        } else {
            throw err;
        }
    }
}

export function getAccessAuthHeader() {
    const accessTokenStr = localStorage.getItem("accessToken");
    if (accessTokenStr) {
        let accessToken = JSON.parse(accessTokenStr);
        if (accessToken) {
            return {Authorization: 'Bearer ' + accessToken};
        }
    }
    return {Authorization: ''};
}

function getRefreshToken() {
    const refreshTokenStr = localStorage.getItem("refreshToken");
    if (refreshTokenStr) {
        let refreshToken = JSON.parse(refreshTokenStr);
        if (refreshToken) {
            return refreshToken;
        }
    }
}

export async function setNewAccessToken() {
    try {
        const response = await axios.post(API_URL + "token", {refreshToken: getRefreshToken()});
        const accessToken = await response.data.accessToken;
        if (accessToken) {
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
        }
    } catch (err: any) {
        logout();
        console.log(err);
    }
}
export function isUserLoggedIn() {
    return !!localStorage.getItem("refreshToken");
}

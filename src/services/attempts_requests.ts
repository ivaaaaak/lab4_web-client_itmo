import axios from "axios";
import {Attempt} from "../models/model";
import {getAccessAuthHeader, setNewAccessToken} from "./auth_requests";

const ATTEMPTS_API_URL: string = "http://localhost:8080/api/attempts";

export async function getAllAttempts() {
    try {
        const response = await axios.get<Required<Attempt>[]>(ATTEMPTS_API_URL, {headers: getAccessAuthHeader()});
        return response.data;
    } catch (err: any) {
        if (err.response.status === 403) {
            setNewAccessToken().then(() => {return getAllAttempts()});
        }
        return err;
    }
}

export async function sendNewAttempt(attempt: Attempt) {
    try {
        const response = await axios.post<Required<Attempt>>(ATTEMPTS_API_URL, {
            x: attempt.x,
            y: attempt.y,
            r: attempt.r
        }, {headers: getAccessAuthHeader()});
        return response.data;
    } catch (err: any) {
        if (err.response.status === 403) {
            setNewAccessToken().then(() => {return sendNewAttempt(attempt)});
        }
        return err;
    }
}

export async function clearAllAttempts() {
    try {
        return await axios.delete(ATTEMPTS_API_URL, {headers: getAccessAuthHeader()});
    } catch (err: any) {
        if (err.response.status === 403) {
            setNewAccessToken().then(() => {return clearAllAttempts()});
        }
        return err;
    }
}


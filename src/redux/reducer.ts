import {Action, State} from "../models/model";
import {SET_LOGGED_IN} from "./actions";
import {isUserLoggedIn} from "../services/auth_requests";

const initialState: State = {
    loggedIn: isUserLoggedIn()
}

export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case SET_LOGGED_IN: {
            return {...state, loggedIn: action.payload};
        }
        default: {
            return state;
        }
    }
}
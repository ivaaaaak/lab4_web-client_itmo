export interface Attempt {
    id?: number
    x: number
    y: number
    r: number
    hit?: boolean
}

export interface State {
    loggedIn: Boolean
}

export interface Action {
    type: string
    payload?: any
}
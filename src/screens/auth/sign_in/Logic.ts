
//ACTIONS
export enum ActionTypes {
    SHOW_MODAL,
    CHANGE_SIGNIN_MODE
}

interface SignInActions {
    isShowModal?: boolean,
    type: ActionTypes,
    mode?: SignInMode
}

type SignInState = {
    isShowModal: boolean,
    signInMode: SignInMode
}

export enum SignInMode {
    INTERNET,
    LOCAL
}
export const initState: SignInState = {
    isShowModal: false,
    signInMode: SignInMode.INTERNET
}

export const signInReducer = (state: SignInState = initState, action: SignInActions): SignInState => {
    switch (action.type) {
        case ActionTypes.SHOW_MODAL:
            return { ...state, isShowModal: !state.isShowModal, signInMode: action.mode! }
        case ActionTypes.CHANGE_SIGNIN_MODE:
            return { ...state, signInMode: action.mode! }
        default:
            throw new Error('Unknown Action');
    }
}

export const showModal = (mode: SignInMode): SignInActions => {
    return {
        type: ActionTypes.SHOW_MODAL,
        mode
    }
}
export const changeSignInMode = (mode: SignInMode): SignInActions => {
    return {
        type: ActionTypes.CHANGE_SIGNIN_MODE,
        mode
    }
}




interface initState {
    width: number;
    height: number;
    isActive: boolean;
}

export const initialState: initState = {
    width: 350,
    height: 300,
    isActive: false,
}

export function reducer(state: initState, action: {type: string, payload: any}) {
    switch (action.type) {
        case "WIDTH":
            return {...state, width: action.payload}
        case "HEIGHT":
            return {...state, height: action.payload}
        case "IsACTIVE":
            return {...state, isActive: action.payload}
        default:
            return state
    }
}
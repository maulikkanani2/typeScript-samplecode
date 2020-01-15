import * as apisActions from "./apis.action";
import {
    GET_API_LIST_FAILED, GET_API_LIST, GET_API_LIST_SUCCEEDED
} from "./apis.action";
import {ApisState} from "./apis.type";

const initialApiListState: ApisState = {
    apiList: [],
    pending: false
}

export default (state: ApisState = initialApiListState, action: apisActions.ApisActionTypes): ApisState => {
    switch (action.type) {
        case GET_API_LIST:
            return {
                ...state,
                pending: true,
            }
        case GET_API_LIST_SUCCEEDED:
            const {items, paginationToken} = action.payload
            return {
                ...state,
                apiList: items,
                paginationToken,
                error: undefined,
                pending: false,
            }
        case GET_API_LIST_FAILED:
            return {
                ...state,
                error: action.payload,
                pending: false,
            }
        default:
            return state
    }
}


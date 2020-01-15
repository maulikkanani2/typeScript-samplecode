import {GetApiListParams, GetApiListResponse} from "./apis.type";
// ------------------------------------------
// Exported actions
// ------------------------------------------
export const GET_API_LIST = 'GET_API_LIST'
export const GET_API_LIST_SUCCEEDED = 'GET_API_LIST_SUCCEEDED'
export const GET_API_LIST_FAILED = 'GET_API_LIST_FAILED'

export interface GetApiListAction {
    type: typeof GET_API_LIST,
    payload: GetApiListParams,
}

export interface GetApiListSucceededAction {
    type: typeof GET_API_LIST_SUCCEEDED
    payload: GetApiListResponse
}

export interface GetApiListFailedAction {
    type: typeof GET_API_LIST_FAILED
    payload: Error
}

export type ApisActionTypes = GetApiListAction | GetApiListSucceededAction | GetApiListFailedAction

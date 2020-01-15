import {API, Auth, graphqlOperation} from "aws-amplify";
import * as gql from "../graphql/queries";
import {Api,ApiGQL, GetApiListParams, GetApiListResponse} from "./apis.type";

interface GetApisGraphQLResponse {
    data?: {
        getApiConfigurationList: {
            items: Api[]
            paginationToken: string
        }
    };
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}

export async function getApis({paginationToken, limit}: GetApiListParams): Promise<GetApiListResponse> {
    const currentSession = await Auth.currentSession()
    const response = await API.graphql(graphqlOperation(gql.getApiConfigurationList, {
        idToken: currentSession.getIdToken().getJwtToken(),
        // limit,
        // paginationToken,
    })) as GetApisGraphQLResponse

    return {
        items: response.data.getApiConfigurationList.items.map((e: ApiGQL) => new Api(e)),
        paginationToken: response.data.getApiConfigurationList.paginationToken
    }
}

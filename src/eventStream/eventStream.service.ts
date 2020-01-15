import {API, Auth, graphqlOperation} from "aws-amplify";
import * as gql from "../graphql/queries";
import * as gqlSub from "../graphql/subscriptions";
import {
    AddNewEventSubscriptionEvent,
    ApiEvent,
    ApiEventGQL, GetEventDetailParams,
    GetEventsParams,
    GetEventsResponse,
} from "./eventStream.type";
import * as Observable from "zen-observable";

interface GetEventsGraphQLResult {
    data?: {
        getEvents: {
            items: ApiEventGQL[]
            paginationToken: string
        }
    };
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}

interface GetEventDetailGraphQLResult {
    data?: {
        getEventDetail: ApiEventGQL
    }
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}

export async function getEvents({apiId}: GetEventsParams): Promise<GetEventsResponse> {
    const currentSession = await Auth.currentSession()
    const response = await API.graphql(graphqlOperation(gql.getEvents, {
        idToken: currentSession.getIdToken().getJwtToken(),
        apiId
    })) as GetEventsGraphQLResult

    // const response = await API.get('exchanges', `/integrations/${apiId}/exchanges`)
    return {
        items: response.data.getEvents.items.map((e: ApiEventGQL) => new ApiEvent(e)),
        paginationToken: response.data.getEvents.paginationToken
    }
}

export async function getEventDetail({ apiId, eventId }: GetEventDetailParams): Promise<ApiEvent> {
    const currentSession = await Auth.currentSession()
    const response = await API.graphql(graphqlOperation(gql.getEventDetail, {
        idToken: currentSession.getIdToken().getJwtToken(),
        apiId,
        eventId,
    })) as GetEventDetailGraphQLResult

    // const response = await API.get('exchanges', `/integrations/${apiId}/exchanges`)
    return new ApiEvent(response.data.getEventDetail)
}


export async function subscribeToEventStream({apiId, onNextHandler, onStartHandler, onCompleteHandler}: {
    apiId: string,
    onNextHandler: (e: ApiEvent) => (void),
    onCompleteHandler: () => void,
    onStartHandler: () => void
}): Promise<ZenObservable.Subscription> {
    return new Promise((resolve, reject) => {
        const result = API.graphql(
            graphqlOperation(gqlSub.subscribeToApiStream, apiId)
        ) as Observable<AddNewEventSubscriptionEvent>
        const subscription = result.subscribe({
            next: (e: AddNewEventSubscriptionEvent) => {
                const event = new ApiEvent(e.value.data.subscribeToApiStream)
                onNextHandler(event)
            },
            error: (err) => {
                reject(err)
            },
            complete: onCompleteHandler,
            start: onStartHandler,
        });
        resolve(subscription)
    })
}

export async function unsubscribeToEventStream(subscription: ZenObservable.Subscription) {
    subscription.unsubscribe()
}

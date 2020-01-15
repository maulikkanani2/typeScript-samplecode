import moment from 'moment';

// ===============================
// Parameters types
// ===============================

export interface GetEventsParams {
    apiId: string,
    paginationToken?: string
}

export interface GetEventDetailParams {
    apiId: string,
    eventId: string
}
export interface EventStreamSubscriptionParams {
    apiId: string,
}

// ===============================
// Response types
// ===============================
export interface GetEventsResponse {
    items: ApiEvent[],
    paginationToken: string
}

// ===============================
// models
// ===============================
export interface Header {
    key: string,
    value: string
}

export interface ApiEventRequestGQL {
    method: string
    path: string
    protocol: string
    protocolVersion: string
    receivedAt: string
    headers: [Header]
    body: string
}

export interface ApiEventResponseGQL {
    statusCode: number,
    receivedAt: string,
    headers: [Header]
    body: string
}

export interface ApiEventGQL {
    apiId: string
    eventId: string
    targetId: string
    proxyId: string
    endpointId: string
    receivedAt: number
    latency: number
    request: ApiEventRequestGQL
    response: ApiEventResponseGQL
}

export class ApiEventRequest {
    public readonly method: string
    public readonly path: string
    public readonly protocol: string
    public readonly protocolVersion: string
    private readonly _receivedAt: number
    public readonly headers: [Header]
    public readonly body: string


    constructor(apiEventRequestGQL: ApiEventRequestGQL) {
        const {method, path, protocol, protocolVersion, receivedAt, headers, body} = apiEventRequestGQL
        this.method = method;
        this.path = path;
        this.protocol = protocol;
        this.protocolVersion = protocolVersion;
        this._receivedAt = parseInt(receivedAt, 10)
        this.headers = headers;
        this.body = body;
    }

    get receivedAt(): number {
        return Math.round(this._receivedAt / 1000000)
    }
}

export class ApiEventResponse {
    public readonly statusCode: number
    private readonly _receivedAt: number
    public readonly headers: [Header]
    public readonly body: string

    constructor(apiEventResponseGQL: ApiEventResponseGQL) {
        const {statusCode, receivedAt, headers, body} = apiEventResponseGQL
        this.statusCode = statusCode
        this._receivedAt = parseInt(receivedAt, 10)
        this.headers = headers
        this.body = body
    }

    get receivedAt(): number {
        return Math.round(this._receivedAt / 1000000)
    }
}

export class ApiEvent {
    public readonly apiId: string
    public readonly eventId: string
    public readonly targetId: string
    public readonly proxyId: string
    public readonly endpointId: string
    public readonly request?: ApiEventRequest
    public readonly response?: ApiEventResponse

    constructor(apiEventGQL: ApiEventGQL) {
        const {apiId, eventId, targetId, proxyId, endpointId, request, response} = apiEventGQL

        this.apiId = apiId;
        this.eventId = eventId;
        this.targetId = targetId;
        this.proxyId = proxyId;
        this.endpointId = endpointId;

        if (request) {
            this.request = new ApiEventRequest(request);
        }
        if (response) {
            this.response = new ApiEventResponse(response);
        }
    }

    get isWaitingForResponse(): boolean {
        return !this.response
    }

    get isError(): boolean {
        return this.response && this.response.statusCode >= 400
    }
    /**
     * If the event include detailed payload
     */
    get includesDetail(): boolean {
        return typeof this.response.body !== "undefined" ||
            typeof this.request.body !== "undefined"
    }
    get receivedAt(): number {
        return !!this.request ? this.request.receivedAt : 0
    }

    get receivedAtDisplay(): string {
        if (!this.receivedAt) {
            return ''
        }
        return moment(this.receivedAt).fromNow()
    }

    get latency(): number {
        if (this.isWaitingForResponse) {
            return 0;
        }
        return this.response.receivedAt - this.receivedAt
    }

    get latencyDisplay(): string {
        return this.latency ? `${this.latency} ms` : ''
    }
}

export interface EventStreamState {
    readonly events: ApiEvent[]
    readonly subscription?: ZenObservable.Subscription
    // set of event ids that detail row is expanded. expanded state is controlled by this props to prevent the rows
    // from collapsing when new detail is fetched
    readonly expandedEventIds: Set<string>
    readonly paginationToken?: string
    readonly pending?: boolean
    readonly error?: Error
}

export interface AddNewEventSubscriptionEvent {
    value: {
        data: {
            subscribeToApiStream: ApiEventGQL
        }
    }
}

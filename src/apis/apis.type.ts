// ===============================
// Parameters types
// ===============================
export interface GetApiListParams {
    paginationToken?: string
    limit?: number
}

// ===============================
// Response types
// ===============================
export interface GetApiListResponse {
    items: Api[],
    paginationToken: string
}

// ===============================
// models
// ===============================

export interface ApiGQL {
    id: string
    name: string
    originUrl: string
    proxyUrl: string
}

export class Api {
    public readonly id: string
    public readonly name: string
    public readonly originUrl: string
    public readonly proxyUrl: string

    constructor(apiGQL: ApiGQL) {
        const {id, name, proxyUrl, originUrl } = apiGQL

        this.id = id;
        this.name = name;
        this.originUrl = originUrl;
        this.proxyUrl = proxyUrl;
    }
}

export interface ApisState {
    readonly apiList: Api[]
    readonly paginationToken?: string
    readonly pending?: boolean
    readonly error?: Error
}

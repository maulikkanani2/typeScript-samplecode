// tslint:disable
// this is an auto generated file. This will be overwritten

export const getEvents = `query GetEvents($idToken: String!, $apiId: String!) {
  getEvents(idToken: $idToken, apiId: $apiId) {
    items {
      apiId
      eventId
      proxyId
      receivedAt
      request {
        method
        path
        protocol
        protocolVersion
        receivedAt
        headers {
          key
          value
        }
      }
      response {
        statusCode
        receivedAt
        headers {
          key
          value
        }
      }
    }
    paginationToken
  }
}
`;
export const getEventDetail = `query GetEventDetail($idToken: String!, $apiId: String!, $eventId: String!) {
  getEventDetail(idToken: $idToken, apiId: $apiId, eventId: $eventId) {
    apiId
    eventId
    proxyId
    receivedAt
    request {
      method
      path
      protocol
      protocolVersion
      receivedAt
      headers {
          key
          value
      }
      body
    }
    response {
      statusCode
      receivedAt
      body
      headers {
        key
        value
      }
    }
    receivedAt
  }
}
`;
export const getApiConfigurationList = `query GetApiConfigurationList($idToken: String!) {
  getApiConfigurationList(idToken: $idToken) {
    items {
      id
      name
      originUrl
      proxyUrl
    }
    paginationToken
  }
}
`;

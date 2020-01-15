// tslint:disable
// this is an auto generated file. This will be overwritten

export const subscribeToApiStream = `subscription SubscribeToApiStream($apiId: String!) {
  subscribeToApiStream(apiId: $apiId) {
    apiId
    eventId
    proxyId
    request {
      method
      path
      protocol
      protocolVersion
      receivedAt
      body
    }
    response {
      statusCode
      receivedAt
      body
    }
    receivedAt
  }
}
`;

// tslint:disable
// this is an auto generated file. This will be overwritten

export const addNewEvent = `mutation AddNewEvent($event: EventInput!) {
  addNewEvent(event: $event) {
    apiId
    eventId
    proxyId
    request {
      method
      path
      protocol
      protocolVersion
      receivedAt
    }
    response {
      statusCode
      receivedAt
    }
    receivedAt
  }
}
`;
export const addApiConfiguration = `mutation AddApiConfiguration($event: ApiConfigurationInput!) {
  addApiConfiguration(event: $event) {
    id
    name
    originUrl
    proxyUrl
  }
}
`;

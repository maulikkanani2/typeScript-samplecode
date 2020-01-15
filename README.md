## ApiTracker Web Client

This project is the main customer-facing web application for ApiTracker. This README provides an overview of the project,
its architecture and how to contribute to it

### Architecture

![picture](./web-client-architecture.png)

The app is deployed to S3. End user will access cloudfront which requests and cache the code from S3.

### GraphQL

graphql-service creates an AppSync endpoint which powers the web client. We also use appsync for its realtime data capacity

The app subscibes to a AppSync subscription. When events happen in the back end, it calls an appropriate mutation in AppSync 
which push the notication to end users

### Cognito

The app uses cognito for user authentication. The user pool and related resources are provisioned by terraform scripts found
under `provisioning`. See `Provisioning` below for more detail 

### Getting start

Copy `.env.local.template` to `.env` and update any necessary value

Run the following command to install dependencies and start a local server 

```
yarn install
yarn start
```

### Test

Run `yarn test`

#### To add tests

Create file with the following format {name}.test.ts(x) next to the file being test, for example `auth.action.test.ts` to test `auth.action.ts`

### Deploy

The project is built and deployed automatically by CircleCI. Simply commit to master and push the change. Go to circleci.com to
check the status. To deploy to production, decide if this would be a major, minor or a patch deploy and run `npm version (major|minor|patch)`

Once the deploy finishes, the app can be accessed at:

* https://app.apitracker.dev for dev environment
* https://app.apitracker.com for production environment


### To create new user

Until we add user registration, we need to manually create new user. You need to know the following before creating a new user

1. email
1. name
1. a temporary password
1. account uuid. The account this user belong to. All users in an account will have full access to all of its API until we support fine grained authorization
1. cognito user pool id. Dev and prod has different id. Make sure you select the right one

To create a new user, run
```
AWS_PROFILE=dev ./createuser.sh  --cognito-user-pool-id us-east-1_9lvkNMj8k --name "Trung Vu" --email {email} --password "{password}" --account-id {account uuid}
```

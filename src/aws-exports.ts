import Amplify from 'aws-amplify'

export const config = {
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
    },
    "aws_project_region": process.env.REACT_APP_REGION,
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.REACT_APP_REGION,
    "aws_appsync_authenticationType": "AWS_IAM",
};

export default Amplify.configure(config)

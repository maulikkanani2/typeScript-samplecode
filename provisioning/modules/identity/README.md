## Identity module with Cognito

This is a terraform module to set up cognito as an identity service based on https://github.com/squidfunk/terraform-aws-cognito-auth

It provisions the following resources:

* Cognito user pool
* Cognito identity pool
* Cognito user pool client
* Necessary IAM roles

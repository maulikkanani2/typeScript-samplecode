provider "aws" {
  region = var.aws_region
}

terraform {
  # The configuration for this backend will be filled in by Terragrunt
  backend "s3" {}

  # The latest version of Terragrunt (v0.19.0 and above) requires Terraform 0.12.0 or above.
  required_version = ">= 0.12.0"
}

module "cognito_identity" {
  source                         = "git@bitbucket.org:apitracker/terraform-modules.git//aws/identity?ref=master"
//  source                         = "/Users/trung/dev/terraform-modules/aws/identity"
  namespace                      = "apitracker"
  aws_region                         = var.aws_region
  cognito_identity_pool_name     = "idp ${var.stage}"
  cognito_identity_pool_provider = var.domain_name
  tags = var.tags
  post_confirmation_lambda_arn = var.post_confirmation_lambda_arn
  attributes = [
    {
      name                = "email"
      attribute_data_type = "String"
      mutable             = true
      required            = true
    },
    {
      name                = "name"
      attribute_data_type = "String"
      mutable             = true
      required            = true
    },
    {
      name                = "accountId"
      attribute_data_type = "String"
      mutable             = false
      required            = false
    },
  ]
}

resource "aws_iam_policy" "cognito_authenticated_role" {
  name        = "cognito_authenticated_policy"
  path        = "/"
  description = "apitracker ${var.stage} cognito authenticated policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
     {
         "Effect": "Allow",
         "Action": [
            "appsync:GraphQL"
         ],
         "Resource": [
            "arn:aws:appsync:*:*:apis/${var.appsync_api_id}/types/Query/fields/getEvents",
            "arn:aws:appsync:*:*:apis/${var.appsync_api_id}/types/Query/fields/getEventDetail",
            "arn:aws:appsync:*:*:apis/${var.appsync_api_id}/types/Query/fields/getApiConfigurationList",
            "arn:aws:appsync:*:*:apis/${var.appsync_api_id}/types/Subscription/fields/subscribeToApiStream"
         ]
     }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role = module.cognito_identity.cognito_authenticated_aws_iam_role
  policy_arn = aws_iam_policy.cognito_authenticated_role.arn
}


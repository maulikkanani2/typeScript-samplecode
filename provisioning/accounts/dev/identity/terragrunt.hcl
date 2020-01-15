# Terragrunt will copy the Terraform configurations specified by the source parameter, along with any files in the
# working directory, into a temporary folder, and execute your Terraform commands in that folder.
terraform {
  source = "../../../modules/identity"
}

# Include all settings from the root terragrunt.hcl file
include {
  path = find_in_parent_folders()
}

# These are the variables we have to pass in to use the module specified in the terragrunt configuration above
inputs = {
  domain_name = "apitracker.dev"
  aws_region = "us-east-1"
  appsync_api_id = "5jnahv5lgvgurjjpzcdcycls2a"
  post_confirmation_lambda_arn = ""
  tags = {
    org = "apitracker"
    product = "identity"
  }
}


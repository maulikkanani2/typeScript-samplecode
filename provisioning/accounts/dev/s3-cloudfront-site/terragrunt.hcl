# Terragrunt will copy the Terraform configurations specified by the source parameter, along with any files in the
# working directory, into a temporary folder, and execute your Terraform commands in that folder.
terraform {
  source = "../../../modules/s3-cloudfront-site"
}

# Include all settings from the root terragrunt.hcl file
include {
  path = find_in_parent_folders()
}

# These are the variables we have to pass in to use the module specified in the terragrunt configuration above
inputs = {
  aws_region = "us-east-1"
  tags = {
    org = "apitracker"
    product = "web-client"
  }
  domain_name = "apitracker.dev"
  app_domain = "app.apitracker.dev"
  duplicate_content_penalty_secret = "erzyXWvbqeppxsgCZeYYbtFQePaBYDoHwDrRmBwsFcMfbmjbGd3njKndQMZd"
}


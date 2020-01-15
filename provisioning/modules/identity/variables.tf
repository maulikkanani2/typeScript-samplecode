variable "stage" {
  type    = string
  default = "dev"
}
variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "tags" {
  type = map(string)
  default = {
    org     = "apitracker"
    product = "identity"
  }
}

variable "domain_name" {
  type    = string
  default = "apitracker.dev"
}

variable "appsync_api_id" {
  type = string
}

variable "post_confirmation_lambda_arn" {
  type = string
}

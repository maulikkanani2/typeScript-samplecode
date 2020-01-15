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
    product = "web-client"
  }
}

variable "domain_name" {
  type    = string
  default = "apitracker.dev"
}

variable "app_domain" {
  type    = string
  default = "app.apitracker.dev"
}

variable "deployer_role_name" {
  type        = string
  description = "Name of deployer role, e.g. Developer in dev account)"
  default     = "Developer"
}
variable "duplicate_content_penalty_secret" {
  type        = string
}

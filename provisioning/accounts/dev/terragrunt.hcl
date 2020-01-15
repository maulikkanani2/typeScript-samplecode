remote_state {
  backend = "s3"
  config = {
    bucket         = "terraform-state-dev.apitracker.com"
    key            = "web-client/${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

iam_role = "arn:aws:iam::439007477582:role/Administrator"

inputs = {
  stage = "dev"
}

provider "aws" {
  region = var.aws_region
}

terraform {
  # The configuration for this backend will be filled in by Terragrunt
    backend "s3" {}
}

data "aws_acm_certificate" "cert" {
  domain   = var.domain_name
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "primary" {
  name         = var.domain_name
}

module "s3-cloudfront-site" {
  name = "apitracker-web-client-${var.stage}"
  source           = "git@bitbucket.org:apitracker/terraform-modules.git//aws/s3-cloudfront-website?ref=master"
  acm_certificate_arn = data.aws_acm_certificate.cert.arn
  deployer_role_name = var.deployer_role_name
  duplicate_content_penalty_secret = var.duplicate_content_penalty_secret
  domain = var.app_domain
  tags = var.tags
}

resource "aws_route53_record" "cdn-cname" {
  zone_id = data.aws_route53_zone.primary.id
  name    = var.app_domain
  type    = "CNAME"
  ttl     = "60"
  records = [module.s3-cloudfront-site.cloudfront_distribution.domain_name]
}

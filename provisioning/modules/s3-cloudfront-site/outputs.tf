output "cloudfront_distribution" {
  value = module.s3-cloudfront-site.cloudfront_distribution
}

output "website_bucket" {
  value = module.s3-cloudfront-site.website_bucket
}

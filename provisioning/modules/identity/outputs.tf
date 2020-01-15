output "identity_pool_id" {
  value = module.cognito_identity.cognito_identity_pool_id
}

output "cognito_user_pool_id" {
  value = module.cognito_identity.cognito_user_pool_id
}

output "cognito_user_pool_client_id" {
  value = module.cognito_identity.cognito_user_pool_client_id
}


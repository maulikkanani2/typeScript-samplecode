#!/bin/bash

while [[ "$#" -gt 0 ]]; do case $1 in
  --cognito-user-pool-id) cupid="$2"; shift;;
  --name) name="$2";shift;;
  --email) email="$2";shift;;
  --password) password="$2";shift;;
  --account-id) accountid="$2";shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

sub="$(aws cognito-idp admin-create-user --user-pool-id $cupid --username $email --user-attributes Name=custom:accountId,Value=$accountid --message-action SUPPRESS | jq -c -r ".User.Attributes[0].Value")"
echo "Created user in cognito: $sub"
aws cognito-idp admin-update-user-attributes --user-pool-id $cupid  --username $email --user-attributes Name=name,Value="$name" > /dev/null
aws cognito-idp admin-update-user-attributes --user-pool-id $cupid  --username $email --user-attributes Name=name,Value="$name" > /dev/null
aws cognito-idp admin-update-user-attributes --user-pool-id $cupid  --username $email --user-attributes Name=email,Value=$email > /dev/null
aws cognito-idp admin-update-user-attributes --user-pool-id $cupid  --username $email  --user-attributes Name=email_verified,Value=true > /dev/null
aws cognito-idp admin-set-user-password --user-pool-id  $cupid  --username $email --password $password > /dev/null
echo "Updated user attributes"

aws lambda invoke --function-name authorization-service-dev-addNewAccount --payload '{"accountId": "'$accountid'", "adminUserId": "'$sub'"}' /tmp/out && cat /tmp/out


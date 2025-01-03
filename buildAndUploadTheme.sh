#!/usr/bin/env bash

#PROD
#GHOST_HOST=https://shrutiandmax2025.info
#KEY="6735011253a19f00016a9151:512af02071c720ff7d6659f4f0c03fb0acb32331e4867b2d1afbbba8f2ca7102"

#LOCAL DEV
GHOST_HOST=http://localhost:2368
KEY="6776fca4f09f357eb40926d1:fd9b85808e7a22cf09aeae4fd74689fbedea503e11af665135c6333637178a48"
rm ./dist/*.zip

# Compile theme
yarn zip


# Split the key into ID and SECRET
TMPIFS=$IFS
IFS=':' read ID SECRET <<< "$KEY"
IFS=$TMPIFS

# Prepare header and payload
NOW=$(date +'%s')
FIVE_MINS=$(($NOW + 300))
HEADER="{\"alg\": \"HS256\",\"typ\": \"JWT\", \"kid\": \"$ID\"}"
PAYLOAD="{\"iat\":$NOW,\"exp\":$FIVE_MINS,\"aud\": \"/admin/\"}"

# Helper function for performing base64 URL encoding
base64_url_encode() {
    declare input=${1:-$(</dev/stdin)}
    # Use `tr` to URL encode the output from base64.
    printf '%s' "${input}" | base64 | tr -d '=' | tr '+' '-' | tr '/' '_' | tr -d '\n' 
}
# Prepare the token body
header_base64=$(base64_url_encode "$HEADER")
payload_base64=$(base64_url_encode "$PAYLOAD")

header_payload="${header_base64}.${payload_base64}"

# Create the signature
signature=$(printf '%s' "${header_payload}" | openssl dgst -binary -sha256 -mac HMAC -macopt hexkey:$SECRET | base64_url_encode)

# Concat payload and signature into a valid JWT token

TOKEN="${header_payload}.${signature}"

echo "-------------------------------------------------------------------------------------------------------------------"
echo "Uploading and activating randol for ${GHOST_HOST}"
echo "-------------------------------------------------------------------------------------------------------------------"
# Make an authenticated request to create a post
curl --silent --output /dev/null -w "Get token : %{http_code} \n" --show-error --fail --retry 3 -F "file=@./dist/randol.zip" -H "Authorization: Ghost $TOKEN" -H "Accept-Version: v3.0" ${GHOST_HOST}/ghost/api/admin/themes/upload \
&& curl --silent --output /dev/null -w "Upload theme : %{http_code} \n" --show-error --fail --retry 3 -X PUT -H "Authorization: Ghost $TOKEN" -H "Accept-Version: v3.0" "${GHOST_HOST}/ghost/api/admin/themes/randol/activate"

#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/gh-set-secrets.sh <owner/repo> .env
# Requires: GitHub CLI (gh) logged in with repo admin rights

REPO="${1:-}"
ENV_FILE="${2:-}"

if [ -z "$REPO" ] || [ -z "$ENV_FILE" ]; then
  echo "Usage: $0 <owner/repo> <env_file>"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Env file not found: $ENV_FILE"
  exit 1
fi

function set_secret() {
  local key="$1"
  local val="$2"
  if [ -z "$val" ]; then
    echo "Skip $key (empty)"
  else
    echo "Setting secret: $key"
    echo -n "$val" | gh secret set "$key" --repo "$REPO" --body - >/dev/null
  fi
}

# Load .env lines KEY=VALUE (ignore comments)
while IFS='=' read -r k v; do
  [[ "$k" =~ ^#.*$ || -z "$k" ]] && continue
  # Trim quotes
  v="${v%\r}"
  v="${v%\n}"
  v="${v%\"}"
  v="${v#\"}"
  case "$k" in
    DATABASE_URL|JWT_SECRET|OPENROUTER_API_KEY|OPENAI_API_KEY|AI_PROVIDER|AI_MODEL|AAVE_RPC_URL|AAVE_NETWORK|AAVE_POOL_ADDRESS_PROVIDER|OBP_BASE_URL|OBP_CONSUMER_KEY|OBP_CONSUMER_SECRET|OBP_USERNAME|OBP_PASSWORD|STRIPE_API_KEY|STRIPE_WEBHOOK_SECRET)
      set_secret "$k" "$v" ;;
    *) ;;
  esac
done < "$ENV_FILE"

echo "Done."


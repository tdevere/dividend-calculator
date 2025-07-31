#!/bin/bash

# Manual deployment script for Dividend Calculator
# Usage: ./deploy-manual.sh [environment] [--force]

set -e

ENVIRONMENT="production"
FORCE_DEPLOY="false"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        production|staging)
            ENVIRONMENT="$1"
            shift
            ;;
        --force|-f)
            FORCE_DEPLOY="true"
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [production|staging] [--force]"
            echo ""
            echo "Options:"
            echo "  production|staging  Target environment (default: production)"
            echo "  --force, -f         Force deployment even if no changes detected"
            echo "  --help, -h          Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo "🚀 Manual Deployment Script for Dividend Calculator"
echo "================================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   https://cli.github.com/"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ This script must be run from the root of the git repository."
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
    echo "⚠️  You're not on the main/master branch."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 0
    fi
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  You have uncommitted changes:"
    git status --short
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled. Commit your changes first."
        exit 0
    fi
fi

# Push current changes if on main
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
    echo "📤 Pushing current changes to remote..."
    git push origin "$CURRENT_BRANCH"
fi

# Trigger manual deployment
echo "🚀 Triggering manual deployment..."
echo "   Environment: $ENVIRONMENT"
echo "   Force Deploy: $FORCE_DEPLOY"

if gh workflow run "Build and Deploy to Azure App Service" \
    -f environment="$ENVIRONMENT" \
    -f force_deploy="$FORCE_DEPLOY"; then
    
    echo ""
    echo "✅ Deployment workflow triggered successfully!"
    echo ""
    echo "📊 Monitor the deployment:"
    echo "  • GitHub Actions: https://github.com/tdevere/dividend-calculator/actions"
    echo "  • Azure Portal: https://portal.azure.com/"
    echo "  • Live Site: https://dividend-calculator-app.azurewebsites.net"
    echo ""
    echo "📋 To view workflow status:"
    echo "  gh run list --workflow='Build and Deploy to Azure App Service'"
else
    echo ""
    echo "❌ Failed to trigger deployment!"
    echo ""
    echo "🔧 Troubleshooting steps:"
    echo "1. Ensure you're authenticated: gh auth status"
    echo "2. Check workflows: gh workflow list"
    echo "3. Verify repository permissions"
    exit 1
fi

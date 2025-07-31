#!/bin/bash

# Azure CLI script to deploy Dividend Calculator to App Service
# Run this script after installing Azure CLI and logging in

# Configuration variables
RESOURCE_GROUP="dividend-calculator-rg"
APP_SERVICE_PLAN="dividend-calculator-plan"
WEB_APP_NAME="dividend-calculator-app"
LOCATION="eastus"
SKU="B1"
RUNTIME="NODE|20-lts"

echo "🚀 Starting Azure App Service deployment for Dividend Calculator..."

# Create resource group
echo "📦 Creating resource group: $RESOURCE_GROUP"
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service plan
echo "⚙️  Creating App Service plan: $APP_SERVICE_PLAN"
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku $SKU \
  --is-linux

# Create Web App
echo "🌐 Creating Web App: $WEB_APP_NAME"
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $WEB_APP_NAME \
  --runtime $RUNTIME \
  --deployment-local-git

# Configure App Settings
echo "⚙️  Configuring App Settings..."
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --settings \
    NODE_ENV=production \
    WEBSITE_NODE_DEFAULT_VERSION=~20 \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true \
    ENABLE_ORYX_BUILD=true \
    PRE_BUILD_COMMAND="npm ci" \
    BUILD_COMMAND="npm run build" \
    POST_BUILD_COMMAND="echo Build completed"

# Configure startup command
echo "🚀 Setting startup command..."
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --startup-file "npm start"

# Enable logging
echo "📝 Enabling application logging..."
az webapp log config \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --application-logging true \
  --level information

# Configure continuous deployment from GitHub
echo "🔄 Setting up GitHub deployment..."
echo "Note: You'll need to configure GitHub secrets manually:"
echo "1. AZURE_WEBAPP_NAME = $WEB_APP_NAME"
echo "2. AZURE_WEBAPP_PUBLISH_PROFILE = (download from Azure portal)"

# Get the publish profile
echo "📋 Getting publish profile..."
az webapp deployment list-publishing-profiles \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --xml > publish-profile.xml

echo "✅ Azure App Service setup complete!"
echo "🌐 Your app will be available at: https://$WEB_APP_NAME.azurewebsites.net"
echo ""
echo "Next steps:"
echo "1. Add GitHub secrets:"
echo "   - AZURE_WEBAPP_NAME: $WEB_APP_NAME"
echo "   - AZURE_WEBAPP_PUBLISH_PROFILE: (content of publish-profile.xml)"
echo "2. Push your code to GitHub main/master branch"
echo "3. GitHub Actions will automatically build and deploy your app"
echo ""
echo "To monitor deployment:"
echo "az webapp log tail --resource-group $RESOURCE_GROUP --name $WEB_APP_NAME"

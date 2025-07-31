# PowerShell script to deploy Dividend Calculator to Azure App Service
# Prerequisites: Install Azure CLI and login with 'az login'

param(
    [string]$ResourceGroup = "dividend-calculator-rg",
    [string]$AppServicePlan = "dividend-calculator-plan", 
    [string]$WebAppName = "dividend-calculator-app",
    [string]$Location = "eastus",
    [string]$Sku = "B1"
)

Write-Host "Starting Azure App Service deployment for Dividend Calculator..." -ForegroundColor Green

try {
    # Create resource group
    Write-Host "Creating resource group: $ResourceGroup" -ForegroundColor Yellow
    az group create --name $ResourceGroup --location $Location

    # Create App Service plan
    Write-Host "Creating App Service plan: $AppServicePlan" -ForegroundColor Yellow
    az appservice plan create --name $AppServicePlan --resource-group $ResourceGroup --location $Location --sku $Sku --is-linux

    # Create Web App
    Write-Host "Creating Web App: $WebAppName" -ForegroundColor Yellow
    az webapp create --resource-group $ResourceGroup --plan $AppServicePlan --name $WebAppName --runtime "NODE:20-lts" --deployment-local-git

    # Configure App Settings
    Write-Host "Configuring App Settings..." -ForegroundColor Yellow
    az webapp config appsettings set --resource-group $ResourceGroup --name $WebAppName --settings NODE_ENV=production WEBSITE_NODE_DEFAULT_VERSION=~20 SCM_DO_BUILD_DURING_DEPLOYMENT=true ENABLE_ORYX_BUILD=true PRE_BUILD_COMMAND="npm ci" BUILD_COMMAND="npm run build"

    # Configure startup command
    Write-Host "Setting startup command..." -ForegroundColor Yellow
    az webapp config set --resource-group $ResourceGroup --name $WebAppName --startup-file "npm start"

    # Enable logging
    Write-Host "Enabling application logging..." -ForegroundColor Yellow
    az webapp log config --resource-group $ResourceGroup --name $WebAppName --application-logging filesystem --level information

    # Get the publish profile
    Write-Host "Getting publish profile..." -ForegroundColor Yellow
    $publishProfile = az webapp deployment list-publishing-profiles --resource-group $ResourceGroup --name $WebAppName --xml

    # Save publish profile to file
    $publishProfile | Out-File -FilePath "publish-profile.xml" -Encoding UTF8

    Write-Host "Azure App Service setup complete!" -ForegroundColor Green
    Write-Host "Your app will be available at: https://$WebAppName.azurewebsites.net" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Add GitHub secrets:" -ForegroundColor White
    Write-Host "   - AZURE_WEBAPP_NAME: $WebAppName" -ForegroundColor Gray
    Write-Host "   - AZURE_WEBAPP_PUBLISH_PROFILE: (content of publish-profile.xml)" -ForegroundColor Gray
    Write-Host "2. Push your code to GitHub main/master branch" -ForegroundColor White
    Write-Host "3. GitHub Actions will automatically build and deploy your app" -ForegroundColor White
    Write-Host ""
    Write-Host "To monitor deployment:" -ForegroundColor Yellow
    Write-Host "az webapp log tail --resource-group $ResourceGroup --name $WebAppName" -ForegroundColor Gray

} catch {
    Write-Host "Error occurred during deployment: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

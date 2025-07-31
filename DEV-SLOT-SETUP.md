# 🚀 Azure Development Slot Setup Guide

## ✅ What's Already Done

1. **✅ Upgraded to Standard S1 SKU** ($56/month - enables deployment slots)
2. **✅ Created Development Slot** 
   - URL: `https://dividend-calculator-app-dev.azurewebsites.net`
   - Slot name: `dev`
3. **✅ Created Feature Deployment Workflow** (`.github/workflows/feature-deploy.yml`)

## 🔧 Next Steps - Add GitHub Secret

You need to add the development slot publish profile as a GitHub secret:

### 1. Copy the Publish Profile

The dev slot publish profile was generated above. Copy this XML content:

```xml
<publishData><publishProfile profileName="dividend-calculator-app-dev - Web Deploy" publishMethod="MSDeploy" publishUrl="dividend-calculator-app-dev.scm.azurewebsites.net:443" msdeploySite="dividend-calculator-app__dev" userName="$dividend-calculator-app__dev" userPWD="MSgwu9aGyCfixx0jGp1e8GrH2S8LXgf0pXtFTbuyRCRc1hk41rrW4nLfg75H" destinationAppUrl="http://dividend-calculator-app-dev.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile><publishProfile profileName="dividend-calculator-app-dev - FTP" publishMethod="FTP" publishUrl="ftps://waws-prod-blu-413.ftp.azurewebsites.windows.net/site/wwwroot" ftpPassiveMode="True" userName="dividend-calculator-app__dev\$dividend-calculator-app__dev" userPWD="MSgwu9aGyCfixx0jGp1e8GrH2S8LXgf0pXtFTbuyRCRc1hk41rrW4nLfg75H" destinationAppUrl="http://dividend-calculator-app-dev.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile><publishProfile profileName="dividend-calculator-app-dev - Zip Deploy" publishMethod="ZipDeploy" publishUrl="dividend-calculator-app-dev.scm.azurewebsites.net:443" userName="$dividend-calculator-app__dev" userPWD="MSgwu9aGyCfixx0jGp1e8GrH2S8LXgf0pXtFTbuyRCRc1hk41rrW4nLfg75H" destinationAppUrl="http://dividend-calculator-app-dev.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile></publishData>
```

### 2. Add to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/tdevere/dividend-calculator`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Set:
   - **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE_DEV`
   - **Value**: Paste the entire XML content above

## 🎯 How It Works

### **Automatic Deployment**
- **Trigger**: Any push to `feature/*` branches (like your current `feature/ExportFunctionality-1753999627`)
- **Target**: Development slot (`https://dividend-calculator-app-dev.azurewebsites.net`)
- **Process**: Build → Test → Deploy → Notify

### **Public Testing**
- ✅ **Live URL**: Anyone can access the dev slot to test features
- ✅ **Real Environment**: Same as production but isolated
- ✅ **PR Comments**: Automatic links posted to pull requests
- ✅ **Zero Downtime**: Production remains unaffected

### **Deployment Workflow**
```
Feature Branch Push → GitHub Actions → Build & Test → Deploy to Dev Slot → Add PR Comment
```

## 🚀 Test the Setup

Once you add the GitHub secret, push any change to your current feature branch:

```bash
# Make a small change and push
git add -A
git commit -m "Test dev slot deployment"
git push origin feature/ExportFunctionality-1753999627
```

This will trigger the workflow and deploy to: `https://dividend-calculator-app-dev.azurewebsites.net`

## 💰 Cost Impact

- **Previous**: B1 Basic (~$13/month)
- **New**: S1 Standard (~$56/month)
- **Benefits**: 5 deployment slots, better performance, auto-scaling

## 🔄 Slot Management Commands

```bash
# List all slots
az webapp deployment slot list --resource-group dividend-calculator-rg --name dividend-calculator-app --output table

# Swap slots (promote dev to production)
az webapp deployment slot swap --resource-group dividend-calculator-rg --name dividend-calculator-app --slot dev --target-slot production

# Delete a slot
az webapp deployment slot delete --resource-group dividend-calculator-rg --name dividend-calculator-app --slot dev
```

## 🎉 Benefits Achieved

1. **✅ Public Testing**: Share `https://dividend-calculator-app-dev.azurewebsites.net` with anyone
2. **✅ Automatic Deployment**: Feature branches deploy automatically
3. **✅ Safe Testing**: Production remains unaffected
4. **✅ Easy Promotion**: Swap slots to promote features
5. **✅ PR Integration**: Automatic comments with live links

Your automated feature development workflow now includes live public testing! 🚀

# 🚀 Azure App Service Deployment Guide

This guide will help you deploy your Dividend Calculator to Microsoft Azure App Service with automated CI/CD using GitHub Actions.

## Prerequisites

1. **Azure Account**: [Create a free Azure account](https://azure.microsoft.com/free/)
2. **GitHub Account**: Repository for your code
3. **Azure CLI**: [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

## 🎯 Deployment Options

### Option 1: Automated Deployment with GitHub Actions (Recommended)

#### Step 1: Setup Azure Resources

1. **Install and login to Azure CLI**:
   ```bash
   az login
   ```

2. **Run the deployment script**:
   
   **Windows (PowerShell):**
   ```powershell
   .\deploy-azure.ps1
   ```
   
   **Linux/Mac:**
   ```bash
   chmod +x deploy-azure.sh
   ./deploy-azure.sh
   ```

#### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

   | Secret Name | Value | Description |
   |-------------|-------|-------------|
   | `AZURE_WEBAPP_NAME` | `dividend-calculator-app` | Your Azure App Service name |
   | `AZURE_WEBAPP_PUBLISH_PROFILE` | Content of `publish-profile.xml` | Azure publish profile |

#### Step 3: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Dividend Calculator"
   ```

2. **Add GitHub remote and push**:
   ```bash
   git remote add origin https://github.com/yourusername/dividend-calculator.git
   git branch -M main
   git push -u origin main
   ```

3. **GitHub Actions will automatically**:
   - Build your application
   - Run tests and linting
   - Deploy to Azure App Service
   - Monitor the deployment in the **Actions** tab

### Option 2: Manual Deployment

#### Using Azure CLI

```bash
# Build the application locally
npm run build

# Deploy using Azure CLI
az webapp up \
  --resource-group dividend-calculator-rg \
  --name dividend-calculator-app \
  --runtime "NODE|20-lts" \
  --location eastus
```

#### Using VS Code Azure Extension

1. Install **Azure App Service** extension in VS Code
2. Sign in to Azure account
3. Right-click on the `src` folder
4. Select **Deploy to Web App**
5. Follow the deployment wizard

### Option 3: Docker Container Deployment

#### Step 1: Build Docker Image

```bash
# Build the Docker image
docker build -t dividend-calculator .

# Test locally
docker run -p 3000:8080 dividend-calculator
```

#### Step 2: Deploy to Azure Container Instances

```bash
# Create container registry
az acr create \
  --resource-group dividend-calculator-rg \
  --name dividendcalculatorregistry \
  --sku Basic

# Build and push to registry
az acr build \
  --registry dividendcalculatorregistry \
  --image dividend-calculator:latest .

# Deploy container
az container create \
  --resource-group dividend-calculator-rg \
  --name dividend-calculator-container \
  --image dividendcalculatorregistry.azurecr.io/dividend-calculator:latest \
  --cpu 1 \
  --memory 1.5 \
  --ports 8080
```

## 🔧 Configuration

### Environment Variables

Set these in Azure App Service **Configuration** → **Application settings**:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `WEBSITE_NODE_DEFAULT_VERSION` | `~20` | Node.js version |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `true` | Enable build during deployment |
| `ENABLE_ORYX_BUILD` | `true` | Enable Oryx build system |
| `PRE_BUILD_COMMAND` | `npm ci` | Command before build |
| `BUILD_COMMAND` | `npm run build` | Build command |

### Custom Domain (Optional)

1. Purchase domain from Azure or external provider
2. In Azure portal: **App Service** → **Custom domains**
3. Add custom domain and configure DNS
4. Enable SSL certificate

### Monitoring and Logging

1. **Enable Application Insights**:
   ```bash
   az extension add --name application-insights
   az monitor app-insights component create \
     --app dividend-calculator-insights \
     --location eastus \
     --resource-group dividend-calculator-rg
   ```

2. **Enable detailed logging**:
   - Go to Azure portal → App Service → **Monitoring** → **App Service logs**
   - Enable **Application logging** and **Web server logging**

3. **View logs**:
   ```bash
   az webapp log tail --resource-group dividend-calculator-rg --name dividend-calculator-app
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Review build logs in Azure portal

2. **Runtime Errors**:
   - Check Application Insights for detailed errors
   - Verify environment variables
   - Review App Service logs

3. **Performance Issues**:
   - Consider upgrading to higher SKU (S1, P1V2)
   - Enable Application Insights performance monitoring
   - Optimize build output with `output: 'standalone'`

### Useful Commands

```bash
# Check deployment status
az webapp deployment operation list --resource-group dividend-calculator-rg --name dividend-calculator-app

# Restart app service
az webapp restart --resource-group dividend-calculator-rg --name dividend-calculator-app

# Stream logs
az webapp log tail --resource-group dividend-calculator-rg --name dividend-calculator-app

# Get app URL
az webapp show --resource-group dividend-calculator-rg --name dividend-calculator-app --query defaultHostName --output tsv
```

## 💰 Cost Optimization

- **B1 Basic Plan**: ~$13/month (included in Azure free tier)
- **S1 Standard Plan**: ~$56/month (better performance)
- **P1V2 Premium**: ~$116/month (production workloads)

### Free Tier Benefits

- 10 web apps
- 1 GB storage
- Custom domains
- SSL certificates
- Auto-scaling (manual)

## 🔒 Security Best Practices

1. **Enable HTTPS only**
2. **Configure firewall rules**
3. **Use managed identity for Azure resources**
4. **Enable security headers** (configured in `next.config.ts`)
5. **Regular security updates** via GitHub Dependabot

## 📊 Monitoring Your App

- **Application URL**: `https://dividend-calculator-app.azurewebsites.net`
- **Azure Portal**: Monitor performance, logs, and metrics
- **Application Insights**: Detailed telemetry and analytics
- **GitHub Actions**: Build and deployment status

## 🎉 Success!

Your Dividend Calculator is now live on Azure App Service with automated CI/CD! Every push to the main branch will trigger a new deployment.

### Next Steps

1. Configure custom domain and SSL
2. Set up monitoring and alerts
3. Implement user authentication (optional)
4. Add more dividend stocks and features
5. Set up staging environment

Need help? Check the [Azure App Service documentation](https://docs.microsoft.com/en-us/azure/app-service/) or create an issue in your GitHub repository.

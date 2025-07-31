# 🚀 Quick Setup Script for Dividend Calculator Azure Deployment
# PowerShell version for Windows users

param(
    [switch]$SkipAzure,
    [switch]$Help
)

# Colors for output
$Host.UI.RawUI.ForegroundColor = "White"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Show-Help {
    Write-Host "🎯 Dividend Calculator - Quick Setup Script" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\quick-setup.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -SkipAzure    Skip Azure deployment steps"
    Write-Host "  -Help         Show this help message"
    Write-Host ""
    Write-Host "This script will:"
    Write-Host "  1. Check dependencies (Node.js, npm, Git)"
    Write-Host "  2. Install project dependencies"
    Write-Host "  3. Build and test the project"
    Write-Host "  4. Setup Git repository"
    Write-Host "  5. Optionally deploy to Azure"
    Write-Host ""
}

function Test-Command {
    param([string]$Command)
    try {
        $null = Get-Command $Command -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

function Test-Dependencies {
    Write-Status "Checking dependencies..."
    
    $dependencies = @("node", "npm", "git")
    $missing = @()
    
    foreach ($dep in $dependencies) {
        if (-not (Test-Command $dep)) {
            $missing += $dep
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Error-Custom "Missing dependencies: $($missing -join ', ')"
        Write-Host ""
        Write-Host "Please install the missing dependencies:"
        foreach ($dep in $missing) {
            switch ($dep) {
                "node" { Write-Host "  - Node.js: https://nodejs.org/" }
                "npm" { Write-Host "  - npm: Usually installed with Node.js" }
                "git" { Write-Host "  - Git: https://git-scm.com/" }
            }
        }
        exit 1
    }
    
    Write-Success "All dependencies are installed!"
}

function Install-Dependencies {
    Write-Status "Installing project dependencies..."
    
    try {
        npm ci
        if ($LASTEXITCODE -ne 0) {
            throw "npm ci failed"
        }
        Write-Success "Dependencies installed!"
    }
    catch {
        Write-Error-Custom "Failed to install dependencies: $_"
        exit 1
    }
}

function Build-Project {
    Write-Status "Building the project..."
    
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "Build failed"
        }
        Write-Success "Project built successfully!"
    }
    catch {
        Write-Error-Custom "Failed to build project: $_"
        exit 1
    }
}

function Test-Project {
    Write-Status "Running tests and linting..."
    
    try {
        npm run lint
        if ($LASTEXITCODE -ne 0) {
            throw "Linting failed"
        }
        Write-Success "All tests passed!"
    }
    catch {
        Write-Error-Custom "Tests failed: $_"
        exit 1
    }
}

function Initialize-Git {
    Write-Status "Setting up Git repository..."
    
    if (-not (Test-Path ".git")) {
        try {
            git init
            git add .
            git commit -m "Initial commit: Dividend Calculator Azure deployment setup"
            Write-Success "Git repository initialized!"
        }
        catch {
            Write-Error-Custom "Failed to initialize Git repository: $_"
            exit 1
        }
    }
    else {
        Write-Warning "Git repository already exists."
    }
}

function Test-AzureCLI {
    Write-Status "Checking Azure CLI..."
    
    if (-not (Test-Command "az")) {
        Write-Warning "Azure CLI is not installed."
        Write-Status "You can install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        
        if (-not $SkipAzure) {
            $response = Read-Host "Continue without Azure CLI? (y/n)"
            if ($response -ne "y" -and $response -ne "Y") {
                exit 1
            }
        }
        return $false
    }
    
    Write-Success "Azure CLI is available!"
    
    # Check if logged in
    try {
        $null = az account show 2>$null
        Write-Success "Azure CLI is ready!"
        return $true
    }
    catch {
        if (-not $SkipAzure) {
            Write-Status "Please log in to Azure..."
            az login
            return $true
        }
        return $false
    }
}

function Deploy-ToAzure {
    param([bool]$AzureAvailable)
    
    if ($SkipAzure) {
        Write-Warning "Skipping Azure deployment (SkipAzure flag set)"
        return
    }
    
    if ($AzureAvailable) {
        $response = Read-Host "Do you want to deploy to Azure now? (y/n)"
        if ($response -eq "y" -or $response -eq "Y") {
            Write-Status "Running Azure deployment script..."
            try {
                .\deploy-azure.ps1
                Write-Success "Azure deployment completed!"
            }
            catch {
                Write-Error-Custom "Azure deployment failed: $_"
            }
        }
    }
    else {
        Write-Warning "Skipping Azure deployment (Azure CLI not available or not logged in)"
    }
}

function Show-NextSteps {
    Write-Host ""
    Write-Success "🎉 Setup completed successfully!"
    Write-Host ""
    
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Create a GitHub repository and push your code:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/yourusername/dividend-calculator.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Configure GitHub Secrets for Azure deployment:" -ForegroundColor White
    Write-Host "   - AZURE_WEBAPP_NAME" -ForegroundColor Gray
    Write-Host "   - AZURE_WEBAPP_PUBLISH_PROFILE" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Deploy to Azure (if not done already):" -ForegroundColor White
    Write-Host "   .\deploy-azure.ps1" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Check the DEPLOYMENT.md file for detailed instructions" -ForegroundColor White
    Write-Host ""
    
    Write-Success "Your Dividend Calculator is ready! 🚀"
    Write-Host "Local development: npm run dev" -ForegroundColor Cyan
    Write-Host "Documentation: See DEPLOYMENT.md for full deployment guide" -ForegroundColor Cyan
}

# Main execution
function Main {
    if ($Help) {
        Show-Help
        return
    }
    
    Write-Host ""
    Write-Status "Starting quick setup process..."
    Write-Host ""
    
    try {
        Test-Dependencies
        Install-Dependencies
        Build-Project
        Test-Project
        Initialize-Git
        
        $azureAvailable = Test-AzureCLI
        Deploy-ToAzure -AzureAvailable $azureAvailable
        
        Show-NextSteps
    }
    catch {
        Write-Error-Custom "Setup failed: $_"
        exit 1
    }
}

# Run the main function
Main

#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Manual deployment script for Dividend Calculator

.DESCRIPTION
    This script provides easy commands to deploy the application manually
    without triggering deployment on every push.

.PARAMETER Environment
    Target environment for deployment (production or staging)

.PARAMETER Force
    Force deployment even if no changes detected

.EXAMPLE
    .\deploy-manual.ps1 -Environment production
    .\deploy-manual.ps1 -Force
#>

param(
    [Parameter()]
    [ValidateSet("production", "staging")]
    [string]$Environment = "production",
    
    [Parameter()]
    [switch]$Force
)

Write-Host "🚀 Manual Deployment Script for Dividend Calculator" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Check if gh CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI (gh) is not installed. Please install it first: https://cli.github.com/"
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Error "This script must be run from the root of the git repository."
    exit 1
}

# Get current branch and check if it's main
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Warning "You're not on the main/master branch. Consider switching to main first."
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "Deployment cancelled." -ForegroundColor Red
        exit 0
    }
}

# Check for uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "You have uncommitted changes:"
    git status --short
    $continue = Read-Host "Continue with deployment? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "Deployment cancelled. Commit your changes first." -ForegroundColor Red
        exit 0
    }
}

# Push current changes if on main
if ($currentBranch -eq "main" -or $currentBranch -eq "master") {
    Write-Host "Pushing current changes to remote..." -ForegroundColor Green
    git push origin $currentBranch
}

# Trigger manual deployment
Write-Host "Triggering manual deployment..." -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Cyan
Write-Host "Force Deploy: $($Force.IsPresent)" -ForegroundColor Cyan

try {
    if ($Force) {
        gh workflow run "Build and Deploy to Azure App Service" -f environment=$Environment -f force_deploy=true
    } else {
        gh workflow run "Build and Deploy to Azure App Service" -f environment=$Environment -f force_deploy=false
    }
    
    Write-Host "✅ Deployment workflow triggered successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Monitor the deployment:" -ForegroundColor Yellow
    Write-Host "  • GitHub Actions: https://github.com/tdevere/dividend-calculator/actions" -ForegroundColor Cyan
    Write-Host "  • Azure Portal: https://portal.azure.com/" -ForegroundColor Cyan
    Write-Host "  • Live Site: https://dividend-calculator-app.azurewebsites.net" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To view workflow status:" -ForegroundColor Yellow
    Write-Host "  gh run list --workflow='Build and Deploy to Azure App Service'" -ForegroundColor Gray
    
} catch {
    Write-Error "Failed to trigger deployment: $_"
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Ensure you're authenticated with GitHub CLI: gh auth status" -ForegroundColor Gray
    Write-Host "2. Check if the workflow exists: gh workflow list" -ForegroundColor Gray
    Write-Host "3. Verify repository permissions" -ForegroundColor Gray
}

#!/bin/bash

# 🚀 Quick Setup Script for Dividend Calculator Azure Deployment
# This script helps you quickly set up your development environment and deploy to Azure

set -e  # Exit on any error

echo "🎯 Dividend Calculator - Quick Setup"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required commands exist
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or later."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git."
        exit 1
    fi
    
    print_success "All dependencies are installed!"
}

# Install project dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    npm ci
    print_success "Dependencies installed!"
}

# Build the project
build_project() {
    print_status "Building the project..."
    npm run build
    print_success "Project built successfully!"
}

# Run tests
run_tests() {
    print_status "Running tests and linting..."
    npm run lint
    print_success "All tests passed!"
}

# Setup Git repository
setup_git() {
    print_status "Setting up Git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: Dividend Calculator Azure deployment setup"
        print_success "Git repository initialized!"
    else
        print_warning "Git repository already exists."
    fi
}

# Check Azure CLI
check_azure_cli() {
    print_status "Checking Azure CLI..."
    
    if ! command -v az &> /dev/null; then
        print_warning "Azure CLI is not installed."
        print_status "You can install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        read -p "Continue without Azure CLI? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        print_success "Azure CLI is available!"
        
        # Check if logged in
        if ! az account show &> /dev/null; then
            print_status "Please log in to Azure..."
            az login
        fi
        
        print_success "Azure CLI is ready!"
    fi
}

# Deploy to Azure
deploy_to_azure() {
    if command -v az &> /dev/null && az account show &> /dev/null; then
        print_status "Do you want to deploy to Azure now? (y/n)"
        read -p "Deploy to Azure? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Running Azure deployment script..."
            chmod +x deploy-azure.sh
            ./deploy-azure.sh
        fi
    else
        print_warning "Skipping Azure deployment (Azure CLI not available or not logged in)"
    fi
}

# Main setup process
main() {
    echo ""
    print_status "Starting quick setup process..."
    echo ""
    
    check_dependencies
    install_dependencies
    build_project
    run_tests
    setup_git
    check_azure_cli
    
    echo ""
    print_success "🎉 Setup completed successfully!"
    echo ""
    
    echo "Next steps:"
    echo "1. Create a GitHub repository and push your code:"
    echo "   git remote add origin https://github.com/yourusername/dividend-calculator.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "2. Configure GitHub Secrets for Azure deployment:"
    echo "   - AZURE_WEBAPP_NAME"
    echo "   - AZURE_WEBAPP_PUBLISH_PROFILE"
    echo ""
    echo "3. Deploy to Azure (if not done already):"
    echo "   ./deploy-azure.sh"
    echo ""
    echo "4. Check the DEPLOYMENT.md file for detailed instructions"
    echo ""
    
    deploy_to_azure
    
    echo ""
    print_success "Your Dividend Calculator is ready! 🚀"
    echo "Local development: npm run dev"
    echo "Documentation: See DEPLOYMENT.md for full deployment guide"
}

# Run main function
main "$@"

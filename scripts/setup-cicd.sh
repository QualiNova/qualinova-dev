#!/bin/bash

# Qualinova CI/CD Setup Script
# This script helps set up the CI/CD pipeline for the Qualinova project

set -e

echo "🚀 Qualinova CI/CD Setup Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "This script must be run from the root of a git repository"
    exit 1
fi

# Check if GitHub Actions directory exists
if [ ! -d ".github/workflows" ]; then
    print_error "GitHub Actions workflows not found. Please ensure the CI/CD workflows are properly set up."
    exit 1
fi

print_status "Git repository detected"
print_status "GitHub Actions workflows found"

# Check for required files
required_files=(
    ".github/workflows/ci.yml"
    ".github/workflows/deploy-staging.yml"
    ".github/workflows/deploy-production.yml"
    ".github/workflows/security-scan.yml"
    "package.json"
    "turbo.json"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "Found $file"
    else
        print_error "Missing required file: $file"
        exit 1
    fi
done

echo ""
print_info "CI/CD Pipeline Configuration"
echo "================================"

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
else
    print_warning "Node.js not found. Please install Node.js 18 or later."
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm version: $NPM_VERSION"
else
    print_warning "npm not found. Please install npm."
fi

# Check Rust
if command -v rustc &> /dev/null; then
    RUST_VERSION=$(rustc --version)
    print_status "Rust version: $RUST_VERSION"
else
    print_warning "Rust not found. Please install Rust 1.75 or later."
fi

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    print_status "Node dependencies installed"
else
    print_warning "Node dependencies not installed. Run 'npm install' to install them."
fi

echo ""
print_info "Required GitHub Secrets"
echo "==========================="

echo "The following secrets need to be configured in your GitHub repository:"
echo ""
echo "Frontend Deployment (Vercel):"
echo "  - VERCEL_TOKEN"
echo "  - VERCEL_ORG_ID"
echo "  - VERCEL_PROJECT_ID"
echo ""
echo "Environment URLs:"
echo "  - STAGING_API_URL"
echo "  - PRODUCTION_API_URL"
echo ""
echo "Stellar Network Keys:"
echo "  - STELLAR_SECRET_KEY_TESTNET"
echo "  - STELLAR_SECRET_KEY_FUTURENET"
echo ""

print_info "Setup Instructions"
echo "===================="

echo "1. Go to your GitHub repository settings"
echo "2. Navigate to 'Settings' → 'Secrets and variables' → 'Actions'"
echo "3. Add the required secrets listed above"
echo "4. Go to 'Settings' → 'Environments'"
echo "5. Create 'staging' and 'production' environments"
echo "6. Add required reviewers for production deployments"
echo "7. Go to 'Settings' → 'Branches'"
echo "8. Set up branch protection rules for 'main' and 'develop'"
echo ""

print_info "Testing the Setup"
echo "===================="

echo "To test your CI/CD setup:"
echo "1. Create a feature branch: git checkout -b feature/test-cicd"
echo "2. Make a small change to any file"
echo "3. Commit and push: git commit -am 'test: CI/CD setup' && git push"
echo "4. Create a pull request to 'develop'"
echo "5. Check the 'Actions' tab to see the CI pipeline running"
echo ""

print_info "Vercel Setup"
echo "=============="

echo "To set up Vercel deployment:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Navigate to frontend: cd apps/qualinova-frontend"
echo "3. Link project: vercel link"
echo "4. Get project details from Vercel dashboard"
echo "5. Add the Vercel secrets to GitHub"
echo ""

print_info "Stellar Setup"
echo "================"

echo "To set up Stellar deployment:"
echo "1. Install Soroban CLI: curl -sSL https://soroban.stellar.org/install | sh"
echo "2. Generate testnet and futurenet keys"
echo "3. Fund the accounts with test XLM"
echo "4. Add the secret keys to GitHub secrets"
echo ""

print_status "Setup script completed!"
echo ""
print_warning "Remember to:"
echo "- Configure all required secrets in GitHub"
echo "- Set up branch protection rules"
echo "- Test the pipeline with a pull request"
echo "- Monitor the first few deployments"
echo ""

print_info "For detailed documentation, see: docs/CI-CD-SETUP.md"
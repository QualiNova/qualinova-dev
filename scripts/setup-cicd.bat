@echo off
setlocal enabledelayedexpansion

REM Qualinova CI/CD Setup Script for Windows
REM This script helps set up the CI/CD pipeline for the Qualinova project

echo 🚀 Qualinova CI/CD Setup Script
echo ================================

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ This script must be run from the root of a git repository
    exit /b 1
)

REM Check if GitHub Actions directory exists
if not exist ".github\workflows" (
    echo ❌ GitHub Actions workflows not found. Please ensure the CI/CD workflows are properly set up.
    exit /b 1
)

echo ✅ Git repository detected
echo ✅ GitHub Actions workflows found

REM Check for required files
set "required_files=.github\workflows\ci.yml .github\workflows\deploy-staging.yml .github\workflows\deploy-production.yml .github\workflows\security-scan.yml package.json turbo.json"

for %%f in (%required_files%) do (
    if exist "%%f" (
        echo ✅ Found %%f
    ) else (
        echo ❌ Missing required file: %%f
        exit /b 1
    )
)

echo.
echo ℹ️  CI/CD Pipeline Configuration
echo ================================

REM Check Node.js version
where node >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js version: !NODE_VERSION!
) else (
    echo ⚠️  Node.js not found. Please install Node.js 18 or later.
)

REM Check npm
where npm >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm version: !NPM_VERSION!
) else (
    echo ⚠️  npm not found. Please install npm.
)

REM Check Rust
where rustc >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('rustc --version') do set RUST_VERSION=%%i
    echo ✅ Rust version: !RUST_VERSION!
) else (
    echo ⚠️  Rust not found. Please install Rust 1.75 or later.
)

REM Check if dependencies are installed
if exist "node_modules" (
    echo ✅ Node dependencies installed
) else (
    echo ⚠️  Node dependencies not installed. Run 'npm install' to install them.
)

echo.
echo ℹ️  Required GitHub Secrets
echo ===========================

echo The following secrets need to be configured in your GitHub repository:
echo.
echo Frontend Deployment (Vercel):
echo   - VERCEL_TOKEN
echo   - VERCEL_ORG_ID
echo   - VERCEL_PROJECT_ID
echo.
echo Environment URLs:
echo   - STAGING_API_URL
echo   - PRODUCTION_API_URL
echo.
echo Stellar Network Keys:
echo   - STELLAR_SECRET_KEY_TESTNET
echo   - STELLAR_SECRET_KEY_FUTURENET
echo.

echo ℹ️  Setup Instructions
echo ====================

echo 1. Go to your GitHub repository settings
echo 2. Navigate to 'Settings' → 'Secrets and variables' → 'Actions'
echo 3. Add the required secrets listed above
echo 4. Go to 'Settings' → 'Environments'
echo 5. Create 'staging' and 'production' environments
echo 6. Add required reviewers for production deployments
echo 7. Go to 'Settings' → 'Branches'
echo 8. Set up branch protection rules for 'main' and 'develop'
echo.

echo ℹ️  Testing the Setup
echo ====================

echo To test your CI/CD setup:
echo 1. Create a feature branch: git checkout -b feature/test-cicd
echo 2. Make a small change to any file
echo 3. Commit and push: git commit -am "test: CI/CD setup" ^&^& git push
echo 4. Create a pull request to 'develop'
echo 5. Check the 'Actions' tab to see the CI pipeline running
echo.

echo ℹ️  Vercel Setup
echo ===============

echo To set up Vercel deployment:
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Navigate to frontend: cd apps\qualinova-frontend
echo 3. Link project: vercel link
echo 4. Get project details from Vercel dashboard
echo 5. Add the Vercel secrets to GitHub
echo.

echo ℹ️  Stellar Setup
echo ================

echo To set up Stellar deployment:
echo 1. Install Soroban CLI: curl -sSL https://soroban.stellar.org/install ^| sh
echo 2. Generate testnet and futurenet keys
echo 3. Fund the accounts with test XLM
echo 4. Add the secret keys to GitHub secrets
echo.

echo ✅ Setup script completed!
echo.
echo ⚠️  Remember to:
echo - Configure all required secrets in GitHub
echo - Set up branch protection rules
echo - Test the pipeline with a pull request
echo - Monitor the first few deployments
echo.

echo ℹ️  For detailed documentation, see: docs\CI-CD-SETUP.md

pause
# CI/CD Pipeline Documentation

## Overview

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline implemented for the Qualinova project using GitHub Actions.

## 🚀 Pipeline Architecture

The CI/CD pipeline consists of four main workflows:

1. **CI/CD Pipeline** (`ci.yml`) - Main continuous integration workflow
2. **Deploy to Staging** (`deploy-staging.yml`) - Staging environment deployment
3. **Deploy to Production** (`deploy-production.yml`) - Production environment deployment
4. **Security Scanning** (`security-scan.yml`) - Security and vulnerability scanning

## 📋 Workflow Details

### 1. CI/CD Pipeline (`ci.yml`)

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

- **Frontend CI**: Lint, test, and build the Next.js frontend
- **Contracts CI**: Build and test Rust smart contracts
- **Security Checks**: Run security audits and dependency checks
- **Build Summary**: Generate a summary of all CI results

**Features:**

- Parallel job execution for faster feedback
- Caching for npm and Rust dependencies
- Test coverage reporting
- Artifact uploads for test results

### 2. Deploy to Staging (`deploy-staging.yml`)

**Triggers:**

- Push to `develop` branch
- Successful completion of CI pipeline on `develop`

**Deployment:**

- Frontend: Deploy to Vercel staging environment
- Contracts: Deploy to Stellar testnet

**Environment Protection:**

- Requires manual approval for staging environment
- Automatic rollback on deployment failure

### 3. Deploy to Production (`deploy-production.yml`)

**Triggers:**

- Push to `main` branch
- Manual workflow dispatch
- Successful completion of CI pipeline on `main`

**Deployment:**

- Frontend: Deploy to Vercel production environment
- Contracts: Deploy to Stellar futurenet
- Automatic release tagging

**Safety Features:**

- Environment protection with required reviewers
- Manual approval gates
- Automatic release versioning

### 4. Security Scanning (`security-scan.yml`)

**Triggers:**

- Daily scheduled runs (2 AM UTC)
- Push to `main` or `develop` branches
- Pull requests
- Security advisories

**Scans:**

- NPM dependency vulnerability scanning
- Rust crate security auditing
- Code quality analysis
- Hardcoded secret detection

## 🔧 Required Secrets

Configure the following secrets in your GitHub repository settings:

### Frontend Deployment (Vercel)

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Environment URLs

```
STAGING_API_URL=https://staging-api.qualinova.com
PRODUCTION_API_URL=https://api.qualinova.com
```

### Stellar Network Keys

```
STELLAR_SECRET_KEY_TESTNET=your_testnet_secret_key
STELLAR_SECRET_KEY_FUTURENET=your_futurenet_secret_key
```

## 🛠️ Setup Instructions

### 1. Enable GitHub Actions

1. Go to your repository settings
2. Navigate to "Actions" → "General"
3. Enable "Allow all actions and reusable workflows"

### 2. Configure Environment Protection

1. Go to "Settings" → "Environments"
2. Create environments for `staging` and `production`
3. Add required reviewers for production deployments
4. Configure environment-specific secrets

### 3. Set Up Branch Protection

1. Go to "Settings" → "Branches"
2. Add branch protection rules for `main` and `develop`
3. Require status checks to pass before merging
4. Require pull request reviews

### 4. Configure Vercel Integration

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Get your project ID and tokens from Vercel dashboard

## 📊 Monitoring and Notifications

### GitHub Actions Dashboard

- View workflow runs in the "Actions" tab
- Monitor job status and logs
- Download artifacts for analysis

### Pull Request Checks

- Automatic status checks on PRs
- Security vulnerability comments
- Build summary in PR descriptions

### Deployment Notifications

- Success/failure notifications in workflow summaries
- Automatic release tagging for production deployments
- Environment URLs in deployment logs

## 🔄 Workflow Lifecycle

### Development Flow

1. Create feature branch from `develop`
2. Make changes and push to feature branch
3. Create pull request to `develop`
4. CI pipeline runs automatically
5. Security scans execute
6. After approval, merge to `develop`
7. Automatic deployment to staging

### Production Flow

1. Create pull request from `develop` to `main`
2. CI pipeline and security scans run
3. After approval, merge to `main`
4. Automatic deployment to production
5. Release tag created automatically

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**

- Check Node.js and Rust version compatibility
- Verify all dependencies are properly installed
- Review linting and test errors

**Deployment Failures:**

- Verify environment secrets are configured
- Check Vercel project settings
- Ensure Stellar network keys are valid

**Security Scan Failures:**

- Review vulnerability reports in artifacts
- Update dependencies with security patches
- Address hardcoded secrets in code

### Debugging Steps

1. Check workflow logs in GitHub Actions
2. Download and review artifacts
3. Test locally with the same Node.js/Rust versions
4. Verify environment variables and secrets

## 📈 Best Practices

### Code Quality

- Write comprehensive tests for all new features
- Maintain high test coverage
- Follow linting rules consistently
- Use TypeScript for type safety

### Security

- Regularly update dependencies
- Review security scan reports
- Never commit secrets to version control
- Use environment variables for configuration

### Deployment

- Test in staging before production
- Use feature flags for gradual rollouts
- Monitor application performance after deployment
- Keep deployment logs for audit trails

## 🔗 Related Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments)
- [Stellar Soroban Documentation](https://soroban.stellar.org/)
- [TurboRepo Documentation](https://turbo.build/repo/docs)

## 📞 Support

For issues with the CI/CD pipeline:

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Create an issue in the repository
4. Contact the development team

---

_Last updated: $(date)_

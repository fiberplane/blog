# GitHub Actions Workflows

This directory contains GitHub Actions workflows for building and deploying the Fiberplane documentation site to Cloudflare R2.

## Workflows

### `auto-deploy.yaml`
Automatically deploys to R2 when changes are pushed to the `main` branch.

**Trigger:** Push to `main`

### `manual-deploy.yaml`
Manually trigger a deployment to R2 from the GitHub Actions UI.

**Trigger:** Manual workflow dispatch

### `check.yaml`
Runs checks on pull requests to ensure the build succeeds.

**Trigger:** Pull requests to `main`

### `deploy.yaml`
Reusable workflow that handles the actual build and deploy process. Used by both auto and manual deploy workflows.

**Trigger:** Called by other workflows

## Required Secrets and Variables

To enable deployment, configure the following in your GitHub repository:

### Secrets (Settings → Secrets and variables → Actions → Secrets)

- `R2_SECRET_ACCESS_KEY` - Your Cloudflare R2 secret access key

### Variables (Settings → Secrets and variables → Actions → Variables)

- `R2_ACCOUNT_ID` - Your Cloudflare account ID
- `R2_ACCESS_KEY_ID` - Your Cloudflare R2 access key ID
- `R2_BUCKET_NAME` - The name of your R2 bucket (e.g., `fiberplane-docs`)

## Setup Instructions

### 1. Create R2 Bucket

1. Log in to Cloudflare dashboard
2. Navigate to R2 → Create bucket
3. Name your bucket (e.g., `fiberplane-docs`)
4. Note the bucket name

### 2. Generate R2 API Tokens

1. Navigate to R2 → Manage R2 API Tokens
2. Click "Create API token"
3. Set permissions: "Object Read & Write"
4. Select your bucket
5. Click "Create API Token"
6. Copy the Access Key ID and Secret Access Key

### 3. Get Account ID

1. In Cloudflare dashboard, click on your account name (top right)
2. Copy your Account ID from the right sidebar

### 4. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add `R2_SECRET_ACCESS_KEY` with your R2 secret access key

### 5. Configure GitHub Variables

1. In the same Actions settings page, click the "Variables" tab
2. Click "New repository variable"
3. Add the following variables:
   - `R2_ACCOUNT_ID` - Your Cloudflare account ID
   - `R2_ACCESS_KEY_ID` - Your R2 access key ID
   - `R2_BUCKET_NAME` - Your R2 bucket name

## Deployment Process

### Automatic Deployment

When you push to `main`:
1. GitHub Actions triggers `auto-deploy.yaml`
2. Workflow checks out code
3. Installs dependencies with pnpm
4. Builds the Astro site (`pnpm run build`)
5. Syncs the `dist/` directory to R2 using AWS CLI
6. Old files are deleted from R2 (`--delete` flag)

### Manual Deployment

1. Go to Actions tab in GitHub
2. Select "Manual Deploy" workflow
3. Click "Run workflow"
4. Select branch (usually `main`)
5. Click "Run workflow" button

## R2 Bucket Configuration

After deployment, configure your R2 bucket for public access:

### Enable Public Access

1. Go to your R2 bucket settings
2. Navigate to Settings → Public access
3. Enable "Allow Access"
4. Note the public URL (e.g., `https://pub-xxxxx.r2.dev`)

### Custom Domain (Optional)

1. Go to R2 bucket settings → Custom Domains
2. Click "Connect Domain"
3. Enter your domain (e.g., `docs.fiberplane.com`)
4. Follow DNS configuration instructions
5. Add CNAME record to your DNS provider

## Troubleshooting

### Deployment Fails

**Check workflow logs:**
1. Go to Actions tab
2. Click on failed workflow run
3. Expand failed step to see error

**Common issues:**
- Missing secrets/variables
- Invalid R2 credentials
- Bucket permissions
- Build failures

### Build Fails

Run locally to debug:
```bash
pnpm install
pnpm run build
```

### R2 Sync Issues

Verify credentials:
```bash
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
aws s3 ls s3://your-bucket-name \
  --endpoint-url https://your-account-id.r2.cloudflarestorage.com
```

## Local Testing

Test the build process locally before pushing:

```bash
# Install dependencies
pnpm install

# Run checks
pnpm run check

# Build site
pnpm run build

# Preview built site
pnpm run preview
```

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)

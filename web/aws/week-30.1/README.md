# week-30.1

## ECS Class

A simple Bun Express application with CPU-intensive endpoint for testing ECS deployment.

## Local Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## AWS ECS Deployment Guide

This guide covers deploying the Bun Express app to AWS ECS using Docker and ECR with complete manual setup.

### Prerequisites

1. **Install AWS CLI** (on macOS using Homebrew):
   ```bash
   brew install awscli
   ```

2. **Create IAM User for ECR Access**:
   - Go to AWS Console → IAM → Users
   - Create a new user (e.g., `ecr-user`)
   - Attach policy: `AmazonEC2ContainerRegistryFullAccess`
   - Generate Access Keys for programmatic access

3. **Configure AWS CLI**:
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID, Secret Access Key, region (e.g., `ap-south-1`), and output format. or leave empty if not given

### ECR Repository Setup

1. **Create ECR Repository** (Manual via AWS Console):
   - Go to AWS Console → ECR → Repositories
   - Click "Create repository"
   - Choose "Private" repository
   - Repository name: `your-username/your-app-name`
   - After creation, click on repository name
   - Click "View push commands" to get the deployment instructions

### Deployment Steps

The ECR console will provide these commands after repository creation:

1. **Authenticate Docker to ECR**:
   ```bash
   aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com
   ```

2. **Build Docker Image** (for Linux/AMD64 platform):
   ```bash
   docker build --platform=linux/amd64 -t <your-image-name> .
   ```

3. **Tag Image for ECR**:
   ```bash
   docker tag <your-image-name>:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:latest
   ```

4. **Push Image to ECR**:
   ```bash
   docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:latest
   ```

### ECS Cluster Setup (Manual)

1. **Create ECS Cluster**:
   - Go to AWS Console → ECS → Clusters
   - Click "Create Cluster"
   - Choose "EC2 Linux + Networking" or "Fargate"
   - Configure cluster settings (name, VPC, subnets)

2. **Create Task Definition**:
   - Go to ECS → Task Definitions → Create new Task Definition
   - Choose launch type (EC2 or Fargate)
   - Configure task:
     - **Image URI**: `<your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:latest`
     - **Port**: `3000`
     - **Memory/CPU**: Set appropriate limits
     - **Health Check**: Command `CMD-SHELL, curl -f http://localhost:3000/ || exit 1`

3. **Create Service**:
   - In your cluster, click "Create Service"
   - Select your task definition
   - Configure desired count, load balancer settings

### Load Balancer Setup

1. **Create Application Load Balancer**:
   - Go to EC2 → Load Balancers → Create Load Balancer
   - Choose "Application Load Balancer"
   - Configure:
     - **Scheme**: Internet-facing
     - **IP address type**: IPv4
     - **VPC**: Same as ECS cluster
     - **Subnets**: Select public subnets

2. **Configure Security Groups**:
   - Create security group for Load Balancer:
     - **Inbound**: HTTP (80), HTTPS (443) from 0.0.0.0/0
   - Create security group for ECS tasks:
     - **Inbound**: Port 3000 from Load Balancer security group

3. **Configure Target Group**:
   - **Target type**: IP addresses (for Fargate) or Instances (for EC2)
   - **Protocol**: HTTP
   - **Port**: 3000
   - **Health check path**: `/`

### SSL Certificate Configuration (Optional)

**Option 1: Request Certificate from AWS**:
- Go to Certificate Manager → Request Certificate
- Add domain name
- Choose DNS validation
- Add CNAME records to your domain's DNS

**Option 2: Import Existing Certificate**:
- Go to Certificate Manager → Import Certificate
- Upload certificate body, private key, and certificate chain

**Configure HTTPS Listener**:
- In Load Balancer → Listeners
- Add listener for HTTPS (443)
- Select your SSL certificate

### For Version Updates

1. **Build with version tag**:
   ```bash
   docker build --platform=linux/amd64 -t <your-image-name>:v2 .
   ```

2. **Tag for ECR**:
   ```bash
   docker tag <your-image-name>:v2 <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:v2
   ```

3. **Push versioned image**:
   ```bash
   docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repository-name>:v2
   ```

4. **Update ECS Service**:
   - Create new task definition revision with new image tag
   - Update service to use new task definition

### Placeholder Values

Replace these placeholders with your actual values:
- `<your-account-id>`: Your AWS Account ID (12-digit number)
- `<your-region>`: Your AWS region (e.g., `us-east-1`, `ap-south-1`)
- `<your-repository-name>`: Your ECR repository name
- `<your-image-name>`: Your local Docker image name

### API Endpoints

- `GET /` - Health check endpoint
- `GET /cpu` - CPU-intensive endpoint for load testing

### Security Best Practices

- Use least privilege IAM policies
- Configure security groups with minimal required access
- Enable CloudTrail for audit logging
- Use HTTPS in production
- Regularly rotate access keys

---

This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

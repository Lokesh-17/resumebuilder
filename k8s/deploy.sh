#!/bin/bash

# Build the Docker image
docker build -t resume-builder:latest .

# Create the namespace if it doesn't exist
kubectl apply -f k8s/namespace.yaml

# Deploy the application
kubectl apply -f k8s/deployment.yaml -n resume-builder
kubectl apply -f k8s/service.yaml -n resume-builder
kubectl apply -f k8s/ingress.yaml -n resume-builder

# Get the status of the deployment
echo "Deployment status:"
kubectl get pods -n resume-builder

echo "\nAccess the application at: http://resume-builder.local"
echo "To access it locally, add this line to your /etc/hosts file:"
echo "127.0.0.1    resume-builder.local"

# If using Minikube, you can use:
# minikube service resume-builder-service -n resume-builder --url

#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to App Engine
gcloud app deploy app.yaml --quiet 
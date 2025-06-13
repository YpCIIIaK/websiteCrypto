# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment Instructions

To deploy a new version of the application to Google App Engine after making changes:

1. Make sure you have the Google Cloud SDK installed and initialized
2. Make sure you're logged in to Google Cloud:
   ```bash
   gcloud auth login
   ```
3. Verify your project is set correctly:
   ```bash
   gcloud config set project vortan
   ```
4. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The deployment script will:
- Install dependencies
- Build the application
- Deploy to App Engine


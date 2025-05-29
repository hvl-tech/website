# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying to GitHub Pages

This project is configured for easy deployment to GitHub Pages. There are two ways to deploy:

### Method 1: Manual Deployment

1. Install dependencies if you haven't already:
   ```
   npm install
   ```

2. Build and deploy the project:
   ```
   npm run deploy
   ```

   This will build the project and push the built files to the `gh-pages` branch of your repository.

### Method 2: Automated Deployment with GitHub Actions

This repository is configured with GitHub Actions for continuous deployment:

1. Push your changes to the `main` branch.
2. GitHub Actions will automatically build and deploy your site to GitHub Pages.
3. Your site will be available at `https://[your-username].github.io/[repository-name]/`

### GitHub Pages Configuration

After your first deployment:

1. Go to your repository on GitHub.
2. Navigate to Settings > Pages.
3. Ensure the source is set to "Deploy from a branch" and the branch is set to "gh-pages".

Note: It may take a few minutes for your site to be published after deployment.

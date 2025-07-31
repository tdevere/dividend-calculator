export interface DeploymentConfig {
  environment: string;
  appName: string;
  resourceGroup: string;
  region: string;
  deploymentScript: string;
  buildCommand: string;
  startCommand: string;
  enableMonitoring: boolean;
  enableLogging: boolean;
}

const deploymentConfig: DeploymentConfig = {
  environment: "production",
  appName: "dividend-calculator-app",
  resourceGroup: "dividend-calculator-rg",
  region: "eastus",
  deploymentScript: "./deploy-azure.sh",
  buildCommand: "npm run build",
  startCommand: "npm start",
  enableMonitoring: true,
  enableLogging: true,
};

export default deploymentConfig;
import { AutomationSettings } from '../types/automation';

const automationConfig: AutomationSettings = {
  featureBranchPrefix: 'feature/',
  defaultTestCommand: 'npm test',
  codeGenerationTemplatePath: './templates',
  validationRules: {
    maxLineLength: 120,
    requireComments: true,
    enforceNamingConventions: true,
  },
  deployment: {
    environment: 'production',
    autoDeploy: true,
    rollbackOnFailure: true,
  },
};

export default automationConfig;
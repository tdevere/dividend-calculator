export interface AIModelConfig {
  modelName: string;
  apiKey: string;
  endpoint: string;
  timeout: number;
}

export const aiModelsConfig: AIModelConfig[] = [
  {
    modelName: "CodeGenerator",
    apiKey: process.env.CODE_GENERATOR_API_KEY || "",
    endpoint: "https://api.example.com/code-generator",
    timeout: 5000,
  },
  {
    modelName: "TestRunner",
    apiKey: process.env.TEST_RUNNER_API_KEY || "",
    endpoint: "https://api.example.com/test-runner",
    timeout: 5000,
  },
  {
    modelName: "FeatureValidator",
    apiKey: process.env.FEATURE_VALIDATOR_API_KEY || "",
    endpoint: "https://api.example.com/feature-validator",
    timeout: 5000,
  },
];
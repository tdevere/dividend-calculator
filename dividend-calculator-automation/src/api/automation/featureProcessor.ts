import { FeatureRequest } from "@/types/features";
import { CodeGenerator } from "@/automation/agents/codeGenerator";
import { TestRunner } from "@/automation/agents/testRunner";
import { FeatureValidator } from "@/automation/agents/featureValidator";
import { DeploymentManager } from "@/automation/agents/deploymentManager";

export class FeatureProcessor {
    private codeGenerator: CodeGenerator;
    private testRunner: TestRunner;
    private featureValidator: FeatureValidator;
    private deploymentManager: DeploymentManager;

    constructor() {
        this.codeGenerator = new CodeGenerator();
        this.testRunner = new TestRunner();
        this.featureValidator = new FeatureValidator();
        this.deploymentManager = new DeploymentManager();
    }

    public async processFeatureRequest(featureRequest: FeatureRequest) {
        try {
            // Generate code based on feature request
            const generatedCode = await this.codeGenerator.generate(featureRequest);
            
            // Validate the generated code
            const isValid = await this.featureValidator.validate(generatedCode);
            if (!isValid) {
                throw new Error("Generated code does not meet the requirements.");
            }

            // Run tests on the generated code
            const testResults = await this.testRunner.run(generatedCode);
            if (!testResults.passed) {
                throw new Error("Tests failed. Please check the test results.");
            }

            // Deploy the application if tests pass
            await this.deploymentManager.deploy();
        } catch (error) {
            console.error("Error processing feature request:", error);
            throw error;
        }
    }
}
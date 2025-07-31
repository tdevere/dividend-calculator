const fs = require('fs');
const path = require('path');
const { FeatureValidator } = require('../../automation/agents/featureValidator');

// Load feature requirements from a specified file or input
const featureRequirementsPath = process.argv[2];
const featureRequirements = JSON.parse(fs.readFileSync(featureRequirementsPath, 'utf8'));

// Validate the feature requirements
const validator = new FeatureValidator();
const validationResults = validator.validate(featureRequirements);

// Output validation results
if (validationResults.isValid) {
    console.log('Feature requirements are valid.');
} else {
    console.error('Feature requirements validation failed:', validationResults.errors);
    process.exit(1);
}
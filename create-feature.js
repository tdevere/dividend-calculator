#!/usr/bin/env node

/**
 * Quick Feature Request Script
 * 
 * Usage: node create-feature.js "Add a new dividend yield comparison chart"
 */

const { execSync } = require('child_process');
const https = require('https');

async function createFeatureRequest(description) {
    const featureTypes = {
        'chart': 'component',
        'button': 'component',
        'form': 'component',
        'calculator': 'utility',
        'validation': 'utility',
        'api': 'integration',
        'enhance': 'enhancement'
    };

    // Detect feature type based on description
    const lowerDesc = description.toLowerCase();
    let featureType = 'enhancement';

    for (const [keyword, type] of Object.entries(featureTypes)) {
        if (lowerDesc.includes(keyword)) {
            featureType = type;
            break;
        }
    }

    console.log(`🤖 Creating automated feature request...`);
    console.log(`📝 Description: ${description}`);
    console.log(`🎯 Type: ${featureType}`);

    // Trigger GitHub Actions workflow
    try {
        // Use workflow file name instead of display name to avoid emoji encoding issues
        const command = `gh workflow run feature-automation.yml --field feature_description="${description}" --field feature_type="${featureType}" --field auto_merge="false"`;
        execSync(command, { stdio: 'inherit' });

        console.log(`✅ Feature request submitted successfully!`);
        console.log(`🔗 Check progress at: https://github.com/tdevere/dividend-calculator/actions`);

    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        console.log(`💡 Alternative: Create a GitHub issue with label "feature-request"`);
        console.log(`🔗 https://github.com/tdevere/dividend-calculator/issues/new?template=feature-request.md`);
    }
}

// Get description from command line arguments
const description = process.argv.slice(2).join(' ');

if (!description) {
    console.log(`
🤖 Automated Feature Request Creator

Usage:
  node create-feature.js "Your feature description here"

Examples:
  node create-feature.js "Add a new dividend yield comparison chart"
  node create-feature.js "Create a portfolio risk calculator utility"
  node create-feature.js "Add export to PDF functionality"

Feature Types (auto-detected):
  📊 Component  - UI elements (chart, button, form, modal)
  🔧 Utility    - Logic functions (calculator, validator, formatter)
  🔗 Integration- API/data processing (export, import, sync)
  ⚡ Enhancement- Improvements to existing features
  `);
    process.exit(1);
}

createFeatureRequest(description);

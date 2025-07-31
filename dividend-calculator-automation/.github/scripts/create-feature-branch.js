const { exec } = require('child_process');

const createFeatureBranch = async (featureName) => {
    const branchName = `feature/${featureName}`;
    
    // Create a new branch
    exec(`git checkout -b ${branchName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating branch: ${stderr}`);
            return;
        }
        console.log(`Branch created: ${branchName}`);
        
        // Add logic to develop the feature here
        // For example, you could call the code generation script
        
        // After development, run tests
        exec('node ./scripts/run-tests.js', (testError, testStdout, testStderr) => {
            if (testError) {
                console.error(`Test run failed: ${testStderr}`);
                return;
            }
            console.log(`Tests passed: ${testStdout}`);
            
            // If tests pass, you can push the branch or create a pull request
            exec(`git push origin ${branchName}`, (pushError, pushStdout, pushStderr) => {
                if (pushError) {
                    console.error(`Error pushing branch: ${pushStderr}`);
                    return;
                }
                console.log(`Branch pushed: ${branchName}`);
            });
        });
    });
};

// Example usage: create a feature branch for "new-feature"
createFeatureBranch('new-feature');
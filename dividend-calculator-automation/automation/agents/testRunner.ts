class TestRunner {
    constructor() {
        this.testResults = [];
    }

    runTests(tests) {
        tests.forEach(test => {
            try {
                test();
                this.testResults.push({ test: test.name, result: 'Passed' });
            } catch (error) {
                this.testResults.push({ test: test.name, result: 'Failed', error: error.message });
            }
        });
    }

    reportResults() {
        console.log('Test Results:');
        this.testResults.forEach(result => {
            if (result.result === 'Failed') {
                console.error(`${result.test}: ${result.result} - ${result.error}`);
            } else {
                console.log(`${result.test}: ${result.result}`);
            }
        });
    }
}

export default TestRunner;
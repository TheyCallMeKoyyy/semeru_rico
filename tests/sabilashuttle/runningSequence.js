const { exec } = require('child_process');

function runTest(testName) {
    return new Promise((resolve, reject) => {
        exec(`npx playwright test ${testName} --ui`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running test: ${stderr}`);
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

async function runTests() {
    try {
        console.log("Running login test...");
        await runTest('login.spec.js');
        
        console.log("Running reservation test...");
        await runTest('reservation.spec.js');
        
        console.log("Running change payment test...");
        await runTest('change-payment-method.spec.js');
    } catch (error) {
        console.error('Error executing tests:', error);
    }
}

runTests();

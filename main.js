const Mocha = require("mocha");
const mocha = new Mocha();
const fs = require("fs");
const path = require("path");
const mochawesome = require("mochawesome");
mocha.timeout(20000);

// Load test cases from files
mocha.addFile("./signup_testcase.js");
mocha.addFile("./login_testcase.js");
mocha.addFile("./logout_testcase.js");
mocha.addFile("./addmatch_testcase.js");
mocha.addFile("./uploadjson_testcase.js");
mocha.addFile("./filtervideo_testcase.js");
mocha.addFile("./findmatch_testcase.js");
mocha.addFile("./filtermatch_testcase.js");
mocha.addFile("./uploadvideo_testcase.js");
mocha.addFile("./deletevideo_testcase.js");

// Set options for report
const reportDir = path.join(__dirname);
fs.existsSync(reportDir) || fs.mkdirSync(reportDir);
mocha.reporter(mochawesome, {
    reporterOptions: {
        reportDir: reportDir,
        reportFilename: "index",
        reportTitle: "Test Report",
        reportPageTitle: "Test Results",
        reportUseInlineAssets: true,
    },
});
// Run the test suite
mocha.run(function (failures) {
    process.exitCode = failures ? 1 : 0;
});

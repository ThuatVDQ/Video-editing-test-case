const Mocha = require("mocha");
const mocha = new Mocha();
const fs = require("fs");
const path = require("path");
const mochawesome = require("mochawesome");
mocha.timeout(15000);

// Load test cases from files
mocha.addFile("./test/addmatch_testcase.js");
mocha.addFile("./test/deletevideo_testcase.js");
mocha.addFile("./test/filtermatch_testcase.js");
mocha.addFile("./test/filtervideo_testcase.js");
mocha.addFile("./test/findmatch_testcase.js");
mocha.addFile("./test/login_testcase.js");
mocha.addFile("./test/logout_testcase.js");
//mocha.addFile("./test/deletevideo_testcase.js");
mocha.addFile("./test/uploadjson_testcase.js");
mocha.addFile("./test/uploadvideo_testcase.js");

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

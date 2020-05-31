#!/usr/bin/env node
const fs = require("fs");
let verbose = false;
async function parseFile(filename) {
  var obj;
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var overallResults = {
      passed: { cnt: 0, passed: 0, failed: 0, skipped: 0 },
      failed: { cnt: 0, passed: 0, failed: 0, skipped: 0 },
      skipped: { cnt: 0, passed: 0, failed: 0, skipped: 0 },
    };
    var testResults = {
      passed: 0,
      failed: 0,
      skipped: 0,
    };
    for (var profile of obj.profiles) {
      console.log("Profile: ", profile.name);
      console.log("Controls: ", profile.controls.length);

      for (var control of profile.controls) {
        var controlResults = {
          passed: 0,
          failed: 0,
          skipped: 0,
        };
        for (var result of control.results) {
          controlResults[result.status] = controlResults[result.status] + 1;
          testResults[result.status] = testResults[result.status] + 1;
        }

        if (controlResults.failed > 0) {
          if (verbose) {
            console.log("Control Level: FAILED ", controlResults);
          }
          overallResults.failed.cnt = overallResults.failed.cnt + 1;
          overallResults.failed.failed =
            overallResults.failed.failed + controlResults.failed;
          overallResults.failed.passed =
            overallResults.failed.passed + controlResults.passed;
          overallResults.failed.skipped =
            overallResults.failed.skipped + controlResults.skipped;
        } else if (controlResults.passed > 0) {
          if (verbose) {
            console.log("Control Level: PASSED ", controlResults);
          }
          overallResults.passed.cnt = overallResults.passed.cnt + 1;
          overallResults.passed.passed =
            overallResults.passed.passed + controlResults.passed;
          overallResults.passed.failed =
            overallResults.passed.failed + controlResults.failed;
          overallResults.passed.skipped =
            overallResults.passed.skipped + controlResults.skipped;
        } else {
          if (verbose) {
            console.log("Control Level: SKIPPED ", controlResults);
          }
          overallResults.skipped.cnt = overallResults.skipped.cnt + 1;
          overallResults.skipped.skipped =
            overallResults.skipped.skipped + controlResults.skipped;
          overallResults.skipped.passed =
            overallResults.skipped.passed + controlResults.passed;
          overallResults.skipped.failed =
            overallResults.skipped.failed + controlResults.failed;
        }
      }

      console.log("\nAll Tests:\n", testResults);
      console.log(
        "\nTest Summary by Passed/Failed/Skipped Controls:\n",
        overallResults
      );
      return overallResults;
    }
  });
}

(async () => {
  if (process.argv.length < 3) {
    console.log("usage: node parser.js <filename>");
    process.exit(0);
  }
  if (process.argv.length === 4 && process.argv[3] === "--verbose") {
    verbose = true;
  }
  console.log(`\n\nFile: ${process.argv[2]}\n\n`);
  await parseFile(process.argv[2]);
})();

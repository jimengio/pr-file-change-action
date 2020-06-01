let core = require("@actions/core");
let github = require("@actions/github");
let cp = require("child_process");

try {
  let paths = core.getInput("paths");
  if (typeof paths === "string") {
    paths = [paths];
  }

  console.log(`paths are ${paths}!`);

  let result = cp.execFileSync("git", ["branch", "-a"]);
  console.log(result.toString());

  try {
    console.log(cp.execSync("git", ["log", "--oneline"]).toString());
    console.log(
      cp
        .execSync("git", [
          "diff",
          "--stat",
          github.context.payload.pull_request.base.sha,
        ])
        .toString()
    );
  } catch (error) {
    console.log("Failed", error);
  }

  core.setOutput("changed", "TODO");
  // Get the JSON webhook payload for the event that triggered the workflow
  let payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

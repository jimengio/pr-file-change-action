let core = require("@actions/core");
let github = require("@actions/github");
let cp = require("child_process");

try {
  let pathname = core.getInput("path");

  try {
    let output = cp
      .execSync(
        `git diff --name-only ${github.context.payload.pull_request.base.sha}`
      )
      .toString();
    let changedPaths = output.trim().split("\n");

    console.log(
      "Detected changed paths:",
      JSON.stringify(changedPaths, null, 2)
    );

    if (changedPaths.length > 0) {
      let containsTarget = changedPaths.some((filepath) => {
        return filepath.includes(pathname);
      });

      if (containsTarget) {
        console.log("has change in", pathname);
        core.setOutput("changed", "true");
      } else {
        console.log("No change in", pathname);
        core.setOutput("changed", "false");
      }
    } else {
      console.log("No change");
      core.setOutput("changed", "false");
    }
  } catch (error) {
    console.log("Failed", error);
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  let payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

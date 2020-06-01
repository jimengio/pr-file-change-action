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

    if (changedPaths.length > 0) {
      let targetPaths = changedPaths.filter((filepath) => {
        return filepath.includes(pathname);
      });

      console.log(
        `Among ${changedPaths.length} files, targets are detected:`,
        JSON.stringify(changedPaths, null, 2)
      );

      if (targetPaths) {
        console.log("Has change in", pathname);
        core.setOutput("changed", "true");
      } else {
        console.log("No change in", pathname);
        core.setOutput("changed", "false");
      }
    } else {
      console.log("Nothing changed in the PR");
      core.setOutput("changed", "false");
    }
  } catch (error) {
    console.log("Failed", error);
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  let payload = JSON.stringify(github.context.payload);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

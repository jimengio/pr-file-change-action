let core = require("@actions/core");
let github = require("@actions/github");
let cp = require("child_process");

let detectChanged = () => {
  let pathname = core.getInput("path");

  // use changed=true by default
  core.setOutput("changed", "true");

  let output = cp
    .execSync(
      // list changed file names relative to base commit
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
      JSON.stringify(targetPaths, null, 2)
    );

    if (targetPaths.length > 0) {
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
};

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  let payload = github.context.payload;
  // console.log(`The event payload:`);
  // console.log(JSON.stringify(payload));

  if (payload.pull_request != null) {
    detectChanged();
  } else {
    console.log("Always true after being merged");
    core.setOutput("changed", "true");
  }
} catch (error) {
  core.setFailed(error.message);
}

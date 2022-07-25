# How to Contribute to the Debug Adapter Protocol

TBD

## Releasing DAP Changes

This section describes how changes in the Debug Adapter Protocol are released; informational for most readers, and instructional for maintainers.

DAP versions are synchronized to [VS Code's iterations](https://github.com/microsoft/vscode/wiki/Development-Process), with a minor release being cut about every month. All DAP changes for an iteration are committed to the `main` branch which is merged into the `gh-pages` branch in endgame week.

We also maintain npm packages containing the [DAP types](https://www.npmjs.com/package/@vscode/debugprotocol) and a [Node.js adapter](https://www.npmjs.com/package/@vscode/debugadapter) and a [test support library](https://www.npmjs.com/package/@vscode/debugadapter-testsupport). Typically we update those three libraries whenever we change DAP (and commit to the `main` branch) so that interested stakeholders can try out latest DAP changes early. Since changes are considered to be "unofficial" until released to the `gh-pages` branch, we publish the three npm modules as a ["pre-release version"](https://semver.org/#spec-item-9) first, e.g. with a version number like `1.53.0-pre.1`.

Detailed steps:

1. After discussion on the Github issue has come to a conclusion (typically with an agreed upon API proposal in TypeScript), update `debugAdapterProtocol.json` with the corresponding schema changes.
1. Add an entry in `changelog.md`. If this is the first change of the iteration, add a new new section header with the upcoming version number, e.g. `* 1.53.X:` and bump the version number in `index.html` to the same number. The version number can be found in the sentence: `The latest version of the protocol specification is version 1.53.0.`
1. Run `node spec-generator` (after `npm install && npm run compile` in the subdirectory) to automatically update the documentation. Commit it to the `main` branch.
1. If this is a feature that VS Code would want to implement, open a corresponding issue in the VS Code repo.
1. Updating the npm modules:
    1. Whenever there are worthwhile DAP changes, pull the updated DAP schema by running `npm run sync-dap` or `npm run sync-next-dap` and run the `Generate debugProtocol.ts` launch configuration to update the `DebugProtocol` TypeScript module.
    1. Run `npm run version -- preminor --preid pre` in the repo, which will publish a prerelease tag. This will get automatically built by CI.
    1. Adopt the three new npm modules in [Mock Debug](https://github.com/microsoft/vscode-mock-debug) to verify that they still work.
    1. Commit and push the version changes to Mock Debug.
    1. At the end of each VS Code iteration (typically Wednesday of endgame week), publish the final version of the three npm packages by running `npm run version -- minor`.

# How to Contribute to the Debug Adapter Protocol

TBD

## Releasing DAP Changes

This section describes how changes in the Debug Adapter Protocol are released; informational for most readers, and instructional for maintainers.

DAP versions are synchronized to [VS Code's iterations](https://github.com/microsoft/vscode/wiki/Development-Process), with a minor release being cut about every month. All DAP changes for an iteration are kept in a `next` branch which is merged into the `gh-pages` branch in endgame week.

We also maintain npm packages containing the [DAP types](https://www.npmjs.com/package/@vscode/debugprotocol) and a [Node.js adapter](https://www.npmjs.com/package/@vscode/debugadapter) and a [test support library](https://www.npmjs.com/package/@vscode/debugadapter-testsupport). Typically we update those three libraries whenever we change DAP (and commit to the `next` branch) so that interested stakeholders can try out latest DAP changes early. Since the `next` changes are considered "unofficial" until released to the `gh-pages` branch, we publish the three npm modules as a ["pre-release version"](https://semver.org/#spec-item-9) first, e.g. with a version number like `1.53.0-pre.1`.

Detailled steps:

1. After discussion on Github issue has come to a conclusion (typically with an agreed upon API proposal in TypeScript), update `debugAdapterProtocol.json` with the corresponding schema changes.
1. Add an entry in `changelog.md`. If this is the first change of the iteration, add a new new section header with the upcoming version number, e.g. `* 1.53.X:` and bump the version number in `index.html` to the same number. The version number can be found in the sentence: `The latest version of the protocol specification is version 1.53.0.`
1. Run `node spec-generator` (after `npm install && npm run compile` in the subdirectory) to automatically update the documentation. Commit it to the `next` branch.
1. If this is a feature that VS Code would want to implement, open a corresponding issue in the VS Code repo.
1. Updating the npm modules:
    1. Whenever there are worthwhile DAP changes, copy the [DAP JSON schema](https://github.com/microsoft/debug-adapter-protocol/blob/gh-pages/debugAdapterProtocol.json) as `debugProtocol.json` into [`vscode-debugadapter-node`](https://github.com/microsoft/vscode-debugadapter-node) and run the `Generate debugProtocol.ts` launch configuration to update the `DebugProtocol` TypeScript module.
    1. Enter the `protocol` directory, update the `version` in the package.json to a pre-release version like `1.53.0-pre.1`, and `npm publish --tag next`. Wait a bit for npm to propagate these changes.
    1. Enter the `adapter` directory, update the `version` in the package.json to a pre-release version _and_ the pre-release version of `@vscode/debugprotocol`, `npm install`, and `npm publish --tag next`.
    1. Enter the `testsupport` directory, update the `version` in the package.json to a pre-release version _and_ the pre-release version of `@vscode/debugprotocol`, `npm install`, and `npm publish --tag next`.
 
    3. Commit and push the version changes.
    4. At the end of each VS Code iteration (typically Wednesday of endgame week), publish the final version of the three npm packages by removing the pre-release part of the version numbers in the three package.json files and publish them with `npm publish`.
    5. Commit and push the version changes.


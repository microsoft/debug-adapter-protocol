# How to Contribute to the Debug Adapter Protocol

TBD

## Releasing DAP Changes

This section describes how changes in the Debug Adapter Protocol are released; informational for most readers, and instructional for maintainers.

1. After discussion on Github issues, update `debugAdapterProtocol.json` with the corresponding changes.
1. Add an entry in `changelog.md`. DAP versions are synchronized to [VS Code's iterations](https://github.com/microsoft/vscode/wiki/Development-Process), with a minor release being cut about every month.
1. Run `node spec-generator` (after `npm install && npm run compile` in the subdirectory) to automatically update built documentation. Commit it.
1. If this is a feature that VS Code would want to implement, open a corresponding issue in the VS Code repo.
1. We also maintain npm packages containing the DAP types and a Node.js client.
    1. At the end of each VS Code iteration, update the JSON schema in [`vscode-debugadapter-node`](https://github.com/microsoft/vscode-debugadapter-node) and run `node .` to update the generated schema.
    1. Enter the `protocol` directory, update the `version` in the package.json, and `npm publish`.
    1. Enter the `adapter` directory, update the `version` in the package.json _and_ the version of `@vscode/debugadapter`, and `npm publish`.
    1. Commit and push the version changes.


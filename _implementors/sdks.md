---
layout: implementors
title:  "SDKs for the DAP"
shortTitle: "SDKs"
author: Microsoft
index: 3
---

The following table lists the known SDKs or libraries that support the Debug Adapter Protocol.

| Description   | Language   | Maintainer | Repository |
|---------------|------------|------------|------------|
| Libraries for implementing and testing debug adapters (npm modules) | TypeScript | Microsoft | [vscode-debugadapter-node](https://github.com/Microsoft/vscode-debugadapter-node)
| Managed implementation for hosting and implementing debug adapters (nuget package) | C#/.NET | Microsoft | [VisualStudio.Shared.VsCodeDebugProtocol](https://www.nuget.org/packages/Microsoft.VisualStudio.Shared.VsCodeDebugProtocol)
| Extensibility interfaces for a DAP host (nuget package) | C#/.NET | Microsoft | [VisualStudio.Debugger.DebugAdapterHost.Interfaces](https://www.nuget.org/packages/Microsoft.VisualStudio.Debugger.DebugAdapterHost.Interfaces/)
| Sample for integrating debug adapters in Visual Studio | C#/.NET | Microsoft | [Microsoft/VSDebugAdapterHost](https://github.com/Microsoft/VSDebugAdapterHost)
| Libraries for implementing debug adapters on JVM | Java | Eclipse Foundation | [eclipse/lsp4j](https://github.com/eclipse/lsp4j)
| C++ library for implementing debug adapters | C++ | Google | [google/cppdap](https://github.com/google/cppdap)
| Ruby library for encoding and decoding DAP messages | Ruby | [Ethan Reesor](https://gitlab.com/firelizzard) | [firelizzard/ruby-dap](https://gitlab.com/firelizzard/ruby-dap)
| Go library for DAP | Go | Go team at Google | [google/go-dap](https://github.com/google/go-dap)
| A Rust implementation of the Debug Adapter Protocol | Rust | [Tamás Szelei](https://github.com/sztomi) | [sztomi/dap-rs](https://github.com/sztomi/dap-rs)
{: .table .table-bordered .table-responsive}

*If you are missing a SDK please create a pull request in GitHub against this markdown [document](https://github.com/Microsoft/debug-adapter-protocol/blob/main/_implementors/sdks.md)*

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
{: .table .table-bordered .table-responsive}

*If you are missing a SDK please create a pull request in GitHub against this markdown [document](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/sdks.md)*

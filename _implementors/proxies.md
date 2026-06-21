---
layout: implementors
title:  "DAP Proxies and Utilities"
shortTitle: "Proxies"
author: Microsoft
index: 4
---

The following table lists known tools that route, multiplex, or observe the Debug Adapter Protocol — tools that sit between adapters and clients to enable scenarios beyond what a single point-to-point DAP connection supports.

| Tool | Description | Maintainer |
|------|-------------|------------|
[dap-mux](https://github.com/dap-mux/dap-mux)|DAP multiplexer — connects multiple clients (editors, REPLs) to a single debug adapter session simultaneously, with session persistence and late-join state replay|[@wolf](https://github.com/wolf)
[dap-observer](https://github.com/shaleh/dap-observer)|Read-only DAP client that connects to a running dap-mux session and renders the current stack frame's variables as a navigable terminal tree|[@shaleh](https://github.com/shaleh)
{: .table .table-bordered .table-responsive}

*If you are missing a DAP proxy or utility please create a pull request in GitHub against this markdown [document](https://github.com/Microsoft/debug-adapter-protocol/blob/main/_implementors/proxies.md)*

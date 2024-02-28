---
layout: implementors
title:  "Tools supporting the DAP"
shortTitle: "Supporting Tools"
author: Microsoft
index: 2
---

The following table lists the known development tools (IDEs) that implement the Debug Adapter Protocol as a client.

| Development Tool              | Client ID    | Maintainer | Repository                                |
|-------------------------------|--------------|--------------------------------------------------------|
| Visual Studio Code            | vscode       | Microsoft  | [vscode](https://github.com/Microsoft/vscode)
| Visual Studio                 | visualstudio | Microsoft  | [Visual Studio Debug Adapter Host](https://github.com/Microsoft/VSDebugAdapterHost)
| Visual Studio for Mac         | vsformac     | Microsoft  |
| Eclipse IDE (LSP4E connector) | lsp4e.debug  | Eclipse    | [Eclipse community](https://projects.eclipse.org/projects/technology.lsp4e/who), [Eclipse LSP4E](https://projects.eclipse.org/projects/technology.lsp4e)
| Emacs                         | emacs.dap-mode | [@yyoncho](https://github.com/yyoncho) | [dap-mode](https://github.com/yyoncho/dap-mode)
| Emacs                         | dape | [@svaante](https://github.com/svaante) | [dape](https://github.com/svaante/dape)
| Theia                         | Theia        | Eclipse    | [theia](https://github.com/theia-ide/theia/)
| Vim, Neovim                   | vimspector   | [Ben Jackson](https://github.com/puremourning) | [vimspector](https://github.com/puremourning/vimspector), [vim](https://github.com/vim/vim), [neovim](https://github.com/neovim/neovim)
| Neovim                        | neovim       | [@mfussenegger](https://github.com/mfussenegger) | [nvim-dap](https://github.com/mfussenegger/nvim-dap), [neovim](https://github.com/neovim/neovim)
| Cloud Studio                  | cloudstudio  | [CODING](https://studio.dev.tencent.com/) 
| JCIDE                         | JCIDE        | [JavaCardOS](https://www.javacardos.com/)   | [JCIDE](https://www.javacardos.com/tools)
| OpenSumi                      | OpenSumi     | [OpenSumi](https://github.com/opensumi)   | [opensumi/core](https://github.com/opensumi/core)|
{: .table .table-bordered .table-responsive}

The "client ID" is the identifier that a development tool sends to the debug adapter as part of the [**initialize**](../../specification#Requests_Initialize) request.

*If you are missing a development tool or if you want to register a client ID please create a pull request in GitHub against this markdown [document](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/tools.md).*

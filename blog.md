---
title: A new home for the Debug Adapter Protocol
layout: singlePage
sectionid: blog
---

July 27, 2018 Andre Weinand, [@weinand](https://twitter.com/weinand)

From another [blog](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol):

**_"Visual Studio Code is an editor for any developer, no matter what programming language you use."_**

This promise is based on (at least) two pillars:
- an extensible tool platform and ecosystem where everyone can easily contribute, and
- technology that make it easy to add great tool support for new programming languages.

Supporting a programming language from a development tool means:
- rich editing support based on a deep understanding of a language (aka "language smartness"), and
- debugging support for the language integrated into the editing tool.

The latter might come as a suprise to some, but it was always our firm belief that debugging is an integral part of where the source code is written: the editor. So debugging is an important part of the "inner loop".

But adding a debugger for a new language to an IDE or editor is a significant effort as the list of standard debugging features is not small:
- source-, function-, conditional-, inline breakpoints, and log points,
- variable values shown in hovers or inlined in the source,
- multi-process and multi-thread support,
- navigating through complex data structures,
- watch expressions,
- debug console for interactive evaluation with autocomplete (aka REPL).

Implementing these features for a new language is not only a significant effort, it is also frustrating that this work must be repeated for each development tool, as each tool uses different APIs for implementing its user interface.

This results in lots of duplicated functionality (and implementation) as visualized by the blue boxes in the following picture:

![without_DAP](./img/without-DAP.png)

When starting the work on VS Code we always envisoned to decouple the "frontend" UI from language specific "backend" implementation as far as possible.
And this for both the language smartness and the debugging support.

Today we know that we have achieved this ambitious goal:

We have created two abstract protocols that allow for decoupling the editing and debugging user interfaces in the "frontend" from the language specific smartness and debugging functionality provided by "backend" components.

The "deep understanding of a language" is surfaced by the **_Language Server Protocol_** (LSP) and the "debugging support" by the **_Debug Adapter Protocol_** (DAP).

The idea behind the _Debug Adapter Protocol_ is to standardize an abstract protocol for how the debugging component of a development tool communicates with concrete debuggers or runtimes.

Since it is unrealistic to assume that existing debuggers or runtimes adopt this protocol any time soon,
we've rather assumed that an _intermediary_ component takes over the role of adapting an existing debugger or runtime API to the Debug Adapter Protocol.
This intermediary becomes the _Debug Adapter_ which explains the name of the protocol: _Debug Adapter Protocol_.
The following picture shows the resulting architecture:

![with_DAP](./img/with-DAP.png)

The picture shows two important characteristics of the DAP approach:
- Debug Adapters can be shared between different development tools, which helps amortizing their development cost, and
- the Debug Adapter Protocol is not tied to VS Code and can be used as the foundation for a generic debugger UI in other development tools.

These characteristics are similar to those of the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) which got announced as an open standard (with its own web site) in 2016.

Now we have followed suit for the _Debug Adapter Protocol_ by breaking the DAP specification out of its [old repository](https://github.com/Microsoft/vscode-debugadapter-node) and moving it to a new [web site](http://weinand.ch:4000/debug-adapter-protocol/).

This move should emphasize that the Debug Adapter Protocol is an open standard like the LSP.

In the new location we provide:
- an [overview and introduction](./overview) to the protocol,
- the [protocol specification](./debugAdapterProtocol.json) as a machine-processable [JSON-schema](http://json-schema.org),
- a [detailed documentation](./specification) automatically generated from the protocol specification,
- [information](./implementors/adapters/) about _Debug Adapters_ implementing the protocol, and
- [development tools](./implementors/tools/) using the protocol, and
- [SDKs](./implementors/sdks/) supporting the protocol.

The [old location](https://github.com/Microsoft/vscode-debugadapter-node) will continue to host the source for the npm modules ([vscode-debugprotocol](https://www.npmjs.com/package/vscode-debugprotocol), [vscode-debugadapter](https://www.npmjs.com/package/vscode-debugadapter), [vscode-debugadapter-testsupport](https://www.npmjs.com/package/vscode-debugadapter-testsupport)) supporting DAP.

## What's Next?

Since the Debug Adapter Protocol has already been available for quite some time,
the move to a new web site is not really an inception, but just a move to a new home...

We invite all existing and future users of the DAP to visit our new home and
continue the collaboration there.


On behalf of the VS Code team: Happy Coding!

André Weinand -  [@weinand on Twitter](https://twitter.com/weinand)
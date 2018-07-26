---
title: A new home for the Debug Adapter Protocol
layout: singlePage
sectionid: blog
---

August 2nd, 2018 Andre Weinand, [@weinand](https://twitter.com/weinand)

From another [blog](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol):

**_"Visual Studio Code is an editor for any developer, no matter what programming language you use."_**

This promise is based on two things:
- an extensible tool platform and ecosystem where everyone can contribute and
- technologies that make it easy to add support for new programming languages.

Supporting a new programming language from a development tool typically means:
- rich editing support based on a deep understanding ("smartness") of that language,
- debugging support for the language integrated into the editing tool.

For these areas we have created two abstract protocols that allow for decoupling the editing and debugging user interfaces in the "frontend" from the language specific smartness and debugging functionality provided by "backend" components.

The "deep understanding of a language" is surfaced by the **_Language Server Protocol_** (LSP) and the "debug support" by the **_Debug Adapter Protocol_** (DAP).

Since both protocols are not only independent from a language but also from a specific frontend, they are not tied to VS Code and can be used in other development tools. This makes it possible to share language servers and debug adapters across development tools, which helps amortizing their development effort.

To emphasize this independence of the protocol from the devlopment tool the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) had been moved to its own web site in 2016.

Now we have followed suit for the Debug Adapter Protocol by breaking the DAP specification out of its [old repository](https://github.com/Microsoft/vscode-debugadapter-node) and moving it to a new [web site](http://weinand.ch:4000/debug-adapter-protocol/).

In the new location we provide:
- an [overview and introduction](./overview) to the protocol,
- the [protocol specification](./debugAdapterProtocol.json) as a machine-processable [JSON-schema](http://json-schema.org),
- a [detailed documentation](./specification) automatically generated from the protocol specification,
- [information](./implementors/adapters/) about _Debug Adapters_ implementing the protocol, and
- [development tools](./implementors/tools/) using the protocol, and
- [SDKs](./implementors/sdks/) supporting the protocol.

The [old location](https://github.com/Microsoft/vscode-debugadapter-node) will continue to host the source for the npm modules ([vscode-debugprotocol](https://www.npmjs.com/package/vscode-debugprotocol), [vscode-debugadapter](https://www.npmjs.com/package/vscode-debugadapter), [vscode-debugadapter-testsupport](https://www.npmjs.com/package/vscode-debugadapter-testsupport)) supporting DAP.

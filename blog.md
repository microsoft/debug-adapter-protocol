---
title: A new home for the Debug Adapter Protocol
layout: singlePage
sectionid: blog
---

July 27, 2018 Andre Weinand, [@weinand](https://twitter.com/weinand)

One goal of the July milestone was to move the _Debug Adapter Protocol_ -- which was hiding itself in a somewhat obscure [github project](https://github.com/Microsoft/vscode-debugadapter-node) -- to a more prominent web site (see feature request [#19636](https://github.com/Microsoft/vscode/issues/19636)).

This blog provides some background about protocols, the Debug Adapter Protocol, and the motivation behind the move.

## Why Protocols?

From another [blog](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol):

**_"Visual Studio Code is an editor for any developer, no matter what programming language you use."_**

This promise is based on (at least) two pillars:
- an extensible tool platform and ecosystem where everyone can easily contribute, and
- technology that make it easy to add great tool support for any programming language.

Supporting a programming language from a development tool means:
- rich editing support based on a deep understanding of a language (aka "language smartness"), and
- debugging support for the language integrated into the editing tool.

The latter might come as a suprise to some, but it was always our firm belief that debugging is an integral part of where the source code is written: the editor. So debugging is an important part of the "inner loop".

But adding a debugger for a new language to an IDE or editor is a significant effort as the list of standard debugging features is not small:
- source-, function-, conditional-, inline breakpoints, and [logpoints](https://code.visualstudio.com/blogs/2018/07/12/introducing-logpoints-and-auto-attach),
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

The "deep understanding of a language" is surfaced by the [**_Language Server Protocol_**](https://microsoft.github.io/language-server-protocol/) (LSP) and the "debugging support" by the **_Debug Adapter Protocol_** (DAP).

## The Debug Adapter Protocol

The idea behind the _Debug Adapter Protocol_ is to standardize an abstract protocol for how the debugging component of a development tool communicates with concrete debuggers or runtimes.

Since it is unrealistic to assume that existing debuggers or runtimes adopt this protocol any time soon,
we've rather assumed that an _intermediary_ component takes over the role of adapting an existing debugger or runtime API to the Debug Adapter Protocol.
This intermediary becomes the _Debug Adapter_ which explains the name of the protocol: _Debug Adapter Protocol_.

Here’s an example of how a development tool could use the DAP to communicate with a Debug Adapter for the famous "gdb" debugger:

![breakpoint](./img/breakpoint.png)

We assume that the user has already started a debug session, but is currently stopped at the entry point of his program and wants to set (and later hit) a breakpoint.

- The user sets one or more breakpoints in a specific source file by clicking in the breakpoint gutter. The development tool sends a `setBreakpoints` request to the Debug Adapter which registers the breakpoint with the gdb debugger.
- Then the user presses the "Continue" button to resume execution. The tool sends a `continue` request to the Debug Adapter which translates this into the corresponding gdb command.
- Some time later the breakpoint is hit and the Debug Adapter receives some notification from gdb and translates this into a DAP `stopped` event which gets sent to the development tool.
- In response of this `stopped` event the development updates its UI and shows a stacktrace view. This triggers a `stacktrace` request which returns all the information that is dispayed for the individual stack frames.
- If the user selects one stackframe, the development tool requests the variables of that frame with a `variables` request.

For [historical reasons](https://github.com/Microsoft/vscode-debugadapter-node/issues/58) DAP uses a JSON-based wire-format inpired by the (now obsolete) [V8 Debugging Protocol](https://github.com/dtretyakov/node-tools/wiki/Debugging-Protocol). Please note that this format is similar to but not compatible with the JSON-RPC used in LSP.

After this short excursion into DAP communication, let's recapitulate the characteristics of the DAP approach:

![with_DAP](./img/with-DAP.png)

The picture shows two important benefits of the DAP approach:
- Debug Adapters can be shared between different development tools, which helps amortizing their development cost, and
- the Debug Adapter Protocol is not tied to VS Code and can be used as the foundation for a generic debugger UI in other development tools.

These characteristics are similar to those of the **_Language Server Protocol_** which got published with its own [web site](https://microsoft.github.io/language-server-protocol/) in 2016.

## A new home for the DAP

Now we have followed suit for the _Debug Adapter Protocol_ by breaking the DAP specification out of its [old repository](https://github.com/Microsoft/vscode-debugadapter-node) and moving it to a new web site [https://microsoft.github.io/debug-adapter-protocol](http://weinand.ch:4000/debug-adapter-protocol/) and a corresponding repository [https://github.com/Microsoft/debug-adapter-protocol](https://github.com/Microsoft/debug-adapter-protocol).

This move should emphasize that the _Debug Adapter Protocol_ in not specific to Visual Studio Code.
For example, Visual Studio is now also [supporting this protocol](https://blogs.msdn.microsoft.com/visualstudio/2018/03/26/adding-support-for-debug-adapters-to-visual-studio-ide/).

In the new location we provide:
- an [overview and introduction](./overview) to the protocol,
- the [protocol specification](./debugAdapterProtocol.json) as a machine-processable [JSON-schema](http://json-schema.org),
- a [detailed documentation](./specification) automatically generated from the protocol specification,
- [_Debug Adapters_](./implementors/adapters/) implementing the protocol,
- [development tools](./implementors/tools/) hosting the protocol,
- [SDKs](./implementors/sdks/) supporting the protocol.
- bugs, feature requests, and pull requests can be created under the ["issues"](https://github.com/Microsoft/debug-adapter-protocol/issues) section of the new repository.

The [old location](https://github.com/Microsoft/vscode-debugadapter-node) will continue to host the source for the three npm modules for DAP: ([vscode-debugprotocol](https://www.npmjs.com/package/vscode-debugprotocol), [vscode-debugadapter](https://www.npmjs.com/package/vscode-debugadapter), [vscode-debugadapter-testsupport](https://www.npmjs.com/package/vscode-debugadapter-testsupport)).

## What's Next?

Since the Debug Adapter Protocol has already been available for quite some time,
the move to a new web site is not really an inception, but just a move to a new home...

We'd like to invite all existing and future users of the DAP to visit our new home and continue the collaboration there.
For example you can help to keep the list of supporting tools and implementations up to date by submitting pull request in GitHub against these markdown files:
[Debug Adapters](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/adapters.md),
[Tools](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/tools.md), and
[SDKs](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/sdks.md).

On behalf of the VS Code team: Happy Coding!

André Weinand -  [@weinand on Twitter](https://twitter.com/weinand)
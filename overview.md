---
title: Overview
layout: singlePage
sectionid: overview
---

## What is the Debug Adapter Protocol?
Implementing support for features like autocomplete, goto definition, or documentation on hover for a programming language is a significant effort. Traditionally this work must be repeated for each development tool, as each provides different APIs for implementing the same features.

The idea behind a <i>Language Server</i> is to provide the language-specific smarts inside a server that can communicate with development tooling over a protocol that enables inter-process communication.

The idea behind the <i>Language Server Protocol (DAP)</i> is to standardize the protocol for how tools and servers communicate, so a single <i>Language Server</i> can be re-used in multiple development tools, and tools can support languages with minimal effort.

LSP is a win for both language providers and tooling vendors!

## How it works

In this section we give a high-level overview of the interaction between frontend and a debug adapter.
This should help you in your implementation of a debug adapter based on the Debug Adapter Protocol.

When a debug session starts, the frontend launches the debug adapter executable and talks to it through *stdin* and *stdout*.

Then the frontend sends an [**initialize**](./specification#Requests_Initialize) request to configure the adapter with information about the path format (native or URI) and whether line and column values are 0 or 1 based.
If the adapter is derived from the TypeScript or C# default implementation `DebugSession`, it does not have to handle the initialize request itself.

Depending on the `request` attribute used in the launch configuration created by the user, the frontend either sends a *launch* or an *attach* request.

For [**launch**](./specification#Requests_Launch) the debug adapter has to launch a runtime or program so that it can be debugged.
If the program can interact with the user through stdin/stdout, it is important that the debug adapter launches the program in an interactive terminal or console.

For [**attach**](./specification#Requests_Attach) the debug adapter has to attach or connect to an already running program.

Since arguments for both requests are highly dependent on a specific debug adapter implementation, the Debug Adapter Protocol does not prescribe any arguments.
Instead the frontend is expect to passes all arguments from the user's launch configuration to the *launch* or *attach* requests.

The frontend is expected to persist breakpoints on behalf of the debug adapter, it has to register the breakpoints with the debug adapter when a session starts.

Since the frontend does not know when is a good time for this, the debug adapter is expected to send an [**initialized**](./specification#Events_Initialized) event to the frontend
to announce that it is ready to accept breakpoint configuration requests.

The frontend will then send all breakpoints by calling these breakpoint configuration requests:
* [**setBreakpoints**](./specification#Requests_SetBreakpoints) for every source file with breakpoints,
* [**setFunctionBreakpoints**](./specification#Requests_SetFunctionBreakpoints) if the debug adapter supports function breakpoints,
* [**setExceptionBreakpoints**](./specification#Requests_SetExceptionBreakpoints) if the debug adapter supports any exception options,
* [**configurationDoneRequest**](./specification#Requests_ConfigurationDone) to indicate the end of the configuration sequence.

The *setBreakpoint* request sets all breakpoints that exist for a file (so it is not incremental).
A simple implementation of this semantics in the debug adapter is to clear all breakpoints for a file and then set the breakpoints specified in the request.
*setBreakpoints* and *setFunctionBreakpoints* are expected to return the 'actual' breakpoints and the frontend updates the UI dynamically if a breakpoint could not be set at the requested position and was moved by the debugger backend.

Whenever the program stops (on program entry, because a breakpoint was hit, an exception occurred, or the user requested execution to be paused),
the debug adapter has to send a [**stopped**](./specification#Events_Stopped) event with the appropriate reason and thread id.

Upon receipt the frontend will first request the [`threads`](./specification#Types_Thread) (see below), and then the *stacktrace* (a list of [`stack frames`](./specification#Types_StackFrame)) for the thread mentioned in the stopped event.
If the user then drills into the stack frame, frontend first requests the [`scopes`](./specification#Types_Scope) for a stack frame, and then the [`variables`](./specification#Types_Variable) for a scope.
If a variable is itself structured, frontend requests its properties through additional *variables* requests.
This leads to the following hierarchy:

```
Threads
   Stackframes
      Scopes
         Variables
            ...
               Variables
```

Whenever the frontend receives a [**stopped**](./specification#Events_Stopped) or a [**thread**](./specification#Events_Thread) event, frontend requests all [`threads`](./specification#Types_Thread) that exist at that point in time. [**Thread**](./specification#Events_Thread) events are optional but a debug adapter can send them to force the frontend to update the threads UI dynamically even when not in a stopped state.

After a successful *launch* or *attach* the frontend requests the baseline of currently existing threads with the [**threads**](./specification#Requests_Threads) request and then starts to listen for [**thread**](./specification#Events_Thread) events to detect new or terminated threads. Even if your debug adapter does not support multiple threads, it must implement the [**threads**](./specification#Requests_Threads) request and return a single (dummy) thread. The id of this thread must be used in all requests where a thread id is required, e.g. [**stacktrace**](./specification#Requests_Stacktrace), [**pause**](./specification#Requests_Pause), [**continue**](./specification#Requests_Continue), [**next**](./specification#Requests_Next), [**stepIn**](./specification#Requests_StepIn), and [**stepOut**](./specification#Requests_StepOut).

The frontend terminates a debug session with the [**disconnect**](./specification#Requests_Disconnect) request.
If the debug target was 'launched' *disconnect* is expected to terminate the target program (even forcefully if necessary).
If the debug target has been 'attached' initially, *disconnect* should detach it from the target (so that it will continue to run).
In both cases and in the case that the target terminated normally or crashed the debug adapter must fire a [**terminated**](./specification#Events_Terminated) event.
After receiving a response from the *disconnect* request, the frontend terminates the debug adapter.

## Capabilities

Not every debug adapter can support all features defined by the protocol. DAP therefore provides  'capabilities'. A capability groups a set of language features. A development tool and the language server announce their supported features using capabilities. As an example, a debug adapter announces that it can handle the 'textDocument/definition' request, but it might not handle the 'workspace/symbol' request. Similarly, a debugger frontend announces its ability to provide 'about to save' notifications before a document is saved, so that a server can compute textual edits to format the edited document before it is saved.

**Notice** the actual integration of a debug adapter into a particular tool is not defined by the language server protocol and is left to the tool implementors.

## Libraries (SDKs) for DAP providers and consumers

To simplify the implementation of debug adapters there are libraries or SDKs:

- *Debug Adapter SDKs* for the different implementation languages there is an SDK to implement a debug adapter in a particular language. For example, to implement a debug adapter using Node.js there is the [debug adapter npm module](https://www.npmjs.com/package/vscode-debugadapter).

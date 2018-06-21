---
title: Overview
layout: singlePage
sectionid: overview
---

## What is the Debug Adapter Protocol?

It takes a significant effort to implement the UI for a new debugger for features like:
- source-, function-, conditional-, and inline breakpoints,
- variable values shown in hovers or inlined in the source,
- multi-process and  multi-thread support,
- navigating through complex data structures,
- watch expressions,
- debug console for interactive evaluation with autocomplete (aka REPL),
- log points.

Typically this work must be repeated for each development tool, as each provides different APIs for implementing UI features.
This results in lots of duplicated debugger functionality (and implementation) as indicated by the blue boxes in the following picture:

![without_DAP](./img/without-DAP.png)

The idea behind a _Debug Adapter Protocol_ is to standardize the protocol for how a development tool communicates with debuggers.
So all the features from the list above (and many more) ....

Since it is unrealistic to assume that existing debuggers or runtimes adopt this protocol any time soon,
we rather assume that an _intermediary_ component takes over the role of adapting an existing debugger or runtime API to the Debug Adapter Protocol.
This intermediary becomes the _Debug Adapter_ which explains the name of the protocol: _Debug Adapter Protocol_.
The following pictures shows the resulting architecture:

![with_DAP](./img/with-DAP.png)

The diagram shows that the Debug Adapter Protocol makes it possible to implement a single generic debugger UI per development tool
and that Debug Adapters can be re-used across different development tools. This reduces the effort to support a new debugger significantly.

Standardizing on the wire-protocol instead of an API has the advantage that a debug adapter can be implemented in the language most suitable for the given debugger or runtime.

Since the _Debug Adapter Protocol_ was designed for supporting the debugging UI in a language agnostic way,
it is fairly high-level and does not have to surface all the fine details of the underlying language and low-level debugger API.
The most important data type used in the protocol are strings, because that's what the end user will see in the UI.
So Debug Adapters typically aggregate information received via debugger APIs into high-level, string-based data-structures that are directly consumed in the UI of the frontend tool.
Since this mapping is mostly straightforward and has little complexity, Debug adapters can be developed with minimal effort and in a piecemeal way.

DAP is a win for both debugger/runtime providers and tooling vendors!

## How it works

In this section we give an overview of the interaction between a frontend (IDE, editor) and a debug adapter.
This should not only help when implementing the Debug Adapter Protocol in a debug adapter, but also when implementing a frontend (client) that uses the protocol.

### Debug Session Start

When a debug session starts, the frontend needs a way to communicate with some "entity" (i.e. the debug adapter) that implements the Debug Adapter Protocol.
How the debug adapter comes to live is not really part of the protocol specification, but it is still an important detail in order to allow for using debug adapters in different frontends.

There are two ways of communicating with a debug adapter:
- **single session mode**: in this mode the frontend starts a debug adapter as a standalone process and communicates with it through *stdin* and *stdout*. At the end of the debug session the debug adapter is terminated. For concurrrent debug sessions the frontend starts multiple concurrrent debug adapters.
- **multi session mode**: in this mode the frontend does not start the debug adapter but assumes that it is already running and that it listens on a specific port for connections attempts. For every debug session the frontend initiates a new communication session on the specific port and disconnects at the end of the session.

After establishing a connection to the debug adapter, the frontend starts communicating via the _base protocol_.

### Base protocol

The base protocol exchanges messages that consist of a header and a content part (comparable to HTTP).
The header and content part are separated by a `\r\n` (carriage return, line feed).

#### Header Part

The header part consists of header fields. Each header field is comprised of a name and a value, separated by ': ' (a colon and a space).
Each header field is terminated by `\r\n`.

Considering that the last header field and the overall header itself are each terminated with `\r\n`,
and that the header is mandatory, this means that two `\r\n` sequences always precede the content part of a message.

Currently only a single header field is supported and required:

| Header Field Name | Value Type  | Description |
|:------------------|:------------|:------------|
| Content-Length    | number      | The length of the content part in bytes. This header is required. |
{: .table .table-bordered .table-responsive}

The header part is encoded using the 'ascii' encoding. This includes the `\r\n` separating the header and content part.

#### Content Part

Contains the actual content of the message. The content part of a message uses JSON to describe [requests](./specification#Base_Protocol_Request), [responses](./specification#Base_Protocol_Response), and [events](./specification#Base_Protocol_Event).

The content part is encoded using `utf-8`.

#### Example:

The example shows the JSON for the [next](./specification#Requests_Next) request:

```
Content-Length: 119\r\n
\r\n
{
    "seq": 153,
    "type": "request",
    "command": "next",
    "arguments": {
        "threadId": 3
    }
}
```

### Initialization

The first DAP request
Then the frontend sends an [**initialize**](./specification#Requests_Initialize) request to configure the adapter with client information about the path format (native or URI) and whether line and column values are 0 or 1 based.


Not every debug adapter can support all features defined by the protocol. DAP therefore provides  'capabilities'. A capability groups a set of language features. A development tool and the language server announce their supported features using capabilities. As an example, a debug adapter announces that it can handle the 'textDocument/definition' request, but it might not handle the 'workspace/symbol' request. Similarly, a debugger frontend announces its ability to provide 'about to save' notifications before a document is saved, so that a server can compute textual edits to format the edited document before it is saved.

**Notice** the actual integration of a debug adapter into a particular tool is not defined by the language server protocol and is left to the tool implementors.

### Launching and attaching to debuggees

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

### Session End

The frontend terminates a debug session with the [**disconnect**](./specification#Requests_Disconnect) request.
If the debug target was 'launched' *disconnect* is expected to terminate the target program (even forcefully if necessary).
If the debug target has been 'attached' initially, *disconnect* should detach it from the target (so that it will continue to run).
In both cases and in the case that the target terminated normally or crashed the debug adapter must fire a [**terminated**](./specification#Events_Terminated) event.
After receiving a response from the *disconnect* request, the frontend terminates the debug adapter.

## Libraries (SDKs) for DAP providers and consumers

To simplify the implementation of debug adapters there are libraries or SDKs:

- *Debug Adapter SDKs* for the different implementation languages there is an SDK to implement a debug adapter in a particular language. For example, to implement a debug adapter using Node.js there is the [debug adapter npm module](https://www.npmjs.com/package/vscode-debugadapter).

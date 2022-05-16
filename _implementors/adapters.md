---
layout: implementors
title:  "Debug Adapters"
shortTitle: "Debug Adapters"
author: Microsoft
index: 1
---

The following table lists the known debug adapters that implement the Debug Adapter Protocol. You may find these useful as reference material when writing your own debug adapter, or for use in your editor of choice.

Many adapters publish releases tailored for specific editors, such as VS Code, and some document how to run standalone DAP servers which can be used in any editor which supports them (in [IntelliJ](https://www.jetbrains.com/help/idea/configuring-third-party-tools.html) or [VS Code](https://code.visualstudio.com/api/extension-guides/debugger-extension#development-setup-for-mock-debug) for example).

| Adapter | Maintainer | Usage |
|---------|------------|-------|
[Android](https://github.com/adelphes/android-dev-ext)|[@adelphes](https://github.com/adelphes)|[VS Code](https://marketplace.visualstudio.com/items?itemName=adelphes.android-dev-ext)
[Apache Camel](https://github.com/camel-tooling/camel-debug-adapter)|[contributors](https://github.com/camel-tooling/camel-debug-adapter/graphs/contributors)|[VS Code](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-debug-adapter-apache-camel), [Eclipse](https://marketplace.eclipse.org/content/textual-debugging-apache-camel)
[Apex](https://github.com/forcedotcom/salesforcedx-vscode)|[@ntotten](https://github.com/ntotten)|[VS Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-apex-debugger)
[Ballerina](https://github.com/ballerina-platform/ballerina-lang/)|[Ballerina.io](https://ballerina.io/)|[VS Code](https://marketplace.visualstudio.com/items?itemName=wso2.ballerina) |
[C/C++](https://github.com/Microsoft/vscode-cpptools)|[@WardenGnaw](https://github.com/WardenGnaw)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
[C/C++/Rust](https://github.com/Marus/cortex-debug)|[@Marus](https://github.com/Marus)|[VS Code](https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug)
[C#](https://github.com/OmniSharp/omnisharp-vscode)|[@gregg-miskelly](https://github.com/gregg-miskelly)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
[Cordova Tools](https://github.com/Microsoft/vscode-cordova)|[@MSLaguana](https://github.com/MSLaguana)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools)
[Dart](https://github.com/Dart-Code/Dart-Code)|[@DanTup](https://github.com/DanTup) [@devoncarew](https://github.com/devoncarew)|[VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)
[Debug](https://github.com/WebFreak001/code-debug)|[@WebFreak001](https://github.com/WebFreak001)|[VS Code](https://marketplace.visualstudio.com/items?itemName=webfreak.debug)
[Debugger for Chrome](https://github.com/microsoft/vscode-chrome-debug)|[@roblourens](https://github.com/roblourens)|[VS Code](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
[Debugger for Edge](https://github.com/Microsoft/vscode-edge-debug2)|[@andysterland](https://github.com/andysterland)|[VS Code](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge)
[Debugger for Electron](https://github.com/Kode/vscode-electron-debug)|[@Kode](https://github.com/Kode)|[VS Code](https://marketplace.visualstudio.com/items?itemName=kodetech.electron-debug)
[Debugger for Firefox](https://github.com/hbenl/vscode-firefox-debug)|[@hbenl](https://github.com/hbenl)|[VS Code](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)
[Debugger for Krom](https://github.com/Kode/vscode-krom-debug)|[@Kode](https://github.com/Kode)|[VS Code](https://marketplace.visualstudio.com/items?itemName=kodetech.krom-debug)
[Debugger for IBM enterprise COBOL for z/OS](https://github.com/BroadcomMFD/debugger-for-mainframe)|[@Broadcom](https://www.broadcom.com)|[VS Code](https://marketplace.visualstudio.com/items?itemName=broadcomMFD.debugger-for-mainframe)
[Debugger for .NET Core](https://github.com/Samsung/netcoredbg)|[@ayuckhulk](https://github.com/ayuckhulk)|[DAP Server](https://github.com/Samsung/netcoredbg/blob/master/doc/cli.md)
[Debugger for PhantomJS](https://github.com/iradul/vscode-phantomjs-debug)|[@iradul](https://github.com/iradul)|[VS Code](https://marketplace.visualstudio.com/items?itemName=iradul.debugger-for-phantomjs)
[Debugger for Unity](https://github.com/Unity-Technologies/vscode-unity-debug)|[@lukaszunity](https://github.com/lukaszunity) [@miniwolf](https://github.com/miniwolf)|[VS Code](https://marketplace.visualstudio.com/items?itemName=Unity.unity-debug)
[DeZog - Z80 Assembly Debugger](https://github.com/maziac/dezog)|[@maziac](https://github.com/maziac)|[VS Code](https://marketplace.visualstudio.com/items?itemName=maziac.dezog)
[Duktape Debugger](https://github.com/svaarala/duktape)|[@svaarala](https://github.com/svaarala)|[VS Code](https://marketplace.visualstudio.com/items?itemName=HaroldBrenes.duk-debug)
[Elixir](https://github.com/elixir-lsp/elixir-ls)|[Elixir LSP](https://github.com/elixir-lsp)|[VS Code](https://marketplace.visualstudio.com/items?itemName=JakeBecker.elixir-ls)
[Emulicious Debugger](https://github.com/Calindro/emulicious-debugger)|[@Calindro](https://github.com/Calindro)|[VS Code](https://marketplace.visualstudio.com/items?itemName=emulicious.emulicious-debugger)
[Erlang](https://github.com/erlang-ls/erlang_ls)|[@robertoaloi](https://github.com/robertoaloi) and [Contributors](https://github.com/erlang-ls/erlang_ls/graphs/contributors)|[VS Code](https://marketplace.visualstudio.com/items?itemName=erlang-ls.erlang-ls)
[ESP32 Debugger](https://github.com/espressif/esp-debug-adapter)|[@espressif](https://github.com/espressif)|[DAP Server](https://github.com/espressif/esp-debug-adapter#usage)
[Firefox Remote Debug](https://github.com/yurydelendik/vscode-ff-debug)|[@yurydelendik](https://github.com/yurydelendik)|[VS Code](https://marketplace.visualstudio.com/items?itemName=yurydelendik.firefox-debug)
[Flash](https://github.com/vshaxe/flash-debugger)|[@vshaxe](https://github.com/vshaxe/)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vshaxe.haxe-debug)
[Go Delve Debugger](https://github.com/go-delve/delve/tree/master/service/dap)| [@polinasok](https://github.com/polinasok) and [Delve](https://github.com/go-delve)| [DAP Server](https://github.com/go-delve/delve/tree/master/Documentation/api/dap), [VS Code](https://github.com/golang/vscode-go/blob/master/docs/debugging.md)
[Harbour](https://github.com/APerricone/harbourCodeExtension)|[@APerricone](https://github.com/APerricone)|[VS Code](https://marketplace.visualstudio.com/items?itemName=aperricone.harbour)
[HashLink](https://github.com/vshaxe/hashlink-debugger)|[@vshaxe](https://github.com/vshaxe/)|[VS Code](https://marketplace.visualstudio.com/items?itemName=HaxeFoundation.haxe-hl)
[Haskell GHCi debug viewer Phoityne](https://github.com/phoityne/phoityne-vscode)|[@phoityne](https://github.com/phoityne)|[VS Code](https://marketplace.visualstudio.com/items?itemName=phoityne.phoityne-vscode)
[Haxe Eval](https://github.com/vshaxe/eval-debugger)|[@vshaxe](https://github.com/vshaxe/)|[VS Code](https://marketplace.visualstudio.com/items?itemName=nadako.vshaxe)
[HXCPP](https://github.com/vshaxe/hxcpp-debugger)|[@vshaxe](https://github.com/vshaxe/)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vshaxe.hxcpp-debugger)
[Java Debugger](https://github.com/Microsoft/vscode-java-debug)|[@akaroml](https://github.com/akaroml)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
[JavaScript Debugger](https://github.com/microsoft/vscode-js-debug)|[@connor4312](https://github.com/connor4312)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug)
[JavaScript with Time-Traveling and Persistent State](https://github.com/awto/effectfuljs/tree/master/packages/vscode-debugger)|[@awto](https://github.com/awto)|[VS Code](https://marketplace.visualstudio.com/items?itemName=effectful.debugger)
[JSIRDebugger](https://marketplace.visualstudio.com/items?itemName=muji.jsirdebugger)|muji
[Karate](https://github.com/intuit/karate/tree/develop/karate-core/src/main/java/com/intuit/karate/debug)|[@kirk_slota](https://twitter.com/kirk_slota) [@ptrthomas](https://twitter.com/ptrthomas)|[VS Code](https://marketplace.visualstudio.com/items?itemName=kirkslota.karate-runner)
[Kotlin](https://github.com/fwcd/kotlin-debug-adapter)|[@fwcd](https://github.com/fwcd)|[VS Code](https://marketplace.visualstudio.com/items?itemName=fwcd.kotlin)
[LLDB Debugger](https://github.com/vadimcn/vscode-lldb)|[@vadimcn](https://github.com/vadimcn)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)
[Lua and Ravi 5.3 Debugger](https://github.com/dibyendumajumdar/ravi-vscode-debugger)|[@dibyendumajumdar](https://github.com/dibyendumajumdar)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ravilang.ravi-debug)
[Lua Debug](https://github.com/actboy168/lua-debug)|[@actboy168](https://github.com/actboy168)|[VS Code](https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug)
[Mock Debug](https://github.com/Microsoft/vscode-mock-debug)|[@weinand](https://github.com/weinand)|[VS Code](https://marketplace.visualstudio.com/items?itemName=andreweinand.mock-debug)
[Mono Debug](https://github.com/Microsoft/vscode-mono-debug)|[@weinand](https://github.com/weinand)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug)
[NativeScript](https://github.com/NativeScript/nativescript-vscode-extension/)|[@ivanbuhov](https://github.com/ivanbuhov)|[VS Code](https://marketplace.visualstudio.com/items?itemName=Telerik.nativescript)
[Node Debug](https://github.com/Microsoft/vscode-node-debug)|[@weinand](https://github.com/weinand)|
[OCaml Earlybird](https://github.com/hackwaly/ocamlearlybird)|[@hackwaly](https://github.com/hackwaly)|[VS Code](https://marketplace.visualstudio.com/items?itemName=hackwaly.ocamlearlybird)
[OneScript Debug](https://github.com/EvilBeaver/OneScript)|[@EvilBeaver](https://github.com/EvilBeaver)|[VS Code](https://marketplace.visualstudio.com/items?itemName=EvilBeaver.oscript-debug)
[Papyrus](https://github.com/joelday/papyrus-debug-server)|[@joelday](https://github.com/joelday)|[VS Code](https://marketplace.visualstudio.com/items?itemName=joelday.papyrus-lang-vscode)
[Perl Debug](https://github.com/raix/vscode-perl-debug)|[@raix](https://github.com/raix)|[VS Code](https://marketplace.visualstudio.com/items?itemName=mortenhenriksen.perl-debug)
[Perl::LanguageServer](https://github.com/richterger/Perl-LanguageServer)|[@richterger](https://github.com/richterger)|[VS Code](https://marketplace.visualstudio.com/items?itemName=richterger.perl)
[Php](https://github.com/felixfbecker/vscode-php-debug)|[@felixfbecker](https://github.com/felixfbecker)|[VS Code](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
[PowerShell](https://github.com/PowerShell/vscode-powershell)|[@daviwil](https://github.com/daviwil) [@rkeithhill](https://github.com/rkeithhill)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell)
[Puppet](https://github.com/lingua-pupuli/puppet-editor-services)|[@glennsarti](https://github.com/glennsarti) [@jpogran](https://github.com/jpogran)|[VS Code](https://marketplace.visualstudio.com/items?itemName=jpogran.puppet-vscode)
[Python](https://github.com/Microsoft/vscode-python)|[@DonJayamanne](https://github.com/DonJayamanne)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
[R Debugger](https://github.com/ManuelHentschel/VSCode-R-Debugger)|[@ManuelHentschel](https://github.com/ManuelHentschel)|[VS Code](https://marketplace.visualstudio.com/items?itemName=RDebugger.r-debugger)
[React Native Tools](https://github.com/Microsoft/vscode-react-native/issues)|[@MSLaguana](https://github.com/MSLaguana)|[VS Code](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
[Ruby](https://github.com/rubyide/vscode-ruby)|[@rebornix](https://github.com/rebornix)|[VS Code](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
[Ruby Byebug](https://rubygems.org/gems/byebug-dap)|[Ethan Reesor](https://gitlab.com/firelizzard)|
[Ruby Byebug (VSCode)](https://gitlab.com/firelizzard/vscode-byebug)|[Ethan Reesor](https://gitlab.com/firelizzard)|[VS Code](https://marketplace.visualstudio.com/items?itemName=ethan-reesor.vscode-byebug)
[Rust (for embedded)](https://github.com/probe-rs/vscode)|[probe.rs community](https://github.com/probe-rs)|[VS Code](https://probe.rs/docs/tools/vscode/)
[SWI-Prolog](https://github.com/eshelyaron/debug_adapter)|[@eshelyaron](https://github.com/eshelyaron)|[SWI and Emacs](https://github.com/eshelyaron/debug_adapter#installation)
[SWF](https://github.com/BowlerHatLLC/vscode-nextgenas)|[@joshtynjala](https://github.com/joshtynjala)|[VS Code](https://marketplace.visualstudio.com/items?itemName=bowlerhatllc.vscode-nextgenas)
[TLA+](https://github.com/tlaplus/vscode-tlaplus)|[@lemmy](https://github.com/lemmy)|[VS Code](https://marketplace.visualstudio.com/items?itemName=alygin.vscode-tlaplus-nightly)
[VDM-SL, VDM++, VDM-RT](https://github.com/nickbattle/vdmj/tree/master/lsp)|[@nickbattle](https://github.com/nickbattle)|[VS Code](https://marketplace.visualstudio.com/items?itemName=jonaskrask.vdm-vscode)
[VSCode rdbg Ruby Debugger](https://github.com/ruby/vscode-rdbg)|[@ko1](https://github.com/ko1)|[VS Code](https://marketplace.visualstudio.com/items?itemName=KoichiSasada.vscode-rdbg)
{: .table .table-bordered .table-responsive}

*If you are missing a debug adapter implementation please create a pull request in GitHub against this markdown [document](https://github.com/Microsoft/debug-adapter-protocol/blob/gh-pages/_implementors/adapters.md)*

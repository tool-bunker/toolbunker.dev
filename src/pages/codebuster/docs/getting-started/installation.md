---
layout: ../../../../layouts/DocsLayout.astro
title: Installation
description: Install Code Buster with Homebrew, a native installer, Cargo, or a source build.
---

# Installation

Install a native Code Buster release or build the canonical Rust CLI from
source. Native packages do not require a Rust toolchain. The executable is
named `cb`.

> **Pre-1.0 software:** Code Buster is under heavy development. It can already
> support local repository exploration and provide additional context to AI
> coding agents, but behavior and findings may change before version 1.0.0. Do
> not yet use it as a blocking quality gate in a production pipeline. Treat CI
> and report integrations as evaluation or non-blocking visibility.

## Homebrew

On Apple Silicon macOS:

```sh
brew install tool-bunker/tap/code-buster
cb version
```

After installation, use `cb update` to upgrade through Homebrew.

## Install script

On Apple Silicon macOS or x86-64 Linux:

```sh
curl -fsSL https://toolbunker.dev/codebuster/install | sh
```

The script downloads the latest native release, verifies its SHA-256 checksum,
and installs `cb` under `${PREFIX:-$HOME/.local}/bin`.

To inspect the script before running it:

```sh
curl -fsSL https://toolbunker.dev/codebuster/install -o install-code-buster.sh
less install-code-buster.sh
sh install-code-buster.sh
```

## Windows

From PowerShell on x86-64 Windows:

```powershell
irm https://toolbunker.dev/codebuster/install.ps1 | iex
```

The script verifies the release checksum and installs `cb.exe` under
`$HOME\.local\bin`. Add that directory to `PATH` when the installer asks.

To inspect it before execution:

```powershell
Invoke-WebRequest https://toolbunker.dev/codebuster/install.ps1 -OutFile install-code-buster.ps1
Get-Content .\install-code-buster.ps1
& .\install-code-buster.ps1
```

## Cargo

With Rust 1.88 or newer installed, build and install the pinned release:

```sh
cargo install code-buster --version 0.14.4 --locked
cb version
```

## Updating

Run the updater regardless of whether Code Buster was installed with Homebrew,
Cargo, the verified native installer, or from a local source checkout:

```sh
cb update
```

Preview the detected channel and command without changing the installation:

```sh
cb update --dry-run
```

The Homebrew channel runs `brew update` followed by
`brew upgrade code-buster`. The Cargo channel installs the latest crates.io
release. Native installations rerun the verified installer into their existing
prefix; on Windows, that installer is scheduled to run after the current `cb`
process exits so `cb.exe` can be replaced. Local source builds reinstall their
checkout without fetching or changing its Git state.

## Build from source

Run these commands from the `code-buster/` directory:

```sh
cargo build --release --locked
./target/release/cb version
```

The release executable is self-contained and can be copied to a directory on
your `PATH`.

During development, run the debug build directly:

```sh
cargo run --locked -- version
```

Use the release executable for performance measurements and release evidence
so startup behavior matches distributed builds.

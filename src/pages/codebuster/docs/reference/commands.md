---
layout: ../../../../layouts/DocsLayout.astro
title: Commands
description: Reference for Code Buster command families and common global options.
---

# Commands

Reference for Code Buster command families and common global options.

Run `cb --help` to inspect the command surface and global options supported by
the installed version.

## Analysis and review

| Command | Purpose |
| --- | --- |
| `summary` | Repository overview, findings, language counts, coverage, and run manifest |
| `review` | Review findings, changed lines, remediation plans, and structured actions |
| `inspect` | Explain path classification, relationships, and dependency reachability |
| `graph` | Dependency graph |
| `dead` | Unreachable production code |
| `duplication` | Repeated source blocks |
| `quality` | Quality gates, scores, complexity, hotspots, and repository structure |
| `rules` | List rules or explain one rule's rationale and remediation |

## Repository operations

| Command | Purpose |
| --- | --- |
| `baseline` | Create, update, prune, or inspect a finding baseline |
| `fix` | Preview or apply supported safe fixes |
| `init [language] [path]` | Create minimal or language-aware repository configuration |
| `doctor` | Diagnose setup, discovery, and processing |
| `config` | Explain configuration or show selected files |
| `update` | Update Code Buster through its detected installation channel |
| `completions` | Generate shell completion data |
| `version` | Print the runtime version |

## Focused views

Focused views are options on the command that owns their data rather than
separate top-level commands.

| Invocation | Purpose |
| --- | --- |
| `cb review --pr` | Review findings on pull-request lines changed from the branch merge base |
| `cb review --changed-base <revision>` | Review findings on lines changed from a Git revision |
| `cb review --format plan` | Prioritized remediation plan |
| `cb review --format actions` | Structured remediation actions |
| `cb review --only feature-flag --advisory` | Feature-flag lifecycle references |
| `cb quality --score` | Per-file quality scores |
| `cb quality --complexity` | Function and cognitive complexity |
| `cb quality --hotspots` | Concentrated change and maintenance risk |
| `cb quality --structure` | Repository and package structure |
| `cb inspect --related <path>` | Files related to a source path |
| `cb inspect --why <path>` | Why a source path is reachable |
| `cb inspect --path <source> <target>` | Dependency route between two paths |
| `cb rules <rule-id>` | Rule rationale, limitations, and remediation |
| `cb config --files` | Files selected by the resolved configuration |

`duplication` includes grouped duplicate blocks; there is no separate cluster
view.

`cb review --pr` reads the target branch from CI when available, then tries
`origin/HEAD`, `origin/main`, `origin/master`, `main`, and `master`. It reports
an error when no merge base is available. Use `--changed` for staged, unstaged,
and untracked work relative to `HEAD`.

`cb init <profile>` writes a language- or framework-specific policy in the
current directory. Rust and Bevy receive a strict Cargo source boundary, and
Bevy rules activate only after `Cargo.toml` declares Bevy. Python, JavaScript,
TypeScript, Dart, and Java receive conservative source-root policies. Go and C#
are pinned without an imposed directory layout. Add a path to target another
existing directory, for example `cb init bevy <path>`. Plain `cb init [path]`
retains automatic language detection and includes inactive examples for the
main configuration sections.

## Updating Code Buster

`cb update` detects Homebrew, crates.io Cargo, verified native-installer, and
local-source installations. Use `cb update --dry-run` to print the selected
channel and subprocesses without changing the installed executable. An
unrecognized copied executable is not overwritten; the command explains the
supported reinstall choices and exits with status 2.

## Common options

Common options include `--root`, `--language`, `--format`, `--include-tests`,
`--include-examples`, `--include-vendored`, `--all`, `--no-cache`, and
command-specific targets. Prefer `--format json` for automation. Use
`--no-cache` for a one-off uncached run and `--fail-on-issues` when findings
must control the process exit status.

## Profile rule execution

Run a complete, automatically uncached timing profile:

```sh
cb summary --profile
```

The terminal report sorts independently scheduled rule packs from slowest to
fastest and separates shared analysis from independently measurable rule
checks. Percentages are relative to the measured section so shared work is not
incorrectly assigned to every rule that consumes it.

For structured microsecond measurements:

```sh
cb summary --profile --format json
```

The profile is available for `summary` with text or JSON output. It cannot be
combined with `--cache` or `--cache-dir`.

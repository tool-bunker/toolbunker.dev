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
| `init` | Create minimal repository configuration |
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

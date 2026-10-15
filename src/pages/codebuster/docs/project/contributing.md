---
layout: ../../../../layouts/DocsLayout.astro
title: Contributing
description: Develop Code Buster, add precise rules, and build maintainable source fixtures.
---

# Contributing

Develop Code Buster, add precise rules, and keep the generated catalog and
execution plan deterministic.

Run development commands from the `code-buster/` directory. Rust 1.88 or newer
is required. Read the repository's `CONTRIBUTING.md` for the complete
contribution contract.

## Branches

Open pull requests against `main`. Keep feature and fix branches short-lived.
`main` is the single long-lived branch and must remain releasable.

## Development checks

```sh
cargo fmt --all -- --check
cargo clippy --all-targets --all-features --locked -- -D warnings
cargo test --all-targets --all-features --locked
cargo package --allow-dirty --locked
cargo build --release --locked
./target/release/cb version
```

## Project layout

- Language analyzers: `src/languages/<language>/`
- Repository-wide analyzers: `src/rules/`
- Auto-discovered execution packs: `src/rule_packs/`
- Canonical rule definitions: `rules/catalog/<language>/<rule-id>.json`
- CLI commands: `src/app/commands/`
- Integration tests: `tests/`

## Add a rule

1. Add the detector to the matching analyzer or a focused module beside it.
2. Add `rules/catalog/<language>/<rule-id>.json`.
3. Point the definition's `packs` and `implementation` fields at the executing
   family and source file.
4. Add focused positive, negative, and plausible false-positive coverage.
5. Run the focused test and then the complete checks above.

`build.rs` discovers and validates catalog definitions and execution packs.
Normal rules do not require edits to a parallel registry, execution planner, or
CLI listing.

## Test evidence

Prefer compact inline source for one-expression lexical cases. Use test helpers
or fixtures for multiline, formatting-sensitive, line-sensitive, or multi-file
behavior. Cover comments and string literals whenever textual matching can
encounter them, and do not format intentionally malformed fixtures.

## Releases

Add user-visible notes under `## Unreleased`, then run:

```sh
./tool/prepare-release.sh <version>
```

The script updates Cargo metadata, the lockfile, the pinned README source
install, and the changelog heading. It does not tag, push, or publish.

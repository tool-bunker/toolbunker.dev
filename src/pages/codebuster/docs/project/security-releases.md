---
layout: ../../../../layouts/DocsLayout.astro
title: Security and releases
description: Understand Code Buster security findings, trust boundaries, and release assurance controls.
---

# Security and releases

Interpret security findings and understand release assurance controls.

## Trust boundaries

Code Buster analyzes untrusted repository contents. Discovery does not follow directory symlinks, output paths are constrained, and reports distinguish processing failures from clean analysis. Treat source text, manifests, imported SARIF, and repository configuration as untrusted input.

## Finding semantics

A security heuristic can identify a confirmed defect, a suspicious pattern, or a review hotspot depending on rule metadata. Preserve that classification in CI and integrations. Do not present every hotspot as a vulnerability, and do not suppress diagnostics that make a run incomplete.

## Safe operation

- Review configuration and included source categories before enforcing a gate.
- Keep generated, vendored, test, and unsupported coverage visible.
- Preview `cb fix` changes before applying them.
- Pin the executable and report schema in automation.
- Report suspected vulnerabilities privately using the process in `SECURITY_ASSURANCE.md`.

## Release checks

Prepare the version in a reviewed pull request:

```sh
./tool/prepare-release.sh <version>
cargo fmt --all -- --check
cargo clippy --all-targets --all-features --locked -- -D warnings
cargo test --all-targets --all-features --locked
cargo package --allow-dirty --locked
cargo build --release --locked
./target/release/cb version
```

After that pull request is merged, a maintainer manually runs the
`Code Buster Release` workflow from `main` with the exact package version. The
workflow rechecks formatting, Clippy, tests, packaging, the changelog heading,
and the pinned README install command before it creates the tag. It then builds
and smokes native Linux, macOS, and Windows artifacts and publishes checksums.

## Release evidence

CI audits the committed lockfile with RustSec and builds on all supported
release operating systems. `tool/rehearse-release.sh` builds and exercises the
host artifact from an exact committed Git archive. Fresh self-analysis should
also complete with zero processing diagnostics:

```sh
cb summary --root . --format json --advisory --no-cache
```

See the repository's `SECURITY_ASSURANCE.md` for the maintained assurance case, trust boundaries, open hardening work, and private reporting process. Release history is recorded in `CHANGELOG.md`; executable release checks live in `.github/workflows/release.yml`.

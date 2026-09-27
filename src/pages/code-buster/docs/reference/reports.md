---
layout: ../../../../layouts/DocsLayout.astro
title: Reports
description: Understand Code Buster human output, machine formats, findings, coverage, and run status.
---

# Reports

Understand human output, machine formats, findings, coverage, and run status.

## Human output

- **Text**: terminal-oriented findings and summaries.
- **Markdown**: stable review tables for rendered reports.

## Machine formats

- **JSON**: complete versioned report envelope.
- **NDJSON**: line-delimited records for streaming consumers.
- **SARIF 2.1.0**: code-scanning interchange.
- **JUnit XML**: CI systems that ingest test reports.

## Graph output

- **Mermaid**: dependency or configured architecture graphs.

These seven formats are selected with `--format`. Format support varies for commands whose output is not a finding report; run `cb <command> --help` and reject unsupported formats rather than assuming a fallback.

## Findings

A finding includes a stable rule code, severity, path, one-based line range, message, confidence, rationale, remediation suggestion, related files, and a stable fingerprint where applicable. Consumers should key policy on rule codes and documented fields rather than parsing human messages.

## Coverage

Coverage records selected production files and auxiliary categories such as tests, examples, vendored code, generated code, unsupported files, binary files, ignored paths, and unchanged files. A report's finding count is meaningful only with its coverage.

## Run manifest and diagnostics

The manifest records source and configuration identity, selected file counts, languages, coverage, and completion status. Processing diagnostics report recoverable and fatal analysis problems. Consumers must reject failed or untrustworthy runs rather than interpreting an absent finding as a clean result.

## Security interpretation

Security hotspots are review prompts, not automatically confirmed vulnerabilities. Preserve the rule's security classification and confidence when forwarding findings to another system.

## Compatibility

Machine envelopes are schema-versioned. Pin Code Buster in automation, reject unsupported schema versions, and review changes to the default compatibility contract before updating downstream snapshots.

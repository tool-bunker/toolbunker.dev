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

Complexity findings lead with a plain-language concern: too many decision paths, difficult-to-follow control flow, or both. Text and Markdown omit the numeric counters by default. Add `--verbose` to see cyclomatic and cognitive measurements alongside their configured limits; terminal output dims this supporting detail. Grouped localization findings retain their grouping information. Machine formats preserve the original complexity message and measurements.

File/function length, duplicate blocks, JSON field mismatches, concentrated signs of unnecessary flexibility, and broad exception handlers also use descriptive headlines. Verbose supporting detail retains line counts and limits, duplicate fingerprints, mismatched field names, and contributing YAGNI rules. TODO marker messages remain unchanged. Human presentation does not change rule detection, finding identity, or machine-readable evidence.

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

JSON and NDJSON findings also expose their effective `mode`: `report` is actionable and `count` is advisory. This reflects rule and group configuration using the command's taxonomy. Severity is independent: an `error` can still be advisory, and an `info` finding can be actionable. Disabled rules do not produce findings.

## Coverage

Coverage records selected production files and auxiliary categories such as tests, examples, vendored code, generated code, unsupported files, binary files, ignored paths, and unchanged files. A report's finding count is meaningful only with its coverage.

## Analyzed source metrics

Add `--verbose` to JSON or NDJSON finding-report commands to request language-aware source measurements:

```sh
cb review --advisory --verbose --no-cache --format=json
```

The additional JSON root field, or NDJSON summary-record field, is:

```json
{
  "sourceMetrics": {
    "schemaVersion": 1,
    "codeLines": 1,
    "fileCodeLines": {
      "src/main.rs": 1
    }
  }
}
```

`fileCodeLines` covers every selected source path, including files with zero code lines; `codeLines` is its sum. Measurements use the same Rust/Python inline-test masking as analysis, classify comments by source language, and exclude Rust doc-comment examples. Embedded runtime code and string-literal content remain code, including Python runtime docstrings.

These are measurements of analyzed source, not the repository's total size. Use the effective finding modes rather than severity to distinguish actionable findings from advisories. Source metrics are omitted unless verbose JSON or NDJSON is requested; ordinary scans do not run the counters.

## Run manifest and diagnostics

The manifest records source and configuration identity, selected file counts, languages, coverage, and completion status. Processing diagnostics report recoverable and fatal analysis problems. Consumers must reject failed or untrustworthy runs rather than interpreting an absent finding as a clean result.

## Security interpretation

Security hotspots are review prompts, not automatically confirmed vulnerabilities. Preserve the rule's security classification and confidence when forwarding findings to another system.

## Compatibility

Machine envelopes are schema-versioned. Pin Code Buster in automation, reject unsupported schema versions, and review changes to the default compatibility contract before updating downstream snapshots.

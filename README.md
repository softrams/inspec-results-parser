# Simple inspec results parser

Simple inspec results parser to produce a summary at control level tests summary.

## Requirements

- NodeJS 10.x or greater

## Usage

```bash
npx @softrams/inspec-results-parser <inspecresults.json> [--verbose]
```

## Sample Results

```bash
$ npx @softrams/inspec-results-parser ./mitre__baseline_profile_results.json

File: ./mitre__baseline_profile_results.json

Profile:  nginx-baseline
Controls:  42

All Tests:
 { passed: 2592, failed: 148, skipped: 7 }

Test Summary by Passed/Failed/Skipped Controls:
 {
  passed: { cnt: 13, passed: 381, failed: 0, skipped: 0 },
  failed: { cnt: 24, passed: 2211, failed: 148, skipped: 2 },
  skipped: { cnt: 5, passed: 0, failed: 0, skipped: 5 }
}
```

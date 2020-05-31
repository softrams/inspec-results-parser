# Simple inspec results parser

Simple inspec results parser to produce a summary of controls by status along with aggregated tests with the same status under those controls.

When reviewing results from an inspec run, it will be useful to look at

- Total number of controls passed/failed and skipped
- Total number of tests passed/failed and skipped and
- Total number of tests aggregated by passed/failed/skipped controls

Please see the background discussion and usecase for this level of summary information at https://github.com/mitre/heimdall-lite/issues/216.

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

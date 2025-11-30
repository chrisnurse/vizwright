# About this folder

This folder contains the Playwright baseline tests for the Vizwright sample application.

The purpose of the tests is to assess that Playwright can test in realistic yet complicated
scenarios that users would experience in a modern web applications.

The sample dashboard app can be served in two states:

1. With `data-testid` attributes on key elements for reliable selection
2. Without `data-testid` attributes, relying on more complex selectors

`data-testid` selectors are the most reliable way to select elements for testing, and yet they are
rarely implemented thoroughly by development teams, citing concerns about polluting code,
maintainance overhead, and even risk of leaking test IDs into production, where bot attacks may be
facilitated.

The fact is build processes can easily strip out test IDs from production builds, and the overhead
of maintaining test IDs is minimal compared to the benefits of having reliable selectors that
increase the efficiency of automated testing processes.

To execute the tests with data-testid attributes, run the run-baseline-tests.sh script which
executes tests and gathers results in the `with-test-id` folder.

Conversely, to test without data-testid attributes, run the run-baseline-no-test-id.sh script which
executes tests and gathers results in the `without-test-id` folder.

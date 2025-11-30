# About this folder

/assets contains foundational components that wrap Playwright functionality and
provide reusable functions beneficial for all future projects.

**CRITICAL**: If possible, this is the only folder where our code touches
Playwright directly. We will abstract Playwright functionality here to defend
against breaking changes in Playwright releases, and to simplify operations such
as find and click, essentially raising abstraction and recuding code
consumer-side.

# Apply six audit fixes

## Changes
- Replace the homepage description and remove unsupported claim language found in user-facing copy, while preserving the explicit disclaimers on Sources.
- Make “Something else” open Mind Unloader directly.
- Align Thought Spin durations across method data, homepage card, and method page.
- Correct the methods index introduction.
- Remove unfinished placeholder boxes from Terms and Privacy, adding each requested quiet status line while retaining headings and real prose.
- Replace the About author placeholder with Kenneth’s supplied paragraph.

## Verification
- Search all user-facing source for the flagged claim terms and placeholder markup/copy.
- Confirm every rendered page is free of dashed placeholder boxes.
- Check the affected pages in the browser and confirm the Mind Unloader opens.
- Confirm the project build succeeds and report all changed files and search findings.

## Technical details
- Reuse existing semantic text and spacing tokens only.
- Keep the shared placeholder component available unless it is no longer referenced; no redesign or unrelated copy changes.

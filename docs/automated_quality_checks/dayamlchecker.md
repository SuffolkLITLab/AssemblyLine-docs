---
id: dayamlchecker
title: "DAYamlChecker: static analysis and linting"
sidebar_label: DAYamlChecker
slug: dayamlchecker
---

# DAYamlChecker: static analysis and linting

`dayamlchecker` is a static analysis tool for Docassemble packages. It reads interview
YAML, embedded Python and Mako, Python test modules, and Word (`.docx`) templates, and
reports broken interview logic, syntax errors, broken URLs, style problems, and Web
Content Accessibility Guidelines (WCAG) failures.

![A terminal running dayamlchecker over a questions directory, listing findings with codes EA502, EA509, WA518, EG414, and WG123](../assets/quality_checks/dayamlchecker_cli_preview.png)

---

## Installation

`dayamlchecker` requires Python 3.12 or later.

```bash
# With pip
pip install dayamlchecker

# Or as a standalone tool with uv
uv tool install dayamlchecker
```

To work on `dayamlchecker` itself:

```bash
git clone https://github.com/SuffolkLITLab/DAYamlChecker.git
cd DAYamlChecker
pip install -e .
```

Installing provides two commands, `dayamlchecker` and `dayamlchecker-fmt` (a formatter
for interview YAML). The examples below use `python3 -m dayamlchecker`, which is
equivalent to running `dayamlchecker` and works even when the script directory is not on
your `PATH`.

---

## Running DAYamlChecker

Pass files or directories. Directories are searched recursively, skipping `.git*`,
`.github*`, `build`, `dist`, `node_modules`, and `sources` unless you pass `--check-all`.

```bash
# One interview
python3 -m dayamlchecker docassemble/MyPackage/data/questions/interview.yml

# Every interview in a package
python3 -m dayamlchecker docassemble/MyPackage/data/questions/

# Word templates
python3 -m dayamlchecker docassemble/MyPackage/data/templates/

# Both at once
python3 -m dayamlchecker docassemble/MyPackage/data/
```

---

## What DAYamlChecker checks

Findings belong to one of four classes: `general`, `accessibility`, `style`, and
`translatability`. Each finding has a code whose first letter is its severity (`E` error,
`W` warning, `I` info) and whose second letter is its class (`G`, `A`, `S`, `T`).

### 1. YAML structure and Docassemble integrity (`general`)

| Check area | Description | Example codes |
| :--- | :--- | :--- |
| YAML syntax | Unclosed quotes, indentation mistakes, invalid characters | `EG102` (YAML parse error) |
| Duplicate keys | A key repeated inside one block | `EG101` |
| Duplicate block ids | An `id:` reused across blocks, where Docassemble silently keeps the last one | `EG104` |
| Docassemble keys | Unrecognized keys in a block | `EG301` |
| Question ids | A `question` block with no `id:` | `EG414` |
| Mandatory logic | More than one unconditioned `mandatory: True` block | `WG415` |
| Field definitions | Empty `fields:`, fields that collect no input, empty variable targets | `EG418`, `EG420`, `EG421` |
| Test modules | A Python test module that does not start with `# do not pre-load`, which makes Docassemble import it during server startup | `EG105` |

### 2. Embedded Python, Mako, and JavaScript (`general`)

- **Python code blocks**: syntax errors (`EG122`), and a warning when a code block defines
  a function that belongs in a Python module instead (`WG123`).
- **Mako**: `${ ... }` expressions and `% if ...` control lines inside questions,
  subquestions, and field values (`EG111`, `EG112`), plus malformed Markdown links in
  Mako-rendered text (`WG113`).
- **JavaScript**: `datatype: js` expressions, including `.val()` calls and references to
  fields that are not on the screen (`EG204`–`EG207`).

### 3. WCAG and web accessibility (`accessibility`)

Accessibility checks run by default. Disable them with `--no-wcag`.

- **Heading structure**: skipped Markdown heading levels such as `##` to `####`
  (`EA506`), and the same in HTML (`EA507`).
- **Alt text**: Markdown images (`EA505`), HTML `<img>` tags, and Docassemble
  `[FILE ...]` tags. Write `[FILE logo.png, alt="Suffolk LIT Lab logo"]`.
- **Link text**: empty links (`EA508`), non-descriptive text such as "click here",
  "here", "read more", and Spanish equivalents like "haga clic aquí" (`EA509`), the same
  link text pointing at different destinations (`WA518`), and links that open a new tab
  without telling the user (`WA519`).
- **Field labels**: `no label` and empty labels on screens with two or more fields
  (`EA502`), non-descriptive labels (`WA512`), and duplicate labels on one screen
  (`WA515`).
- **Comboboxes**: off by default while the rule is evaluated. Turn it on with
  `--accessibility-error-on-widget combobox` (`EA501`).
- **Custom theme contrast**: when a theme is loaded with `features: bootstrap theme:`,
  the CSS is parsed and body text, navbar links, dropdown items, and buttons are checked
  against a 4.5:1 minimum ratio (`EA504`).
- **Display templates**: templates shown with `display_template()` need a `subject`
  (`WA529`).
- **PDF tagging**: an informational note when an attachment does not set
  `tagged pdf: True` (`IA503`).

WCAG checks still report YAML parse errors, so one run surfaces both broken YAML and
accessibility failures. This is source analysis: it cannot see problems that only appear
in a rendered page or in JavaScript at runtime.

### 4. DOCX template accessibility (`accessibility`)

Any `.docx` file you pass is opened and its OpenXML structure inspected. These checks run
by default; `--no-docx-accessibility` skips them.

- **Alt text**: images (`WA541`), shapes and other objects (`WA542`), placeholder alt
  text (`WA548`), and alt text on images marked decorative (`WA547`).
- **Links**: empty link text (`WA543`), a raw URL used as link text (`WA549`), and
  ambiguous link text (`WA550`).
- **Document metadata**: missing document language (`WA545`) and missing document title
  (`IA561`).
- **Headings**: documents with no headings (`WA556`), empty headings (`WA555`), a first
  heading below level 1 (`WA557`), and skipped levels (`WA558`).
- **Tables**: no header row marker (`WA552`), merged cells (`WA546`), and tables that
  look like they are being used for layout (`WA551`).
- **Reading order**: floating objects (`WA553`) and text boxes (`WA554`) that pull text
  out of the main flow.
- **Spacing**: long runs of empty paragraphs used instead of paragraph spacing
  (`IA565`) and manually typed list numbering (`IA566`).

Because a DOCX has no line numbers, each finding names the package part it came from
(`word/document.xml`, `word/header1.xml`) and quotes up to 80 characters of nearby text
so you can search for it in Word:

```text
WARN  [WA552] docassemble/MyPackage/data/templates/discovery.docx
  a table in word/document.xml has no obvious header row marker
  (table begins "Certificate of Service")
```

:::tip DOCX findings are warnings by default
Every DOCX finding is capped at **warning** severity, so turning these checks on reports
problems without failing a build. Most existing templates have findings today, and the
intent is for authors to work through them over time. Pass
`--docx-accessibility-severity error` to restore each rule's own severity and fail on
errors.
:::

#### Why DOCX is checked here and PDF is checked with veraPDF

`dayamlchecker` checks DOCX templates directly, while PDF templates are validated by
**veraPDF** inside the [`da_build`](./github_actions.md#da_build) action. A DOCX is a zip
of XML that pure Python can read, so the check is fast and runs anywhere. Validating
PDF/UA-1 means implementing a large ISO specification, and veraPDF is the reference
implementation — but it is a Java application, and bundling a JRE into a Python linter
would be a heavy price for local use. So `da_build` installs veraPDF in CI, where a Java
runtime is already available.

### 5. Broken URLs

Absolute HTTP and HTTPS links in interview files, and in the `data/templates` files
those interviews sit alongside, are requested concurrently. A broken link in a question
file is an error; a broken link in a template is a warning by default.

```bash
# URL checking is on by default
python3 -m dayamlchecker docassemble/MyPackage/data/questions/

# Skip endpoints that block CI or are known to be flaky
python3 -m dayamlchecker --url-check-ignore-urls "https://flaky-court.gov,https://status.example.org" docassemble/MyPackage/data/questions/

# Turn it off, for example when working offline
python3 -m dayamlchecker --no-url-check docassemble/MyPackage/data/questions/
```

### 6. Style and translatability (`style`, `translatability`)

Assembly Line style checks are opt in.

```bash
# Deterministic style and translatability rules
python3 -m dayamlchecker --style docassemble/MyPackage/data/questions/

# Add rules backed by an OpenAI-compatible model
OPENAI_API_KEY="sk-..." python3 -m dayamlchecker --style-llm docassemble/MyPackage/data/questions/
```

`--style-llm` implies `--style`, and reads `OPENAI_BASE_URL`, `OPENAI_API_KEY`, and
`OPENAI_MODEL` from the environment when the matching flags are not given.

Style rules cover plain language, screen titles, overlong labels, too many fields on one
screen, review screens, and inclusive gender and pronoun fields. They also include the
rule that `#` and `<h1>` belong to the `question` itself and should not appear in a
`subquestion` (`ES701`).

Translatability rules use `WT` codes: choice lists whose labels are translated but whose
stored values are not invariant (`WT701`), user-facing strings written inside Python code
(`WT702`), and conditional expressions or Mako blocks that change only part of a sentence
and so cannot be translated as a unit (`WT703`, `WT704`).

---

## Fixing findings automatically

Four of the rules above describe a change with only one sensible answer: a question block
with no `id:`, a yes/no shorthand, a duplicate block id, and an unlabeled field on a
multi-field screen. Pass `--fix` and `dayamlchecker` rewrites those in place, then runs
the normal check and reports whatever is left.

```bash
python3 -m dayamlchecker --fix docassemble/MyPackage/data/questions/
```

| Code | What it changes |
| :--- | :--- |
| `EG414` | Adds `id:` to a question block, derived from the question text |
| `EG104` | Suffixes later duplicate block ids (`review answers`, `review answers 2`) |
| `EA510` | Expands a `yesno:` / `noyes:` shorthand into `fields:` with an explicit `datatype:` |
| `EA502` | Labels the first unlabeled field on a multi-field screen with the question text |

Given this interview:

```yaml
---
question: |
  Do you agree to the terms?
yesno: user_agrees
---
question: |
  Tell us about your income
fields:
  - no label: income_amount
    datatype: currency
  - Employer: employer_name
---
id: review answers
question: Review your answers
---
id: review answers
question: Review them again
```

`--fix` reports what it changed and then re-checks the result:

```text
Fix mode: scanned 1 YAML files; wrote changes in 1; skipped 0; rejected 0.
Fixes by rule: {'EA502': 1, 'EA510': 1, 'EG104': 1, 'EG414': 2}
No issues found.
```

```yaml
---
id: "do you agree to the terms"
question: |
  Do you agree to the terms?
fields:
  - no label: user_agrees
    datatype: yesnoradio
---
id: "tell us about your income"
question: |
  Tell us about your income
fields:
  - "Tell us about your income": income_amount
    datatype: currency
  - Employer: employer_name
---
id: review answers
question: Review your answers
---
id: "review answers 2"
question: Review them again
```

### What the fixes actually do

**Generated ids** are the question text reduced to lowercase letters, digits and spaces.
Punctuation and Mako delimiters become word separators, so `${city_only_address}` becomes
`city only address`, while apostrophes are dropped rather than split on, so `didn't`
becomes `didnt`. Two questions that differ only in punctuation or case therefore collide,
and the second is suffixed. Ids you wrote yourself are never rewritten; a duplicate one
only gains a suffix.

**Yes/no shorthands** keep their meaning: `yesno:` and `noyes:` become
`datatype: yesnoradio`, and `yesnomaybe:` / `noyesmaybe:` become `datatype: yesnomaybe`.
This changes what the applicant sees — a screen that was two buttons becomes a radio
group with a Continue button — so it is worth loading one converted screen before you
merge a large batch.

**Field labels** are the screen's question text, and only the *first* unlabeled field on
a screen is labeled. The question can only sensibly describe one field, so the rest are
left reported for you to write by hand. That also makes the fix stable: running `--fix`
again will not start consuming the fields left for review.

When the question text uses Mako line directives, the label moves to the long form,
because `% if` only works at the start of a line and cannot survive being folded into a
one-line label:

```yaml
fields:
  - label: |
      % if filled_by_attorney:
      Does ${ users[0] } want to be the guardian?
      % else:
      Do you want to be the guardian?
      % endif
    field: wants_guardianship
    datatype: yesnoradio
```

Inline `${ ... }` expressions evaluate fine mid-line and keep the shorter form.

### What it will not do

Every edit is checked before it is written. A file is rewritten only when the result
still parses, introduces no new finding of *any* rule, and actually removes the finding
the edit was made for. A file that fails any of those is left untouched and reported on
standard error:

```text
Fix skipped docassemble/MyPackage/data/questions/intake.yml: could not safely rewrite id near line 6
Fix rejected docassemble/MyPackage/data/questions/income.yml: candidate introduces new findings: WA515 (0 -> 1)
```

That second one is the interesting case: labeling a field with the question text would
have produced two fields sharing a label on the same screen, so the edit was thrown away
rather than trading one finding for another.

A file the fixer cannot rewrite is a limit of the fixer, not a problem in your interview,
so it does not by itself fail the run — only real findings affect the exit code.

:::note `--fix` respects the flags that turn rules off
`--fix` never rewrites source for a rule the same run would not report. With `--no-wcag`
it leaves `EA510` and `EA502` alone, and `--suppress EG414` means no ids are generated.
`# no-dayc:` comments are honored the same way. This also means `--suppress ALL` disables
fixing entirely, which is worth remembering if you use it to quiet the output.
:::

### Previewing before you write

`--fix` writes immediately. To see the plan first, run the fixer directly — its default
mode is a dry run, and `--report` writes the summary as JSON:

```bash
# Show what would change, without touching anything
python3 -m dayamlchecker.fixer docassemble/MyPackage/data/questions/

# Same, saved as JSON
python3 -m dayamlchecker.fixer --report fixes.json docassemble/MyPackage/data/questions/

# Write the changes
python3 -m dayamlchecker.fixer --write docassemble/MyPackage/data/questions/
```

```text
Mode: dry-run
YAML files scanned: 1
Files with changes: 1
Files skipped: 0
Files rejected by validation: 0
Changes by rule: {'EA502': 1, 'EA510': 1, 'EG104': 1, 'EG414': 2}
```

:::tip Fix on a clean branch
The fixes preserve your formatting and touch only the lines they need to, but they are
still automated edits across every file you point at. Commit or stash your work first, so
`git diff` shows you exactly what the fixer did.
:::

---

## Suppressing findings

Suppress by code (`EA509`) or by finding class (`accessibility`, `style`,
`translatability`, `general`). `ALL` or `*` suppresses everything at that location.

### On one line

```yaml
subquestion: |
  Please [click here](https://example.com) for details.  # no-dayc: EA509
```

### For a whole block

Put `# no-dayc-block:` anywhere inside the block, usually just after the `---` separator:

```yaml
---
# no-dayc-block: accessibility, EG301
question: Custom widget
fields:
  - no label: custom_widget_data
```

### For a whole run

```bash
python3 -m dayamlchecker --suppress accessibility,EG101 docassemble/MyPackage/
```

:::note DOCX findings can only be suppressed on the command line
`# no-dayc:` and `# no-dayc-block:` comments live in YAML, and a Word document has
nowhere to put them. Silence a noisy DOCX rule with `--suppress` instead, for example
`--suppress IA561` for the missing document title.
:::

---

## Command line reference

| Flag | Description | Default |
| :--- | :--- | :--- |
| `files` | One or more YAML, Python, or DOCX files or directories | Required |
| `--suppress CODE` | Suppress a code or finding class; repeatable and comma-separated | none |
| `--check-all` | Search ignored directories too (`.git*`, `.github*`, `build`, `dist`, `node_modules`, `sources`) | off |
| `--fix` | Apply the four deterministic fixes in place, then check the result | off |
| `--no-wcag` | Turn off WCAG accessibility checks | WCAG on |
| `--accessibility-error-on-widget WIDGET` | Treat a widget, such as `combobox`, as an error | none |
| `--style` | Turn on Assembly Line style and translatability rules | off |
| `--style-llm` | Add LLM-backed style rules; implies `--style` | off |
| `--openai-base-url URL` | Base URL for an OpenAI-compatible API | `OPENAI_BASE_URL` |
| `--openai-api-key KEY` | API key for `--style-llm` | `OPENAI_API_KEY` |
| `--openai-model MODEL` | Model name for `--style-llm` | `OPENAI_MODEL`, else `gpt-4o-mini` |
| `--url-check` / `--no-url-check` | Check that URLs resolve | on |
| `--url-check-timeout SECONDS` | Per-request HTTP timeout | `10` |
| `--url-check-root PATH` | Repository root used to find related template files | inferred |
| `--url-check-ignore-urls URLS` | Comma- or newline-separated URLs to skip | none |
| `--url-check-skip-templates` | Do not check URLs inside `data/templates` files | off |
| `--template-url-severity CHOICE` | Severity for broken template URLs: `error`, `warning`, `ignore` | `warning` |
| `--unreachable-url-severity CHOICE` | Severity for URLs that could not be reached at all | `warning` |
| `--docx-accessibility` / `--no-docx-accessibility` | Check DOCX templates | on |
| `--docx-accessibility-severity CHOICE` | Severity cap for DOCX findings: `warning` or `error` | `warning` |
| `--format CHOICE` | `text`, or `github` for GitHub Actions annotations | `text` |
| `--max-warnings N` | Fail if more than N warnings are reported | no limit |

---

## Python API

```python
from dayamlchecker import (
    RuntimeOptions,
    find_errors_from_string,
    find_style_findings_from_string,
)

yaml_code = """
id: user_income
question: What is your income?
fields:
  - Income: user_income
    datatype: currency
"""

for finding in find_errors_from_string(yaml_code, input_file="interview.yml"):
    print(f"[{finding.code}] {finding.message} (line {finding.line_number})")

style_findings = find_style_findings_from_string(
    yaml_code,
    input_file="interview.yml",
    runtime_options=RuntimeOptions(style_enabled=True),
)
```

---

## Related documentation

- **[Running checks before you push](./running_checks_locally.md)**
- **[GitHub Actions](./github_actions.md)**
- **[Logs and artifacts](./navigating_logs_and_artifacts.md)**
- **[Making Docassemble interviews accessible](../coding_style/accessibility.md)**

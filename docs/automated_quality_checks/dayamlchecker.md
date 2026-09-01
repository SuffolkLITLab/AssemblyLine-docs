---
id: dayamlchecker
title: "DAYamlChecker: Static Analysis & Linter"
sidebar_label: DAYamlChecker
slug: dayamlchecker
---

# DAYamlChecker: Static Analysis & Linter

`dayamlchecker` is a static analysis tool and Language Server Protocol (LSP) implementation designed specifically for **Docassemble** YAML interview packages, Python modules, and Word (`.docx`) templates.

It detects broken interview logic, syntax errors in embedded code, broken URLs, style guide violations, and Web Content Accessibility Guidelines (WCAG) failures before code is pushed to production.

![DAYamlChecker Terminal Output](../../static/img/quality_checks/dayamlchecker_cli_preview.png)

---

## Installation

`dayamlchecker` requires Python 3.10+ (Python 3.12 recommended).

### Install via pip
```bash
pip install dayamlchecker
```

### Install via uv
```bash
uv tool install dayamlchecker
```

### Install from source
If you are contributing to or developing `dayamlchecker`:
```bash
git clone https://github.com/SuffolkLITLab/DAYamlChecker.git
cd DAYamlChecker
pip install -e .
```

---

## Running DAYamlChecker

### Check a single interview file
```bash
python3 -m dayamlchecker docassemble/MyPackage/data/questions/interview.yml
```

### Check all YAML files in a package
```bash
python3 -m dayamlchecker docassemble/MyPackage/data/questions/
```

Or recursively find all interview YAML files:
```bash
find docassemble -name "*.yml" -path "*/questions/*" | xargs python3 -m dayamlchecker
```

### Check DOCX templates for accessibility
Pass the template directory directly:
```bash
python3 -m dayamlchecker docassemble/MyPackage/data/templates/
```

---

## What DAYamlChecker Checks

`dayamlchecker` categorizes findings into four primary classes: `general`, `accessibility`, `style`, and `translatability`.

### 1. YAML Structure and Docassemble Integrity (`general`)

| Check Area | Description | Example Codes |
| :--- | :--- | :--- |
| **YAML Syntax** | Unclosed quotes, indentation mistakes, invalid characters | `EG103` (`yaml_parse_error`) |
| **Duplicate Keys** | Repeated keys in dictionaries or question blocks | `EG101` (`yaml_duplicate_key`) |
| **Duplicate IDs** | Reused `id:` tags across question blocks | `EG102` (`yaml_duplicate_block_id`) |
| **Docassemble Keys** | Unrecognized top-level keys in question blocks | `EG105` (`unknown_keys`) |
| **Question IDs** | Missing mandatory `id:` attributes on questions | `WG104` (`missing_question_id`) |
| **Mandatory Logic** | Multiple unconditioned `mandatory: True` blocks | `EG108` (`multiple_mandatory_blocks`) |
| **Field Definitions** | Invalid choices structures, missing variable names | `EG110` (`fields_empty`), `EG111` (`fields_no_input`) |

### 2. Embedded Python, Mako, and JavaScript (`general`)

`dayamlchecker` parses and validates code embedded inside YAML blocks:

- **Python Code Blocks**: Verifies Python syntax (`python_syntax_error`), prohibits illegal function definitions inside simple code blocks, and validates datatype assignments.
- **Mako Expressions**: Validates Mako templates `${ ... }` and `% if ... %` control tags inside strings, subquestions, and field definitions (`mako_syntax_error`, `mako_compile_error`).
- **JavaScript Modifiers**: Checks client-side JavaScript expressions in `datatype: js` fields, ensuring correct `.val()` method invocations and valid field references.

### 3. WCAG & Web Accessibility (`accessibility`)

Accessibility checks run by default. They catch static WCAG 2.1/2.2 violations directly in interview YAML source code:

- **Heading Structure**:
  - Detects skipped Markdown headings (`##` jumping to `####`) (`accessibility_markdown_heading_level_skip`).
  - Detects skipped HTML headings (`<h2>` jumping to `<h4>`) (`accessibility_html_heading_level_skip`).
  - Flags improper use of `<h1>` or `#` (which should only be set by the main `question` tag).
- **Alternative Text for Images**:
  - Markdown images missing alt text: `![](image.png)` (`accessibility_image_missing_alt_text`).
  - HTML images missing alt text: `<img src="logo.png">`.
  - Docassemble `[FILE ...]` tags missing alt text: `[FILE logo.png]`. Must be written as `[FILE logo.png, alt="Suffolk LIT Lab Logo"]`.
- **Descriptive Hyperlink Text**:
  - Flags empty links: `[]()`.
  - Flags non-descriptive links: `"click here"`, `"here"`, `"read more"`, `"link"`, `"more info"`, and Spanish equivalents like `"haga clic aquí"` (`accessibility_non_descriptive_link_text`).
  - Flags links opening in a new tab (`target="_blank"`) without warning users in the link text or icon.
- **Form Control Labels**:
  - Prohibits `no label` and empty labels on screens with two or more fields (`accessibility_no_label_multi_field`).
  - Flags non-descriptive or duplicate field labels on the same screen.
- **Combobox Widgets**:
  - Comboboxes pose severe screen reader barriers. Opt into combobox errors with `--accessibility-error-on-widget combobox` (`accessibility_combobox_not_accessible`).
- **Custom Theme Color Contrast**:
  - When a custom Bootstrap theme is loaded via `features: bootstrap theme: ...`, `dayamlchecker` parses the CSS and calculates the contrast ratio for body text, navbar links, dropdown items, and buttons against their backgrounds (requiring at least 4.5:1 for normal text and 3:1 for large text) (`accessibility_theme_contrast_too_low`).
- **Display Templates**:
  - Ensures templates invoked via `display_template()` define a descriptive `subject` (`accessibility_display_template_missing_subject`).
- **PDF Tagging**:
  - Emits informational notes when DOCX attachment blocks lack `tagged pdf: True` (`accessibility_tagged_pdf_not_enabled`).

### 4. DOCX Template Accessibility (`accessibility`)

When passed `.docx` template files, `dayamlchecker` inspects the internal OpenXML structure:

- **Image & Object Alt Text**: Flags images, shapes, and charts missing alternative text descriptions.
- **Hyperlinks**: Detects empty hyperlinks and raw URLs used as link text.
- **Document Language**: Validates that document language metadata is set.
- **Heading Hierarchy**: Checks that Word heading styles (`Heading 1`, `Heading 2`, etc.) do not skip levels.
- **Table Headers & Merged Cells**: Flags tables without repeated header rows (`tblHeader`) and tables with complex merged cells that disrupt screen readers.
- **Reading Order Distruptions**: Detects floating objects and text boxes that pull text out of the primary document flow.
- **Spacing Paragraphs**: Identifies long runs of empty paragraphs used for spacing instead of paragraph margins.

:::tip Default Severity for DOCX
DOCX accessibility findings are capped at **warning** severity by default so that existing templates do not immediately break CI builds. Use `--docx-accessibility-severity error` to enforce strict document accessibility.
:::

### 5. Broken URL Verification

`dayamlchecker` automatically extracts all absolute HTTP and HTTPS links in interview questions and template files, pinging them concurrently to verify they return valid HTTP 200 responses:

```bash
# Check questions and templates for broken URLs
python3 -m dayamlchecker docassemble/MyPackage/data/questions/

# Ignore known flaky endpoints
python3 -m dayamlchecker --url-check-ignore-urls "https://flaky-court.gov,https://status.example.org" path/to/questions/

# Disable URL checking (e.g. offline environments)
python3 -m dayamlchecker --no-url-check path/to/questions/
```

### 6. Style and Translatability (`style`, `translatability`)

Enable Document Assembly Line style checks with `--style` or `--style-llm`:

```bash
# Deterministic style and translatability checks
python3 -m dayamlchecker --style path/to/questions/

# LLM-assisted style analysis using an OpenAI-compatible endpoint
OPENAI_API_KEY="sk-..." python3 -m dayamlchecker --style-llm path/to/questions/
```

- **Translatability (`WT` codes)**:
  - Flags choice lists with translated labels that lack invariant stored values.
  - Flags user-facing strings hardcoded inside Python code blocks instead of YAML fields.
  - Detects conditional Mako expressions that split a sentence across multiple blocks, breaking language grammatical structures during automated translation.

---

## Suppressing Findings

You can suppress specific diagnostics inline within YAML files or globally via the command line.

### Inline Suppression (Single Line)
Add `# no-dayc: <CODE>` at the end of the line:

```yaml
question: |
  Review your information  # no-dayc: EA501
subquestion: |
  Please [click here](https://example.com) for details.  # no-dayc: WA502
```

### Block Suppression (Entire Document Block)
Add `# no-dayc-block: <CODES>` anywhere inside the YAML block (typically right below the `---` separator):

```yaml
---
# no-dayc-block: accessibility, EG105
question: Custom Complex Widget
fields:
  - no label: custom_widget_data
```

### Suppress All Codes
Use `ALL` or `*` to silence all findings for a line or block:
```yaml
# no-dayc: ALL
```

### Global CLI Suppression
Pass comma-separated codes or finding classes to `--suppress`:
```bash
python3 -m dayamlchecker --suppress accessibility,EG101,WA502 docassemble/MyPackage/
```

---

## Command-Line Reference

| Flag | Description | Default |
| :--- | :--- | :--- |
| `files` | One or more YAML/Python/DOCX files or directories to validate | Required |
| `--suppress CODE` | Suppress specific finding codes or classes (can be repeated or comma-separated) | `[]` |
| `--check-all` | Do not skip ignored directories (`.git`, `build`, `dist`, `node_modules`) | `False` |
| `--no-wcag` | Disable WCAG accessibility static checks | WCAG on |
| `--accessibility-error-on-widget WIDGET` | Treat specific widgets (e.g. `combobox`) as accessibility errors | None |
| `--style` | Enable Assembly Line style and translatability rules | `False` |
| `--style-llm` | Enable LLM-backed style analysis (requires OpenAI API key) | `False` |
| `--openai-base-url URL` | Base URL for OpenAI-compatible API | `OPENAI_BASE_URL` |
| `--openai-api-key KEY` | API Key for LLM style checking | `OPENAI_API_KEY` |
| `--openai-model MODEL` | Model name for LLM checking | `gpt-4o-mini` |
| `--url-check` / `--no-url-check` | Enable or disable URL reachability validation | `--url-check` |
| `--url-check-timeout SECONDS` | HTTP request timeout for URL validation | `10` |
| `--url-check-ignore-urls URLS` | Comma- or newline-separated absolute URLs to skip | `""` |
| `--url-check-skip-templates` | Skip checking URLs found in `data/templates` files | `False` |
| `--template-url-severity CHOICE` | Severity for broken URLs in templates (`error`, `warning`, `ignore`) | `warning` |
| `--unreachable-url-severity CHOICE`| Severity for unreachable network connections (`error`, `warning`, `ignore`) | `warning` |
| `--docx-accessibility` / `--no-docx-accessibility` | Enable or disable DOCX accessibility auditing | `--docx-accessibility` |
| `--docx-accessibility-severity CHOICE` | Severity cap for DOCX findings (`warning`, `error`) | `warning` |
| `--format CHOICE` | Output format (`text`, `github`) | `text` |
| `--max-warnings N` | Maximum allowed warnings before failing with non-zero exit code | None |

---

## Python Module API

You can also use `dayamlchecker` programmatically in Python test suites or custom scripts:

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

# Check YAML structure and accessibility
findings = find_errors_from_string(yaml_code, input_file="interview.yml")
for finding in findings:
    print(f"[{finding.code}] {finding.message} (line {finding.line_number})")

# Run style analysis
options = RuntimeOptions(style_enabled=True)
style_findings = find_style_findings_from_string(yaml_code, runtime_options=options)
```

---

## Related Documentation

- **[Assembly Line GitHub Actions](./github_actions.md)**: Run DAYamlChecker automatically on every commit and pull request.
- **[Navigating Logs and Artifacts](./navigating_logs_and_artifacts.md)**: How to read DAYamlChecker annotations and summaries in GitHub CI.
- **[Making Docassemble Interviews Accessible](../coding_style/accessibility.md)**: Full guide to WCAG standards and accessible interview design.

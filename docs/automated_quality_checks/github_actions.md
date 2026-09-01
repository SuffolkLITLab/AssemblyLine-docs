---
id: github_actions
title: "Assembly Line GitHub Actions (ALActions)"
sidebar_label: GitHub Actions
slug: github_actions
---

# Assembly Line GitHub Actions (ALActions)

The **[SuffolkLITLab/ALActions](https://github.com/SuffolkLITLab/ALActions)** repository provides a suite of reusable GitHub Actions specifically designed for Docassemble interview packages. 

These composite actions automate linting, syntax compilation, DOCX template validation, visual Word diffs, accessibility auditing with **veraPDF**, automated playground deployments, and server health monitoring.

---

## Action catalog overview

| Action | Primary Use Case | Triggers | Key Artifacts / Summaries |
| :--- | :--- | :--- | :--- |
| **[`da_build`](#da_build)** | Package build, Python compile, YAML linting, DOCX & PDF accessibility, URL check | `push`, `pull_request` | GitHub Annotations for broken URLs, DOCX warnings, and PDF/UA-1 failures |
| **[`valid_jinja2`](#valid_jinja2)** | Validates Jinja2 expressions inside `.docx` Word templates | `push`, `pull_request` (on `.docx` paths) | Step Summary table and `jinja-validation` HTML artifact |
| **[`word_diff`](#word_diff)** | Converts changed `.docx` templates to Markdown and HTML visual diffs | `pull_request`, `workflow_dispatch` | Markdown diff in Step Summary and `word-doc-diff` HTML bundle |
| **[`black-formatting`](#black-formatting)** | Enforces PEP 8 Python formatting via Black | `push`, `pull_request` | Formatting failure diffs in job log |
| **[`docsig`](#docsig)** | Checks Google-style Python docstrings against function signatures | `push`, `pull_request` | Docstring signature mismatch warnings |
| **[`pythontests`](#pythontests)** | Executes automated Python unit tests (`unittest`/`pytest`), Mypy, and Bandit | `push`, `pull_request` | Test run output, type check, and security audit |
| **[`da_playground_install`](#da_playground_install)** | Deploys package to a specific Docassemble playground project | `push` (branches / feature branches) | Live interview instance in developer playground |
| **[`da_package`](#da_package)** | Installs package server-wide on a Docassemble server | `push` (e.g. `main` or release tags) | Server-wide package deployment |
| **[`hall_monitor`](#hall_monitor)** | Synthetic uptime monitoring of live interviews on a server | `schedule` (cron) | Alerts via SendGrid, Mailgun, or Microsoft Teams |

---

## `da_build`: Comprehensive package and YAML check {#da_build}

`da_build` is the primary build and validation action for Docassemble packages. It performs the following checks and build steps:

1. **Python compilation**: Runs `python -m compileall .` to ensure all Python source files are syntactically valid.
2. **Package build**: Uses `uv build` to build binary wheels and source tarballs in `dist/`.
3. **YAML verification**: Executes [`dayamlchecker`](./dayamlchecker.md) across all interview YAML files under `docassemble/*/data/questions/` for structural integrity, syntax errors, and WCAG rules.
4. **DOCX accessibility auditing**: Checks all Word (`.docx`) templates in `docassemble/*/data/templates/` for OpenXML accessibility barriers (missing alt text, unrepeated table headers, merged cells, heading skips) using `dayamlchecker`.
5. **PDF accessibility auditing**: Downloads **veraPDF** (PDF/UA-1 validation engine) and verifies that all PDF templates in `docassemble/*/data/templates/` comply with PDF/UA-1 accessibility standards.
6. **URL checking**: Concurrently checks all absolute URLs in question files and template files, reporting broken links and redirects as GitHub Actions annotations.

### Sample workflow

Create `.github/workflows/build_and_check.yml`:

```yaml
name: Build and Check Package

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-validate:
    runs-on: ubuntu-latest
    steps:
      - name: Build, Lint, and Check
        uses: SuffolkLITLab/ALActions/da_build@main
        with:
          python-version: "3.12"
          # Optional: ignore known flaky or rate-limited external domains
          ignore-urls: |
            https://example.com/known-flaky-endpoint
            https://masscourts.gov/status
          # Optional: 'warning' (default), 'error', or 'off'
          pdf-validation-mode: "warning"
          pdf-strict: "false"
```

### Action inputs and configuration options

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `python-version` | Python version for virtual environment and uv | `"3.12"` | No |
| `skip-url-check` | Set to `"true"` to disable external URL network validation | `"false"` | No |
| `skip-templates` | Set to `"true"` to skip URL checks in `data/templates/` | `"false"` | No |
| `ignore-urls` | Comma- or newline-separated absolute URLs to ignore in URL checks | `""` | No |
| `pdf-validation-mode` | How to report veraPDF PDF/UA-1 failures (`"warning"`, `"error"`, `"off"`) | `"warning"` | No |
| `pdf-strict` | Set to `"true"` to enable strict PDF/UA-1 checking on form field tab order | `"false"` | No |

### DOCX and PDF template checks in `da_build`

`da_build` validates all document templates located in the package's `data/templates/` directory, regardless of whether a particular YAML interview references them:

- **DOCX template accessibility**: `dayamlchecker` inspects all `.docx` templates in `data/templates/` for OpenXML structure issues (missing image/shape alt text, unrepeated table headers, merged cells, heading hierarchy skips). Findings are reported as non-blocking warnings by default.
- **PDF template accessibility (veraPDF)**: Audits all `.pdf` templates in `data/templates/` against the **PDF/UA-1** (ISO 14289-1) specification.
- **Template URL validation**: Hyperlinks inside `.docx` templates and YAML files are validated concurrently unless skipped.

#### Controlling template check behavior

- **Controlling PDF validation mode**: Set `pdf-validation-mode: "warning"` (default), `"error"` (fails the build on PDF/UA-1 issues), or `"off"` (skips veraPDF). Set `pdf-strict: "true"` to enforce tab-order rules on fillable forms.
- **Skipping template URL validation in CI**: Set `skip-templates: "true"` on the `da_build` action step to ignore URLs inside `data/templates/`.
- **Suppressing specific DOCX/YAML findings in code**: Add block-level suppressions inside your YAML files (such as `# no-dayc-block: accessibility, WA552`) to suppress specific rule findings per interview block.
- **Auditing DOCX templates locally with strict enforcement**: When running `dayamlchecker` from your local terminal, you can audit your template directory directly and enforce strict zero-error standards:
  ```bash
  python3 -m dayamlchecker --docx-accessibility-severity error docassemble/MyPackage/data/templates/
  ```

---

## `valid_jinja2`: DOCX template expression validator {#valid_jinja2}

Docassemble uses `docxtpl` (Jinja2) to assemble Microsoft Word documents. A single typographical error like `{{ user.firs_name }}` or an unclosed `{% if %}` tag can cause a live interview to crash when generating a document.

`valid_jinja2` inspects all modified and newly added `.docx` files in a pull request:

- **Syntax errors**: Invalid Jinja expressions (e.g. unclosed tags, malformed expressions) fail the build.
- **Custom filter awareness**: Recognizes over 70 common Docassemble and Assembly Line filters (such as `currency`, `date`, `title_case`, `phone_number_3_parts`, `word`, `ordinal`, `comma_and_list`). Unknown filters emit non-blocking warnings.
- **GitHub step summary**: Automatically posts a formatted Markdown summary directly into the GitHub Actions run summary.
- **HTML artifacts**: Generates detailed AST validation reports uploaded as artifacts.

### Sample workflow

Create `.github/workflows/validate_docx.yml`:

```yaml
name: Validate DOCX Templates

on:
  pull_request:
    paths:
      - '**/*.docx'
  push:
    paths:
      - '**/*.docx'
  workflow_dispatch:

jobs:
  validate-templates:
    runs-on: ubuntu-latest
    steps:
      - name: Validate DOCX Jinja2 templates
        uses: SuffolkLITLab/ALActions/valid_jinja2@main
        with:
          artifact_name: jinja-validation-report
          output_dir: jinja_validation
          summary_file: jinja_validation_summary.md
```

### Action inputs and configuration options

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `base_ref` | Git comparison base (auto-detected from pull request event) | Auto | No |
| `working_directory` | Relative working directory path | `.` | No |
| `artifact_name` | Name of the uploaded artifact bundle | `jinja-validation` | No |
| `output_dir` | Directory where HTML reports are stored | `jinja_validation` | No |
| `summary_file` | Path for Markdown summary file | `jinja_validation_summary.md` | No |
| `skip_checkout` | Set to `"true"` if repository checkout was handled earlier in the job | `"false"` | No |

---

## `word_diff`: Visual diffing for Word templates {#word_diff}

Reviewing binary `.docx` files in GitHub pull requests is notoriously difficult because GitHub only shows binary file replacements.

`word_diff` is not an error-checking or pass/fail gate—it runs on pull requests that touch Word documents and always generates a comparison report even when nothing is wrong. It extracts the text of changed `.docx` files, converts them into cleanly wrapped Markdown, and generates side-by-side HTML diffs:

![Word Diff Side by Side Preview](../../static/img/quality_checks/word_diff_preview.png)

### Key features

1. **Inline step summary**: Displays unified line-by-line diffs in the GitHub Actions Step Summary.
2. **Rich HTML artifact**: Generates a side-by-side HTML comparison complete with an `index.html` table of contents for downloading and reviewing in any web browser.
3. **Template tag preservation**: Retains Jinja2 variables (`{{ ... }}`) and formatting tags in the diff so you can review changes to both text and dynamic logic.

### Sample workflow

Create `.github/workflows/word_diff.yml`:

```yaml
name: Diff Word Documents

on:
  pull_request:
    paths:
      - '**/*.docx'
  workflow_dispatch:

jobs:
  docx-diff:
    runs-on: ubuntu-latest
    steps:
      - name: Diff Word documents
        uses: SuffolkLITLab/ALActions/word_diff@main
        with:
          artifact_name: word-doc-diff
          output_dir: word_diffs
          summary_file: word_diff_summary.md
```

### Action inputs and configuration options

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `base_ref` | Git comparison base ref/SHA (auto-detected from pull request or push) | Auto | No |
| `working_directory` | Relative path to run the diff from | `.` | No |
| `artifact_name` | Name of the uploaded artifact bundle | `word-doc-diff` | No |
| `output_dir` | Directory where diff files and `index.html` are stored | `word_diffs` | No |
| `summary_file` | File path where the Markdown summary is written | `word_diff_summary.md` | No |
| `skip_checkout` | Set to `"true"` to skip internal `actions/checkout` | `"false"` | No |

---

## `black-formatting`: Python code formatter {#black-formatting}

`black-formatting` runs [Black](https://black.readthedocs.io/en/stable/) across all Python files in the repository to ensure consistent PEP 8 formatting.

### Sample workflow

```yaml
jobs:
  lint-python:
    runs-on: ubuntu-latest
    steps:
      - name: Check Python formatting
        uses: SuffolkLITLab/ALActions/black-formatting@main
```

### Configuration and outputs

- **Outputs**:
  - `linting-passed`: Set to `"true"` if all Python files pass formatting checks, or `"false"` if unformatted files are found.
- **`pyproject.toml` Configuration**: Black reads project configuration from `pyproject.toml`:

```toml
[tool.black]
line-length = 88
target-version = ['py312']
extend-exclude = '(__init__.py|setup.py)'
```

---

## `docsig`: Python docstring validation {#docsig}

`docsig` verifies that Python docstrings match function and method signatures (checking parameter names, return types, and docstring formatting). Assembly Line packages adhere to **Google-style docstrings**.

### Sample workflow

```yaml
jobs:
  docstrings:
    runs-on: ubuntu-latest
    steps:
      - name: Validate docstrings
        uses: SuffolkLITLab/ALActions/docsig@main
```

### Configuration and outputs

- **Outputs**:
  - `tests-passed`: Exit code and status of the docsig run.
- **Behavior**: Scans all `.py` files while ignoring test files, `setup.py`, and `__init__.py`. Configurable via `pyproject.toml` (`[tool.docsig]` table).

---

## `pythontests`: Python unit tests and security audit {#pythontests}

`pythontests` provides an automated testing and security analysis pipeline for Assembly Line packages:

1. **Dependency Sync**: Automatically checks `pyproject.toml` for `[dependency-groups]`. Runs `uv sync --group dev` if present, or `uv sync`.
2. **Static Type Checking**: Runs `mypy . --exclude '^build/' --explicit-package-bases` to enforce Python typing.
3. **Security Analysis**: Executes **Bandit** (`uv tool run bandit -r . --severity-level=high`) to scan for common security vulnerabilities.
4. **Test Suite**: Runs `pytest` across package test modules.

### Sample workflow

```yaml
jobs:
  test-python:
    runs-on: ubuntu-latest
    steps:
      - name: Run Python tests and security scans
        uses: SuffolkLITLab/ALActions/pythontests@main
```

### Configuration and outputs

- **Outputs**:
  - `tests-passed`: Status code of the pytest test suite.
- **Configuration files**:
  - `pyproject.toml`: Configures `[tool.pytest.ini_options]`, `[tool.mypy]`, and `[tool.bandit]`.

---

## `da_playground_install` and `da_package`: Automated deployments {#da_playground_install}

These actions automate deploying your interview package to test servers or developer playgrounds.

### Deploy to playground (`da_playground_install`)

Installs the package branch directly to a specific developer's playground project on a Docassemble server. This enables reviewers to interactively test the interview:

```yaml
name: Deploy to Playground

on:
  push:
    branches:
      - 'feature/**'

jobs:
  deploy-playground:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Deploy to Docassemble Playground
        uses: SuffolkLITLab/ALActions/da_playground_install@main
        with:
          SERVER_URL: ${{ secrets.SERVER_URL }}
          DOCASSEMBLE_DEVELOPER_API_KEY: ${{ secrets.DOCASSEMBLE_DEVELOPER_API_KEY }}
          PROJECT_NAME: "test-review-${{ github.ref_name }}"
          # Optional: numerical user ID (defaults to owner of API key)
          # USER_ID: 1
          # Optional: 0 to skip server restart
          # RESTART: 0
```

#### Action inputs

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | Base URL of the Docassemble server (e.g. `https://apps-dev.example.org`) | None | **Yes** |
| `DOCASSEMBLE_DEVELOPER_API_KEY` | Developer API key with package installation privileges | None | **Yes** |
| `PROJECT_NAME` | Name of the playground project to install into | None | **Yes** |
| `USER_ID` | Numerical user ID for the Docassemble account | API key owner | No |
| `RESTART` | Control server restart (`0` to skip restart) | Standard restart | No |

---

### Install server-wide (`da_package`)

Installs the package server-wide on a staging or production Docassemble server:

```yaml
name: Deploy Package Server-Wide

on:
  push:
    branches:
      - main

jobs:
  deploy-package:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Package
        uses: SuffolkLITLab/ALActions/da_package@main
        with:
          SERVER_URL: ${{ secrets.PROD_SERVER_URL }}
          DOCASSEMBLE_DEVELOPER_API_KEY: ${{ secrets.DOCASSEMBLE_DEVELOPER_API_KEY }}
          # Optional: install from GitHub repository URL or specific branch
          # GITHUB_URL: "https://github.com/SuffolkLITLab/docassemble-MyPackage"
          # GITHUB_BRANCH: "main"
          # Optional: install from PyPI package name
          # PYPI_PACKAGE: "docassemble.MyPackage"
```

#### Action inputs

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | Base URL of the Docassemble server | None | **Yes** |
| `DOCASSEMBLE_DEVELOPER_API_KEY` | Developer API key with server-wide package installation privileges | None | **Yes** |
| `GITHUB_URL` | Optional GitHub URL of the package to install | Current repo | No |
| `GITHUB_BRANCH` | Optional branch of the GitHub repo | Default branch | No |
| `PYPI_PACKAGE` | Optional package name to install from PyPI | None | No |

---

## `hall_monitor`: Synthetic uptime monitoring {#hall_monitor}

`hall_monitor` visits a live Docassemble server on a scheduled cron interval, verifying that all installed interviews (or the homepage) load successfully without a 500 error or uncaught exception.

When an outage or error is detected, `hall_monitor` sends alert notifications via **SendGrid**, **Mailgun**, or **Microsoft Teams**:

```yaml
name: Hall Monitor Uptime Check

on:
  schedule:
    # Run every morning at 7:00 AM UTC and evening at 7:00 PM UTC
    - cron: "0 7,19 * * *"
  workflow_dispatch:

jobs:
  monitor-server:
    runs-on: ubuntu-latest
    steps:
      - name: Run Hall Monitor
        uses: SuffolkLITLab/ALActions/hall_monitor@main
        with:
          SERVER_URL: "https://apps.example.org"
          CHECK_TYPE: "list"
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
          ERROR_EMAIL_FROM: "alerts@example.org"
          ERROR_EMAILS: "dev-team@example.org,admin@example.org"
          # Or Mailgun configuration:
          # MAILGUN_API_KEY: ${{ secrets.MAILGUN_API_KEY }}
          # MAILGUN_DOMAIN: ${{ secrets.MAILGUN_DOMAIN }}
          # Or Microsoft Teams webhook:
          # TEAMS_MONITOR_WEBHOOK: ${{ secrets.TEAMS_WEBHOOK_URL }}
```

#### Action inputs

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `SERVER_URL` | URL of the Docassemble server to monitor | None | **Yes** |
| `CHECK_TYPE` | `"list"` (checks `/list` endpoint of installed interviews) or `"homepage"` (checks `/`) | `"list"` | No |
| `SENDGRID_API_KEY` | SendGrid API key for failure email alerts | None | No |
| `MAILGUN_API_KEY` | Mailgun API key for failure email alerts | None | No |
| `MAILGUN_DOMAIN` | Mailgun domain to send error emails from | None | No |
| `ERROR_EMAIL_FROM` | Sender email address for error alerts | None | No |
| `ERROR_EMAILS` | Comma-separated list of recipient email addresses | None | No |
| `TEAMS_MONITOR_WEBHOOK`| Microsoft Teams incoming webhook URL for failure announcements | None | No |

---

## Standard production quality workflow template

Here is a complete `.github/workflows/quality_checks.yml` configuration combining all static validation, template verification, and code formatting into a single cohesive CI pipeline:

```yaml
name: Quality Checks & Validation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  # 1. Package build, YAML linting, URL check, and veraPDF
  package-build-and-lint:
    runs-on: ubuntu-latest
    steps:
      - name: Build, Lint, and Check
        uses: SuffolkLITLab/ALActions/da_build@main
        with:
          python-version: "3.12"
          pdf-validation-mode: "warning"

  # 2. DOCX Jinja2 syntax validation
  validate-docx-templates:
    runs-on: ubuntu-latest
    steps:
      - name: Validate DOCX Jinja2 Expressions
        uses: SuffolkLITLab/ALActions/valid_jinja2@main

  # 3. Word document visual diffs on PRs
  diff-word-documents:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - name: Diff Word Documents
        uses: SuffolkLITLab/ALActions/word_diff@main

  # 4. Python code formatting, type checking, security audit, and unit tests
  python-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check Black Formatting
        uses: SuffolkLITLab/ALActions/black-formatting@main
      - name: Check Docstrings
        uses: SuffolkLITLab/ALActions/docsig@main
      - name: Run Unit Tests and Security Scans
        uses: SuffolkLITLab/ALActions/pythontests@main
```

---

## Related documentation

- **[Navigating logs and artifacts](./navigating_logs_and_artifacts.md)**: Visual guide on reading step summaries, downloading artifacts, and searching logs.
- **[DAYamlChecker guide](./dayamlchecker.md)**: Deep dive into the static YAML, accessibility, and DOCX checker.
- **[Automated testing with ALKiln](../components/ALKiln/intro.mdx)**: Browser-based end-to-end testing.

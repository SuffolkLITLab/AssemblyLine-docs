---
id: running_checks_locally
title: Running checks before you push to GitHub
sidebar_label: Running checks locally
slug: running-checks-locally
---

# Running checks before you push to GitHub

While GitHub Actions automatically verifies your code whenever you open a pull request, running checks locally on your workstation before pushing saves time, catches errors immediately, and keeps your Git commit history clean.

You can run quality checks manually via the command line or automate them using **Git pre-commit hooks**.

---

## Running manual CLI checks

Before staging and committing your changes, you can run the core Assembly Line tools directly from your terminal.

### 1. Check interview YAML and DOCX files
Run [`dayamlchecker`](./dayamlchecker.md) against your interview files and template directory:

```bash
# Check all question YAML files for structure, WCAG, and broken links
python3 -m dayamlchecker docassemble/MyPackage/data/questions/

# Check Word templates for accessibility
python3 -m dayamlchecker docassemble/MyPackage/data/templates/
```

### 2. Verify Python syntax and formatting
Ensure Python source files compile without syntax errors and conform to PEP 8:

```bash
# Verify Python syntax across the repository
python3 -m compileall . -q

# Format Python code with Black
black .

# Check Python docstrings against function signatures
docsig docassemble/
```

### 3. Run unit tests
If your package includes unit tests:

```bash
pytest
```

---

## Automating checks with Git pre-commit hooks

A **Git hook** is a custom script that Git automatically executes before or after specific lifecycle events (such as `commit`, `push`, or `merge`).

A **pre-commit hook** runs every time you run `git commit`. If any check fails, Git aborts the commit, allowing you to fix the problem before recording broken code in your repository's history.

You can set up pre-commit hooks in two ways:
1. **Using the popular `pre-commit` framework** (recommended for teams and multi-tool setups).
2. **Writing a simple standalone Git hook script** (lightweight, zero extra tools needed).

---

## Option 1: Using the `pre-commit` framework (recommended)

The [pre-commit framework](https://pre-commit.com/) is a widely used multi-language package manager for Git hooks. It automatically installs, configures, and runs hooks across repositories.

### 1. Install the `pre-commit` package

Install `pre-commit` using `uv` or `pip`:

```bash
# Install via uv tool (recommended)
uv tool install pre-commit

# Or install via pip
pip install pre-commit
```

### 2. Create `.pre-commit-config.yaml`

Create a file named `.pre-commit-config.yaml` in the root of your package repository:

```yaml
# .pre-commit-config.yaml
repos:
  # General file hygiene
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
        exclude: ^docassemble/.*/data/questions/.*\.yml$

  # Python code formatting
  - repo: https://github.com/psf/black
    rev: 24.8.0
    hooks:
      - id: black
        args: [--line-length=88]

  # Python docstring validation
  - repo: https://github.com/a-recruiting/docsig
    rev: v0.60.0
    hooks:
      - id: docsig
        args: [--disable=description-not-capitalized]
        exclude: (test_.*|setup)\.py$

  # DAYamlChecker local hook
  - repo: local
    hooks:
      - id: dayamlchecker
        name: DAYamlChecker
        entry: python3 -m dayamlchecker
        language: system
        files: \.(yml|yaml|docx)$
        types_or: [yaml, file]
        pass_filenames: true
```

### 3. Install the hook into your Git repository

Run the following command once in your repository root:

```bash
pre-commit install
```

You will see confirmation that the hook has been installed:
```text
pre-commit installed at .git/hooks/pre-commit
```

### 4. How it works in practice

Now, whenever you run `git commit`, `pre-commit` automatically runs the configured tools against your staged files:

```bash
$ git add docassemble/MyPackage/data/questions/interview.yml
$ git commit -m "Add new interview screen"

Trim Trailing Whitespace.................................................Passed
Fix End of Files.........................................................Passed
black....................................................................Passed
docsig...................................................................Passed
DAYamlChecker............................................................Passed
[feature-branch 8a3f910] Add new interview screen
 1 file changed, 25 insertions(+)
```

If `dayamlchecker` or `black` detects an issue, Git halts the commit and shows the diagnostic message. Fix the issue, stage your changes (`git add`), and run `git commit` again.

### 5. Running hooks manually

You can run all configured pre-commit hooks across all files at any time without committing:

```bash
pre-commit run --all-files
```

---

## Option 2: Standalone Git hook script

If you prefer not to install the `pre-commit` framework, you can create a simple shell script directly in your `.git/hooks/` directory.

### 1. Create `.git/hooks/pre-commit`

Create a file at `.git/hooks/pre-commit` in your repository:

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Run DAYamlChecker and Python compileall on staged files before committing

set -e

echo "Running pre-commit quality checks..."

# 1. Check Python syntax
echo "Checking Python syntax..."
python3 -m compileall . -q

# 2. Check staged YAML question files
STAGED_YML=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^docassemble/.*/data/questions/.*\.ya?ml$' || true)

if [ -n "$STAGED_YML" ]; then
    echo "Running DAYamlChecker on staged YAML files:"
    echo "$STAGED_YML"
    python3 -m dayamlchecker $STAGED_YML
fi

# 3. Check staged DOCX templates
STAGED_DOCX=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^docassemble/.*/data/templates/.*\.docx$' || true)

if [ -n "$STAGED_DOCX" ]; then
    echo "Running DAYamlChecker on staged DOCX templates:"
    echo "$STAGED_DOCX"
    python3 -m dayamlchecker $STAGED_DOCX
fi

echo "All pre-commit checks passed!"
```

### 2. Make the script executable

```bash
chmod +x .git/hooks/pre-commit
```

Now, every `git commit` invocation will execute this script automatically.

---

## Bypassing hooks in emergencies

If you need to commit changes without running pre-commit hooks (for example, during a work-in-progress commit or an emergency patch), use Git's `--no-verify` flag:

```bash
git commit --no-verify -m "WIP: save checkpoint"
```

:::warning Remember to re-verify in CI
Using `--no-verify` skips local checks, but your pull request will still be validated by GitHub Actions in CI.
:::

---

## Further reading on pre-commit hooks

To learn more about advanced hook configurations, automatic autofixers, and custom repository setups, explore the following resources:

- **[Official pre-commit Documentation](https://pre-commit.com/)**: Comprehensive guide covering repository structure, hook stages (`pre-push`, `commit-msg`), and advanced arguments.
- **[Pre-commit Supported Hooks Directory](https://pre-commit.com/hooks.html)**: Searchable list of hundreds of out-of-the-box hooks for Python, JavaScript, CSS, Docker, and Markdown.
- **[Git SCM Book: Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**: Detailed guide explaining client-side and server-side Git hook architecture.

---

## Related documentation

- **[DAYamlChecker guide](./dayamlchecker.md)**: Explore the full catalog of static linting and WCAG diagnostic codes.
- **[Assembly Line GitHub Actions](./github_actions.md)**: Explore the automated CI actions running on GitHub pull requests.
- **[Navigating logs and artifacts](./navigating_logs_and_artifacts.md)**: Learn how to inspect CI step summaries and Word diff artifacts.

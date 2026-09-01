#!/usr/bin/env python3
"""Post-process the auto-generated API reference pages so their in-page anchors
work with Docusaurus' broken-anchor checker.

``pydoc-markdown`` emits raw ``<a id="Module.member"></a>`` tags before every
heading and a "Table of Contents" whose links point at those ids. Docusaurus
only registers anchors that come from Markdown headings (or a handful of theme
components), so every one of those links is reported as a broken anchor at
build time.

This script rewrites each generated page under ``docs/components`` so that:

* ``<a id="X"></a>`` immediately followed by a heading becomes an explicit
  Docusaurus heading id: ``#### heading {#X}``.
* the "Table of Contents" entry that links a module to itself (an ``<h1>``,
  which Docusaurus never gives an id) loses its now-danglink link.
* short cross-references copied out of Python docstrings
  (``[foo](#foo)``, ``[bar](other_module#bar)``) are expanded to the fully
  qualified id that the heading now carries.

It is idempotent: once a page has been processed the ``<a id>`` tags are gone
and the headings already carry ``{#...}``, so re-running it is a no-op. It runs
locally against the committed pages and again in CI after ``fix-doc-titles.sh``.
"""

from __future__ import annotations

import re
from pathlib import Path

COMPONENTS_DIR = Path("docs/components")

A_ID_RE = re.compile(r'^<a id="([^"]+)"></a>\s*$')
HEADING_RE = re.compile(r"^(#{1,6})\s+\S")
HEADING_HAS_ID_RE = re.compile(r"\{#[^}]+\}\s*$")
FENCE_RE = re.compile(r"^(`{3,}|~{3,})(.*)$")
TOP_TOC_LINK_RE = re.compile(r"^\* \[(?P<text>[^\]]+)\]\(#(?P<anchor>[^)]+)\)\s*$")
TOC_TITLE_RE = re.compile(r"^# (Table of Contents|[\w.]+\.[\w.]+)\s*$")
# [label](target) where target is `#name` or `path/to/module#name` or
# `module.md#name` and `name` is a plain (dot-free) identifier.
SHORT_XREF_RE = re.compile(
    r"\]\((?P<path>[^)#\s]*?)#(?P<frag>[A-Za-z_][A-Za-z0-9_]*)\)"
)


def iter_pages() -> list[Path]:
    return sorted(COMPONENTS_DIR.rglob("*.md"))


def build_id_index(pages: list[Path]) -> dict[str, dict[str, str]]:
    """stem -> {last dotted segment -> fully qualified id}.

    Ambiguous short names (two members that share a final segment) are dropped
    so we never rewrite a link to the wrong target.
    """
    index: dict[str, dict[str, str]] = {}
    for page in pages:
        mapping: dict[str, str] = {}
        ambiguous: set[str] = set()
        for line in page.read_text(encoding="utf-8").splitlines():
            match = A_ID_RE.match(line)
            if not match:
                continue
            full = match.group(1)
            short = full.rsplit(".", 1)[-1]
            if short in mapping and mapping[short] != full:
                ambiguous.add(short)
            mapping.setdefault(short, full)
        for name in ambiguous:
            mapping.pop(name, None)
        index[page.stem] = mapping
    return index


def _fence_delimiter(line: str) -> tuple[str, str] | None:
    match = FENCE_RE.match(line.lstrip())
    if not match:
        return None
    return match.group(1), match.group(2).strip()


def _heading_id_suffix(anchor: str) -> str:
    # Underscores in the raw id would be parsed as Markdown emphasis
    # ("__init__" -> "<strong>init</strong>"), corrupting the anchor. pydoc
    # already escapes them in the visible heading text; do the same here.
    return f" {{#{anchor.replace('_', r'\_')}}}"


def attach_heading_ids(lines: list[str]) -> tuple[list[str], bool]:
    out: list[str] = []
    changed = False
    fence: tuple[str, int] | None = None
    i = 0
    while i < len(lines):
        line = lines[i]
        delimiter = _fence_delimiter(line)
        if delimiter is not None:
            marker, info = delimiter
            if fence is None:
                if marker[0] not in info:  # an opening ``` can't have ` in its info string
                    fence = (marker[0], len(marker))
            elif marker[0] == fence[0] and len(marker) >= fence[1] and info == "":
                fence = None

        anchor_match = A_ID_RE.match(line)
        if not anchor_match:
            out.append(line)
            i += 1
            continue

        # Look past blank lines for the heading this anchor belongs to.
        j = i + 1
        while j < len(lines) and lines[j].strip() == "":
            j += 1
        if j < len(lines) and HEADING_RE.match(lines[j]):
            if fence is not None:
                # A malformed docstring code fence upstream never closed; the
                # heading below would be swallowed by it. Close it first.
                out.append(fence[0] * fence[1])
                out.append("")
                fence = None
            heading = lines[j].rstrip()
            if not HEADING_HAS_ID_RE.search(heading):
                heading = f"{heading}{_heading_id_suffix(anchor_match.group(1))}"
            out.append(heading)
            changed = True
            i = j + 1
        else:
            # No heading follows - drop the tag, it is invisible to Docusaurus.
            changed = True
            i += 1
    return out, changed


def drop_module_self_link(lines: list[str]) -> tuple[list[str], bool]:
    # Only the pydoc-generated pages carry a "Table of Contents" heading.
    if not lines or not TOC_TITLE_RE.match(lines[0]):
        return lines, False
    for idx, line in enumerate(lines[:6]):
        match = TOP_TOC_LINK_RE.match(line)
        if not match or "." not in match.group("anchor"):
            continue
        # The first top-level ("* [x](...)") bullet is the module heading, which
        # Docusaurus renders as an <h1> and never assigns an id.
        lines[idx] = f"* {match.group('text')}"
        return lines, True
    return lines, False


def expand_short_xrefs(
    text: str, stem: str, index: dict[str, dict[str, str]]
) -> tuple[str, bool]:
    changed = False

    def replace(match: re.Match[str]) -> str:
        nonlocal changed
        path = match.group("path")
        frag = match.group("frag")
        target_stem = Path(path).name[:-3] if path.endswith(".md") else Path(path).name
        target_stem = target_stem or stem
        full = index.get(target_stem, {}).get(frag)
        if not full or "." not in full:
            return match.group(0)
        changed = True
        return f"]({path}#{full})"

    return SHORT_XREF_RE.sub(replace, text), changed


def process(page: Path, index: dict[str, dict[str, str]]) -> bool:
    with page.open("r", encoding="utf-8", newline="") as handle:
        original = handle.read()
    newline = "\r\n" if "\r\n" in original else "\n"
    trailing_newline = original.endswith(newline)
    lines = original.split(newline)
    if trailing_newline:
        lines = lines[:-1]

    lines, a = attach_heading_ids(lines)
    lines, b = drop_module_self_link(lines)

    text = newline.join(lines)
    if trailing_newline:
        text += newline
    text, c = expand_short_xrefs(text, page.stem, index)

    if a or b or c:
        with page.open("w", encoding="utf-8", newline="") as handle:
            handle.write(text)
        return True
    return False


def main() -> None:
    if not COMPONENTS_DIR.is_dir():
        raise SystemExit(f"expected to run from the docs root; {COMPONENTS_DIR} not found")
    pages = iter_pages()
    index = build_id_index(pages)
    touched = [page for page in pages if process(page, index)]
    print(f"fix-doc-anchors: updated {len(touched)} of {len(pages)} reference pages")


if __name__ == "__main__":
    main()

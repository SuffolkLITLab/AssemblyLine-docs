# Table of Contents

* ALDashboard.docx\_wrangling
  * [update\_docx](#ALDashboard.docx_wrangling.update_docx)
  * [get\_labeled\_docx\_runs](#ALDashboard.docx_wrangling.get_labeled_docx_runs)
  * [modify\_docx\_with\_openai\_guesses](#ALDashboard.docx_wrangling.modify_docx_with_openai_guesses)

---
sidebar_label: docx_wrangling
title: ALDashboard.docx_wrangling
---

#### update\_docx(document: Union[docx.document.Document, str], modified\_runs: List[Tuple[int, int, str, int]]) {#ALDashboard.docx\_wrangling.update\_docx}

```python
def update_docx(
        document: Union[docx.document.Document, str],
        modified_runs: List[Tuple[int, int, str,
                                  int]]) -> docx.document.Document
```

Update the document with modified runs.

**Arguments**:

- `document` - the docx.Document object, or the path to the DOCX file
- `modified_runs` - a tuple of paragraph number, run number, the modified text, and
  a number from -1 to 1 indicating whether a new paragraph should be inserted
  before or after the current paragraph.
  

**Returns**:

  The modified document.

#### get\_labeled\_docx\_runs(docx\_path: str, custom\_people\_names: Optional[Tuple[str, str]] = None, openai\_client: Optional[OpenAI] = None) {#ALDashboard.docx\_wrangling.get\_labeled\_docx\_runs}

```python
def get_labeled_docx_runs(
        docx_path: str,
        custom_people_names: Optional[Tuple[str, str]] = None,
        openai_client: Optional[OpenAI] = None
) -> List[Tuple[int, int, str, int]]
```

Scan the DOCX and return a list of modified text with Jinja2 variable names inserted.

**Arguments**:

- `docx_path` - path to the DOCX file
- `custom_people_names` - a tuple of custom names and descriptions to use in addition to the default ones. Like: (&quot;clients&quot;, &quot;the person benefiting from the form&quot;)
  

**Returns**:

  A list of tuples, each containing a paragraph number, run number, and the modified text of the run.

#### modify\_docx\_with\_openai\_guesses(docx\_path: str) {#ALDashboard.docx\_wrangling.modify\_docx\_with\_openai\_guesses}

```python
def modify_docx_with_openai_guesses(docx_path: str) -> docx.document.Document
```

Uses OpenAI to guess the variable names for a document and then modifies the document with the guesses.

**Arguments**:

- `docx_path` _str_ - Path to the DOCX file to modify.
  

**Returns**:

- `docx.Document` - The modified document, ready to be saved to the same or a new path


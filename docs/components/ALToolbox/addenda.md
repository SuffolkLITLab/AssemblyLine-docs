# Table of Contents

* ALToolbox.addenda
  * [myTable](#ALToolbox.addenda.myTable)
    * [\_\_init\_\_](#ALToolbox.addenda.myTable.__init__)
  * [myTextList](#ALToolbox.addenda.myTextList)
    * [\_\_init\_\_](#ALToolbox.addenda.myTextList.__init__)
    * [g](#ALToolbox.addenda.myTextList.g)
  * [safe\_json2](#ALToolbox.addenda.safe_json2)
  * [type\_name](#ALToolbox.addenda.type_name)

---
sidebar_label: addenda
title: ALToolbox.addenda
---

## myTable Objects {#ALToolbox.addenda.myTable}

```python
class myTable()
```

Utility class for creating table representations from DAList objects for addenda.

This class processes DAList objects containing &#x27;Individual&#x27; or &#x27;Thing&#x27; objects
and converts them into structured table format suitable for document addenda.
It handles data sanitization and formatting for display purposes.

#### \_\_init\_\_(tblData, tblTitle, tblHeader) {#ALToolbox.addenda.myTable.\_\_init\_\_}

```python
def __init__(tblData, tblTitle, tblHeader)
```

Initialize a table from DAList data with title and headers.

**Arguments**:

- `tblData` - A DAList object containing Individual or Thing objects.
- `tblTitle` _str_ - The title for the table.
- `tblHeader` - The column headers for the table.

## myTextList Objects {#ALToolbox.addenda.myTextList}

```python
class myTextList()
```

Utility class for managing text fields that may exceed form space limits.

This class handles text content that might be too long to fit in the main form
by truncating it at a specified limit and storing the overflow text for use
in addenda or continuation pages.

#### \_\_init\_\_(text, limit, title) {#ALToolbox.addenda.myTextList.\_\_init\_\_}

```python
def __init__(text, limit, title)
```

Initialize text processing with truncation limits.

**Arguments**:

- `text` _str_ - The text content to process and potentially truncate.
- `limit` _int_ - The character limit for the main form field.
- `title` _str_ - The title or identifier for the text field.

#### g(text, limit, title) {#ALToolbox.addenda.myTextList.g}

```python
def g(text, limit, title) -> None
```

Process text for addendum generation by truncating if needed and storing overflow.

Determines if the provided text exceeds the character limit and truncates it
with an addendum notice if necessary. The original text is stored for inclusion
in an addendum section if truncation occurs.

**Arguments**:

- `text` _str_ - The text content to process for length.
- `limit` _int_ - The maximum character limit for the main text field.
- `title` _str_ - The title/label for this text field, used in the addendum.
  

**Notes**:

  Sets self.text_cutoff to the truncated text (with addendum notice if needed)
  and self.txtList to contain addendum data if truncation occurred.
  

**Example**:

  &gt;&gt;&gt; text_handler = myTextList(&quot;Very long text...&quot;, 100, &quot;Description&quot;)
  &gt;&gt;&gt; # If text &gt; 100 chars, text_cutoff will end with &quot; (See Addendum.)&quot;

#### safe\_json2(the\_object, level=0, is\_key=False) {#ALToolbox.addenda.safe\_json2}

```python
def safe_json2(the_object, level=0, is_key=False) -> Any
```

Convert Python objects to JSON-serializable format with enhanced date handling.

A revision of the safe_json function that converts complex Python objects into
formats that can be safely serialized to JSON. Handles datetime objects by
converting them to formatted date strings (MM/DD/YYYY format) rather than
ISO strings.

**Arguments**:

- `the_object` - The Python object to convert to a JSON-serializable format.
- `level` _int, optional_ - Current recursion depth to prevent infinite loops.
  Defaults to 0.
- `is_key` _bool, optional_ - Whether this object is being used as a dictionary key.
  Defaults to False.
  

**Returns**:

  A JSON-serializable representation of the input object. Returns &quot;None&quot; for
  keys or None for values when objects cannot be serialized and recursion
  limit is exceeded.
  

**Example**:

  &gt;&gt;&gt; import datetime
  &gt;&gt;&gt; obj = \{&quot;date&quot;: datetime.datetime(2023, 12, 25)\}
  &gt;&gt;&gt; safe_json2(obj)
- `\{"date"` - &quot;12/25/2023&quot;\}

#### type\_name(the\_object) {#ALToolbox.addenda.type\_name}

```python
def type_name(the_object) -> str
```

Extract the class name from a Python object&#x27;s type string representation.

Parses the string representation of an object&#x27;s type to extract just the
class name, removing the surrounding type syntax.

**Arguments**:

- `the_object` - Any Python object whose type name should be extracted.
  

**Returns**:

- `str` - The class name of the object, or the full type string if parsing fails.
  

**Example**:

  &gt;&gt;&gt; type_name(&quot;hello&quot;)
  &#x27;str&#x27;
  &gt;&gt;&gt; type_name([1, 2, 3])
  &#x27;list&#x27;


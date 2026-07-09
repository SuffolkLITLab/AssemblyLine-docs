# Table of Contents

* [AssemblyLine.custom\_jinja\_filters](#AssemblyLine.custom_jinja_filters)
  * [catchall\_options](#AssemblyLine.custom_jinja_filters.catchall_options)
  * [catchall\_label](#AssemblyLine.custom_jinja_filters.catchall_label)
  * [catchall\_datatype](#AssemblyLine.custom_jinja_filters.catchall_datatype)
  * [catchall\_question](#AssemblyLine.custom_jinja_filters.catchall_question)
  * [catchall\_subquestion](#AssemblyLine.custom_jinja_filters.catchall_subquestion)
  * [if\_final](#AssemblyLine.custom_jinja_filters.if_final)
  * [catchall\_fields\_code](#AssemblyLine.custom_jinja_filters.catchall_fields_code)

---
sidebar_label: custom_jinja_filters
title: AssemblyLine.custom_jinja_filters
---

<a id="AssemblyLine.custom_jinja_filters.catchall_options"></a>

#### catchall\_options(value: Any, \*raw\_items: Any)

```python
def catchall_options(value: Any, *raw_items: Any) -> DACatchAll
```

Jinja2 filter to support defining options for DACatchAll fields inside a DOCX template.

This filter takes a list of items, which can be strings, dictionaries, or tuples,
and converts them into a list of tuples containing the code and label for each option.

The items can be in various formats:

- String: `"code: label"`
- Dictionary: `\{"code": "label"\}`
- Tuple: `("code", "label")`
- List of any of the above types

The resulting list of tuples is assigned to the `_catchall_options` attribute of the
DACatchAll object, which can then be used to populate the options in the catchall field.

Example usage in a DOCX template:


Example in an interview with `features: use catchall: True` turned on:


```
\{\{ my_catchall_field | catchall_options("code1: label1", "code2: label2") \}\}

\{\{ my_catchall_field_2 | catchall_options(\{"code1": "label1"\}, \{"code2": "label2"\}) \}\}
```
```
---
if: |
    hasattr(x, "_catchall_options")
generic object: DACatchAll
question: |
    $\{ x.object_name() \}?
fields:
    - $\{ x.object_name() \}: x.value
      code: x._catchall_options
```

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object to which the options will be assigned.
- `*raw_items` - A variable number of arguments representing the options to be added.

**Returns**:

- `DACatchAll` - The modified DACatchAll object with the assigned options.

<a id="AssemblyLine.custom_jinja_filters.catchall_label"></a>

#### catchall\_label(value: Any, label: str)

```python
def catchall_label(value: Any, label: str) -> DACatchAll
```

Jinja2 filter to allow you to define a label for a DACatchAll field inside a DOCX template.

This filter takes a label string and assigns it to the `label` attribute of the
DACatchAll object. This label can be used to provide a more descriptive name for the
catchall field in the user interface.

Example usage in a DOCX template:
Example in an interview with `features: use catchall: True` turned on:
```
\{\{ my_catchall_field | catchall_label("My Custom Label") \}\}
```
```
---
generic object: DACatchAll
question: |
    $\{ x.label if hasattr(x, "label") else x.object_name() \}?
fields:
    - $\{ x.label if hasattr(x, "label") else x.object_name() \}: x.value
```

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object to which the label will be assigned.
- `label` _str_ - The label string to assign to the DACatchAll object.
  

**Returns**:

- `DACatchAll` - The modified DACatchAll object with the assigned label.

<a id="AssemblyLine.custom_jinja_filters.catchall_datatype"></a>

#### catchall\_datatype(value: Any, datatype: str)

```python
def catchall_datatype(value: Any, datatype: str) -> DACatchAll
```

Jinja2 filter to allow you to define a datatype for a DACatchAll field inside a DOCX template.

This filter takes a datatype string and assigns it to the `datatype` attribute of the
DACatchAll object. This can be useful for specifying the type of data expected in the
catchall field.

Example usage in a DOCX template:

```
\{\{ my_catchall_field | catchall_datatype("radio") \}\}
```

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object to which the datatype will be assigned.
- `datatype` _str_ - The datatype string to assign to the DACatchAll object.
  

**Returns**:

- `DACatchAll` - The modified DACatchAll object with the assigned datatype.

<a id="AssemblyLine.custom_jinja_filters.catchall_question"></a>

#### catchall\_question(value: Any, question: str)

```python
def catchall_question(value: Any, question: str) -> DACatchAll
```

Jinja2 filter to allow you to define a question for a DACatchAll field inside a DOCX template.

This filter takes a question string and assigns it to the `question` attribute of the
DACatchAll object. This can be useful for providing a specific question or prompt
related to the catchall field.

Example usage in a DOCX template:

```
\{\{ my_catchall_field | catchall_question("What additional information do you need?") \}\}
```

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object to which the question will be assigned.
- `question` _str_ - The question string to assign to the DACatchAll object.
  

**Returns**:

- `DACatchAll` - The modified DACatchAll object with the assigned question.

<a id="AssemblyLine.custom_jinja_filters.catchall_subquestion"></a>

#### catchall\_subquestion(value: Any, subquestion: str)

```python
def catchall_subquestion(value: Any, subquestion: str) -> DACatchAll
```

Jinja2 filter to allow you to define a subquestion for a DACatchAll field inside a DOCX template.

This filter takes a subquestion string and assigns it to the `subquestion` attribute of the
DACatchAll object. This can be useful for providing additional context or instructions
related to the catchall field.

Example usage in a DOCX template:

```
\{\{ my_catchall_field | catchall_subquestion("Please provide additional details.") \}\}
```

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object to which the subquestion will be assigned.
- `subquestion` _str_ - The subquestion string to assign to the DACatchAll object.
  

**Returns**:

- `DACatchAll` - The modified DACatchAll object with the assigned subquestion.

<a id="AssemblyLine.custom_jinja_filters.if_final"></a>

#### if\_final(context: Jinja2Context, value: Any, i: Optional[str] = None, expected\_i: Union[str, List[str]] = "final", placeholder: Optional[str] = None)

```python
@pass_context
def if_final(context: Jinja2Context,
             value: Any,
             i: Optional[str] = None,
             expected_i: Union[str, List[str]] = "final",
             placeholder: Optional[str] = None) -> Any
```

Jinja2 filter to only seek the definition of a variable if the current value of `i`
is equal to the expected value (normally &quot;final&quot;); otherwise,
return a placeholder.

This is useful in ALDocument DOCX templates where you want to show a placeholder when
the document is being generated for preview or testing, but let docassemble trigger
the actual value when the document is being generated for final output.

E.g., to show a placeholder for a signature field when the document is being
shown to the signer, but show the actual signature when the document is finalized.

The default placeholder is &quot;[ signature ]&quot; if the variable name follows the pattern &quot;users[0].signature&quot;,
or [ variable_name ] if it is not an attribute of an item.

`i` will be the value from the template&#x27;s context unless it is explicitly passed,
as in an ALDocument&#x27;s &quot;preview&quot; or &quot;final&quot; values.

**Example**:

  Contents of test_if_final.docx:
    ```jinja
    \{\{ users[0].signature | if_final \}\}
    ```
  
  Returns &quot;[ signature ]&quot; if `i` (passed to the context of the attachment block) is not &quot;final&quot;,
  otherwise the actual value of `users[0].signature`.
  
    ```yaml
    ---
    include:
    - assembly_line.yml
    ---
    mandatory: True
    code: |
        preview_screen
        final_screen
    ---
    question: |
        Here is what it looks like unsigned
    subquestion: |
        $\{ test_if_final_attachment.as_pdf(key="preview") \}
    continue button field: preview_screen
    ---
    question: |
        Here is what it looks like signed
    subquestion: |
        $\{ test_if_final_attachment.as_pdf(key="final") \}
    event: final_screen
    ---
    objects:
        - test_if_final_attachment: ALDocument.using(title="test_if_final", filename="test_if_final")
    ---
    attachment:
        variable name: test_if_final_attachment[i]
        docx template file: test_if_final.docx
    ```
  

**Arguments**:

- `context` _Jinja2Context_ - The Jinja2 context, automatically passed by the `pass_context` decorator.
- `value` _Any_ - The original value as passed to the filter.
- `i` _str, optional_ - The current value of `i`. If not provided, it will be fetched from the context.
- `expected_i` _Union[str, List[str]], optional_ - The expected value(s) of `i` to trigger passthrough of `value`.
  Defaults to &quot;final&quot;.
- `placeholder` _str, optional_ - The placeholder string to return if the condition is not met. If
  not provided, a default placeholder will be generated based on the variable name.
  

**Returns**:

- `Any` - The original `value` if `i` matches `expected_i`, otherwise the `placeholder`.

<a id="AssemblyLine.custom_jinja_filters.catchall_fields_code"></a>

#### catchall\_fields\_code(value: Any)

```python
def catchall_fields_code(value: Any) -> List[Dict[str, Any]]
```

Create docassemble code for a catchall field with the appropriate datatypes.

**Arguments**:

- `value` _DACatchAll_ - The DACatchAll object containing the question and options.

**Returns**:

  List[Dict[str, Any]]: A dictionary containing the docassemble code for the catchall question.


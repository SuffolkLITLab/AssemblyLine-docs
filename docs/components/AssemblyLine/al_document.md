# Table of Contents

* AssemblyLine.al\_document
  * [random\_suffix](#AssemblyLine.al_document.random_suffix)
  * [base\_name](#AssemblyLine.al_document.base_name)
  * [label](#AssemblyLine.al_document.label)
  * [key](#AssemblyLine.al_document.key)
  * [safeattr](#AssemblyLine.al_document.safeattr)
  * [html\_safe\_str](#AssemblyLine.al_document.html_safe_str)
  * [table\_row](#AssemblyLine.al_document.table_row)
  * [pdf\_page\_parity](#AssemblyLine.al_document.pdf_page_parity)
  * [add\_blank\_page](#AssemblyLine.al_document.add_blank_page)
  * [ALAddendumField](#AssemblyLine.al_document.ALAddendumField)
    * [init](#AssemblyLine.al_document.ALAddendumField.init)
    * [overflow\_value](#AssemblyLine.al_document.ALAddendumField.overflow_value)
    * [max\_lines](#AssemblyLine.al_document.ALAddendumField.max_lines)
    * [value](#AssemblyLine.al_document.ALAddendumField.value)
    * [has\_overflow](#AssemblyLine.al_document.ALAddendumField.has_overflow)
    * [original\_or\_overflow\_message](#AssemblyLine.al_document.ALAddendumField.original_or_overflow_message)
    * [safe\_value](#AssemblyLine.al_document.ALAddendumField.safe_value)
    * [value\_if\_defined](#AssemblyLine.al_document.ALAddendumField.value_if_defined)
    * [\_\_str\_\_](#AssemblyLine.al_document.ALAddendumField.__str__)
    * [columns](#AssemblyLine.al_document.ALAddendumField.columns)
    * [type](#AssemblyLine.al_document.ALAddendumField.type)
    * [is\_list](#AssemblyLine.al_document.ALAddendumField.is_list)
    * [is\_object\_list](#AssemblyLine.al_document.ALAddendumField.is_object_list)
    * [overflow\_markdown](#AssemblyLine.al_document.ALAddendumField.overflow_markdown)
    * [overflow\_docx](#AssemblyLine.al_document.ALAddendumField.overflow_docx)
  * [ALAddendumFieldDict](#AssemblyLine.al_document.ALAddendumFieldDict)
    * [init](#AssemblyLine.al_document.ALAddendumFieldDict.init)
    * [initializeObject](#AssemblyLine.al_document.ALAddendumFieldDict.initializeObject)
    * [from\_list](#AssemblyLine.al_document.ALAddendumFieldDict.from_list)
    * [defined\_fields](#AssemblyLine.al_document.ALAddendumFieldDict.defined_fields)
    * [overflow](#AssemblyLine.al_document.ALAddendumFieldDict.overflow)
    * [has\_overflow](#AssemblyLine.al_document.ALAddendumFieldDict.has_overflow)
  * [DALazyAttribute](#AssemblyLine.al_document.DALazyAttribute)
    * [\_\_getstate\_\_](#AssemblyLine.al_document.DALazyAttribute.__getstate__)
  * [ALDocument](#AssemblyLine.al_document.ALDocument)
    * [init](#AssemblyLine.al_document.ALDocument.init)
    * [as\_pdf](#AssemblyLine.al_document.ALDocument.as_pdf)
    * [as\_docx](#AssemblyLine.al_document.ALDocument.as_docx)
    * [as\_list](#AssemblyLine.al_document.ALDocument.as_list)
    * [need\_addendum](#AssemblyLine.al_document.ALDocument.need_addendum)
    * [has\_overflow](#AssemblyLine.al_document.ALDocument.has_overflow)
    * [overflow](#AssemblyLine.al_document.ALDocument.overflow)
    * [original\_or\_overflow\_message](#AssemblyLine.al_document.ALDocument.original_or_overflow_message)
    * [safe\_value](#AssemblyLine.al_document.ALDocument.safe_value)
    * [overflow\_value](#AssemblyLine.al_document.ALDocument.overflow_value)
    * [is\_enabled](#AssemblyLine.al_document.ALDocument.is_enabled)
  * [ALStaticDocument](#AssemblyLine.al_document.ALStaticDocument)
    * [init](#AssemblyLine.al_document.ALStaticDocument.init)
    * [\_\_getitem\_\_](#AssemblyLine.al_document.ALStaticDocument.__getitem__)
    * [as\_list](#AssemblyLine.al_document.ALStaticDocument.as_list)
    * [as\_pdf](#AssemblyLine.al_document.ALStaticDocument.as_pdf)
    * [as\_docx](#AssemblyLine.al_document.ALStaticDocument.as_docx)
    * [show](#AssemblyLine.al_document.ALStaticDocument.show)
    * [is\_enabled](#AssemblyLine.al_document.ALStaticDocument.is_enabled)
  * [ALDocumentBundle](#AssemblyLine.al_document.ALDocumentBundle)
    * [init](#AssemblyLine.al_document.ALDocumentBundle.init)
    * [as\_pdf](#AssemblyLine.al_document.ALDocumentBundle.as_pdf)
    * [\_\_str\_\_](#AssemblyLine.al_document.ALDocumentBundle.__str__)
    * [as\_zip](#AssemblyLine.al_document.ALDocumentBundle.as_zip)
    * [preview](#AssemblyLine.al_document.ALDocumentBundle.preview)
    * [has\_enabled\_documents](#AssemblyLine.al_document.ALDocumentBundle.has_enabled_documents)
    * [enabled\_documents](#AssemblyLine.al_document.ALDocumentBundle.enabled_documents)
    * [as\_flat\_list](#AssemblyLine.al_document.ALDocumentBundle.as_flat_list)
    * [get\_titles](#AssemblyLine.al_document.ALDocumentBundle.get_titles)
    * [as\_pdf\_list](#AssemblyLine.al_document.ALDocumentBundle.as_pdf_list)
    * [as\_docx\_list](#AssemblyLine.al_document.ALDocumentBundle.as_docx_list)
    * [as\_editable\_list](#AssemblyLine.al_document.ALDocumentBundle.as_editable_list)
    * [get\_cacheable\_documents](#AssemblyLine.al_document.ALDocumentBundle.get_cacheable_documents)
    * [download\_list\_html](#AssemblyLine.al_document.ALDocumentBundle.download_list_html)
    * [download\_html](#AssemblyLine.al_document.ALDocumentBundle.download_html)
    * [send\_email\_table\_row](#AssemblyLine.al_document.ALDocumentBundle.send_email_table_row)
    * [send\_button\_to\_html](#AssemblyLine.al_document.ALDocumentBundle.send_button_to_html)
    * [send\_button\_html](#AssemblyLine.al_document.ALDocumentBundle.send_button_html)
    * [send\_email](#AssemblyLine.al_document.ALDocumentBundle.send_email)
    * [is\_enabled](#AssemblyLine.al_document.ALDocumentBundle.is_enabled)
    * [as\_docx](#AssemblyLine.al_document.ALDocumentBundle.as_docx)
    * [as\_list](#AssemblyLine.al_document.ALDocumentBundle.as_list)
  * [ALExhibit](#AssemblyLine.al_document.ALExhibit)
    * [init](#AssemblyLine.al_document.ALExhibit.init)
    * [ocr\_ready](#AssemblyLine.al_document.ALExhibit.ocr_ready)
    * [ocr\_pages](#AssemblyLine.al_document.ALExhibit.ocr_pages)
    * [as\_pdf](#AssemblyLine.al_document.ALExhibit.as_pdf)
    * [num\_pages](#AssemblyLine.al_document.ALExhibit.num_pages)
    * [complete](#AssemblyLine.al_document.ALExhibit.complete)
    * [\_\_str\_\_](#AssemblyLine.al_document.ALExhibit.__str__)
  * [ocrmypdf\_task](#AssemblyLine.al_document.ocrmypdf_task)
  * [ALExhibitList](#AssemblyLine.al_document.ALExhibitList)
    * [init](#AssemblyLine.al_document.ALExhibitList.init)
    * [as\_pdf](#AssemblyLine.al_document.ALExhibitList.as_pdf)
    * [size\_in\_bytes](#AssemblyLine.al_document.ALExhibitList.size_in_bytes)
    * [ocr\_ready](#AssemblyLine.al_document.ALExhibitList.ocr_ready)
    * [hook\_after\_gather](#AssemblyLine.al_document.ALExhibitList.hook_after_gather)
  * [ALExhibitDocument](#AssemblyLine.al_document.ALExhibitDocument)
    * [init](#AssemblyLine.al_document.ALExhibitDocument.init)
    * [has\_overflow](#AssemblyLine.al_document.ALExhibitDocument.has_overflow)
    * [ocr\_ready](#AssemblyLine.al_document.ALExhibitDocument.ocr_ready)
    * [\_\_getitem\_\_](#AssemblyLine.al_document.ALExhibitDocument.__getitem__)
    * [as\_list](#AssemblyLine.al_document.ALExhibitDocument.as_list)
    * [as\_pdf](#AssemblyLine.al_document.ALExhibitDocument.as_pdf)
    * [as\_docx](#AssemblyLine.al_document.ALExhibitDocument.as_docx)
  * [ALTableDocument](#AssemblyLine.al_document.ALTableDocument)
    * [init](#AssemblyLine.al_document.ALTableDocument.init)
    * [has\_overflow](#AssemblyLine.al_document.ALTableDocument.has_overflow)
    * [\_\_getitem\_\_](#AssemblyLine.al_document.ALTableDocument.__getitem__)
    * [as\_list](#AssemblyLine.al_document.ALTableDocument.as_list)
    * [as\_pdf](#AssemblyLine.al_document.ALTableDocument.as_pdf)
    * [as\_docx](#AssemblyLine.al_document.ALTableDocument.as_docx)
  * [ALUntransformedDocument](#AssemblyLine.al_document.ALUntransformedDocument)
    * [init](#AssemblyLine.al_document.ALUntransformedDocument.init)
    * [has\_overflow](#AssemblyLine.al_document.ALUntransformedDocument.has_overflow)
    * [as\_list](#AssemblyLine.al_document.ALUntransformedDocument.as_list)
    * [as\_pdf](#AssemblyLine.al_document.ALUntransformedDocument.as_pdf)
    * [as\_docx](#AssemblyLine.al_document.ALUntransformedDocument.as_docx)
  * [ALDocumentUpload](#AssemblyLine.al_document.ALDocumentUpload)
  * [unpack\_dafilelist](#AssemblyLine.al_document.unpack_dafilelist)

---
sidebar_label: al_document
title: AssemblyLine.al_document
---

#### random\_suffix(length: int = 8) {#AssemblyLine.al\_document.random\_suffix}

```python
def random_suffix(length: int = 8) -> str
```

Return a random string for use in unique IDs.

Note: this is powerful enough for the expected usecase of distinguishing a few
HTML elements from each other, but not cryptographically secure or as strong as
a true GUID.

**Arguments**:

- `length` _int_ - The length of the random string to generate. Defaults to 8.

**Returns**:

- `str` - A random string of lowercase letters and digits.

#### base\_name(filename: str) {#AssemblyLine.al\_document.base\_name}

```python
def base_name(filename: str) -> str
```

Extracts the base name of a file without its extension.

**Arguments**:

- `filename` _str_ - The full name of the file.
  

**Returns**:

- `str` - The base name of the file without its extension.

#### label(dictionary: dict) {#AssemblyLine.al\_document.label}

```python
def label(dictionary: dict) -> str
```

Return the value of the first dictionary item.

Given a dictionary like: \{&quot;some_attribute&quot;:&quot;Some label&quot;\}, this function returns the value of the first
dictionary item. Useful for working with the `columns` method of an ALAddendumField.

**Arguments**:

- `dictionary` _dict_ - The dictionary to extract the value from.
  

**Returns**:

- `str` - The value of the first dictionary item or an empty string if not found.

#### key(dictionary: dict) {#AssemblyLine.al\_document.key}

```python
def key(dictionary: dict) -> str
```

Return the key of the first dictionary item.

Given a dictionary like: \{&quot;some_attribute&quot;:&quot;Some label&quot;\}, this function returns the key of the first
dictionary item. Useful for working with the `columns` method of an ALAddendumField.

**Arguments**:

- `dictionary` _dict_ - The dictionary to extract the key from.
  

**Returns**:

- `str` - The key of the first dictionary item or an empty string if not found.

#### safeattr(object: Any, key: str) {#AssemblyLine.al\_document.safeattr}

```python
def safeattr(object: Any, key: str) -> str
```

Safely retrieve an attribute or key value from an object.

**Arguments**:

- `object` _Any_ - The object (which could be a dict, DADict, or DAObject) from which to retrieve the value.
- `key` _str_ - The key or attribute name.
  

**Returns**:

- `str` - The retrieved value or an empty string if not found or if an error occurred.
  

**Notes**:

  The `location` attribute of an Address object or any LatitudeLongitude attribute of a DAObject is always skipped.

#### html\_safe\_str(the\_string: str) {#AssemblyLine.al\_document.html\_safe\_str}

```python
def html_safe_str(the_string: str) -> str
```

Convert a string into a format that&#x27;s safe for use as an HTML class or ID.

**Arguments**:

- `the_string` _str_ - The string to be converted.
  

**Returns**:

- `str` - A string that&#x27;s safe for use as an HTML class or ID.

#### table\_row(title: str, button\_htmls: List[str] = []) {#AssemblyLine.al\_document.table\_row}

```python
def table_row(title: str, button_htmls: List[str] = []) -> str
```

Generate an HTML row string for an AL document-styled table.

**Arguments**:

- `title` _str_ - The title to display in the row.
- `button_htmls` _List[str], optional_ - A list of HTML strings representing buttons. Defaults to an empty list.
  

**Returns**:

- `str` - An HTML string representing a row in an AL document-styled table.

#### pdf\_page\_parity(pdf\_path: str) {#AssemblyLine.al\_document.pdf\_page\_parity}

```python
def pdf_page_parity(pdf_path: str) -> Literal["even", "odd"]
```

Count the number of pages in the PDF and
return &quot;even&quot; if it is divisible by 2 and &quot;odd&quot;
if it is not divisible by 2.

**Arguments**:

- `pdf_path` _str_ - Path to the PDF in the filesystem
  

**Returns**:

  Literal[&quot;even&quot;, &quot;odd&quot;]: The parity of the number of pages in the PDF

#### add\_blank\_page(pdf\_path: str) {#AssemblyLine.al\_document.add\_blank\_page}

```python
def add_blank_page(pdf_path: str) -> None
```

Add a blank page to the end of a PDF.

**Arguments**:

- `pdf_path` _str_ - Path to the PDF in the filesystem

## ALAddendumField Objects {#AssemblyLine.al\_document.ALAddendumField}

```python
class ALAddendumField(DAObject)
```

Represents a field with attributes determining its display in an addendum, typically for PDF templates.

The field can manage items that are either strings or list-like structures. Handling of dictionary overflow
is not currently supported.

**Attributes**:

- `field_name` _str_ - The name of a docassemble variable that this object represents.
- `overflow_trigger` _Union[int, bool]_ - Specifies the limit after which the text is truncated and moved
  to an addendum. If set to `True`, it will always overflow. If set to `False`, it will never overflow.
  An integer value represents the maximum character count before overflow.
  
- `headers` _Optional[Dict[str, str]]_ - Mapping of attributes to their display labels for a table representation.
  Planned for future implementation.
- `field_style` _Optional[str]_ - Style of the field, can be one of [&quot;list&quot;, &quot;table&quot;, &quot;string&quot;].
  Defaults to &quot;string&quot;. Planned for future implementation.
  

**Notes**:

  The attributes `headers` and `field_style` are planned for future releases and are not currently implemented.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALAddendumField.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### overflow\_value(preserve\_newlines: bool = False, input\_width: int = 80, overflow\_message: str = "", preserve\_words: bool = True) {#AssemblyLine.al\_document.ALAddendumField.overflow\_value}

```python
def overflow_value(preserve_newlines: bool = False,
                   input_width: int = 80,
                   overflow_message: str = "",
                   preserve_words: bool = True) -> Any
```

Retrieve the overflow portion of a variable that exceeds the content of `safe_value()`.

This function addresses both list-like objects and strings, ensuring that the returned overflow
content adheres to whitespace preferences specified by the parameters.

**Arguments**:

- `preserve_newlines` _bool, optional_ - Determines the treatment of newline characters.
  If True, the returned string can contain single newline characters. Sequences of newline
  characters, including Windows-style &quot;rn&quot;, will be reduced to a single &quot;n&quot;. Double spaces
  will be replaced with a single space. If False, all whitespace, including newlines and
  tabs, will be replaced with a single space. Defaults to False.
  
- `input_width` _int, optional_ - The width of the input field or display area, used for determining
  overflow. Defaults to 80.
  
- `overflow_message` _str, optional_ - Message indicating overflow in the safe value. Defaults to &quot;&quot;.
  
- `preserve_words` _bool, optional_ - If True, ensures words are not split between the main content
  and the overflow. Defaults to True.
  

**Returns**:

- `Any` - The portion of the variable exceeding the content safe for display, considered as overflow.

#### max\_lines(input\_width: int = 80) {#AssemblyLine.al\_document.ALAddendumField.max\_lines}

```python
def max_lines(input_width: int = 80) -> int
```

Compute the maximum number of lines that can fit in the input given the specified input width.

**Arguments**:

- `input_width` _int, optional_ - The width of the input or display area. Defaults to 80.
  

**Returns**:

- `int` - The maximum number of lines accommodated by the input width.

#### value() {#AssemblyLine.al\_document.ALAddendumField.value}

```python
def value() -> Any
```

Retrieve the complete value without considering overflow constraints.

This can be especially helpful in appendices where there&#x27;s a desire to showcase the entire value
without the necessity of toggling between various sections or pages.

**Returns**:

- `Any` - The whole value of the field, irrespective of overflow.

#### has\_overflow(overflow\_message: str = "", input\_width: int = 80, preserve\_newlines: bool = False, \_original\_value: Optional[str] = None, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALAddendumField.has\_overflow}

```python
def has_overflow(overflow_message: str = "",
                 input_width: int = 80,
                 preserve_newlines: bool = False,
                 _original_value: Optional[str] = None,
                 preserve_words: bool = True) -> bool
```

Return True only if the value&#x27;s length exceeds the overflow trigger.

**Arguments**:

- `overflow_message` _str_ - A short message to go on the page where text is cutoff.
- `input_width` _int_ - The width, in characters, of the input box. Defaults to 80.
- `preserve_newlines` _bool_ - Determines whether newlines are preserved in the &quot;safe&quot; text.
  Defaults to False, which means all newlines are removed. This allows more text to appear
  before being sent to the addendum.
- `_original_value` _Any_ - for speed reasons, you can provide the full text and just use this
  method to determine if the overflow trigger is exceeded. If no _original_value is
  provided, this method will determine it using the value_if_defined() method.
- `preserve_words` _bool_ - If True, the algorithm will try to preserve whole words when
  truncating the text. If False, the algorithm will truncate the text at the overflow
  trigger, regardless of whether it is in the middle of a word.
  

**Returns**:

- `bool` - True if the value&#x27;s length exceeds the overflow trigger, False otherwise.

#### original\_or\_overflow\_message(overflow\_message: str = "", input\_width: int = 80, preserve\_newlines: bool = False, \_original\_value: Optional[str] = None, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALAddendumField.original\_or\_overflow\_message}

```python
def original_or_overflow_message(
        overflow_message: str = "",
        input_width: int = 80,
        preserve_newlines: bool = False,
        _original_value: Optional[str] = None,
        preserve_words: bool = True) -> Union[str, List[Any]]
```

Return the original value if it is less than the overflow trigger (once processed), otherwise return the overflow message.

Unlike safe_value(), this will never output a partial value.

**Arguments**:

- `overflow_message` _str_ - A short message to go on the page where text is cutoff.
- `input_width` _int_ - The width, in characters, of the input box. Defaults to 80.
- `preserve_newlines` _bool_ - Determines whether newlines are preserved in the &quot;safe&quot; text.
  Defaults to False, which means all newlines are removed. This allows more text to appear
  before being sent to the addendum.
- `_original_value` _Any_ - for speed reasons, you can provide the full text and just use this
  method to determine if the overflow trigger is exceeded. If no _original_value is
  provided, this method will determine it using the value_if_defined() method.
- `preserve_words` _bool_ - If True, the algorithm will try to preserve whole words when
  truncating the text. If False, the algorithm will truncate the text at the overflow
  trigger, regardless of whether it is in the middle of a word.
  

**Returns**:

  Union[str, List[Any]]: Either a string representing the overflow message or the original value

#### safe\_value(overflow\_message: str = "", input\_width: int = 80, preserve\_newlines: bool = False, \_original\_value: Optional[str] = None, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALAddendumField.safe\_value}

```python
def safe_value(overflow_message: str = "",
               input_width: int = 80,
               preserve_newlines: bool = False,
               _original_value: Optional[str] = None,
               preserve_words: bool = True) -> Union[str, List[Any]]
```

Return just the portion of the variable that heuristics suggest will fit in the specified overflow_trigger
limit. If the value is not defined, return an empty string.

When `preserve_newlines` is `True`, the output will be limited to a number of lines, not a number
of characters. The max number of lines will be calculated as `floor(self.overflow_trigger/input_width)`.
Therefore, it is important that `input_width` is a divisor of `overflow_trigger`.

Whitespace will be altered. If `preserve_newlines` is true, the return value may have newlines,
but double newlines and Windows style (rn) will be replaced with n. Double spaces will be replaced
with a single space.

If `preserve_newlines` is false, all whitespace, including newlines and tabs, will be replaced
with a single space.

**Arguments**:

- `overflow_message` _str_ - A short message to go on the page where text is cutoff.
- `input_width` _int_ - The width, in characters, of the input box. Defaults to 80.
- `preserve_newlines` _bool_ - Determines whether newlines are preserved in the &quot;safe&quot; text.
  Defaults to False, which means all newlines are removed. This allows more text to appear
  before being sent to the addendum.
- `_original_value` _Optional[str]_ - For speed reasons, you can provide the full text and just use this
  method to determine if the overflow trigger is exceeded. If no `_original_value` is
  provided, this method will determine it using the `value_if_defined()` method.
- `preserve_words` _bool_ - Indicates whether words should be preserved in their entirety without being split.
  

**Returns**:

  Union[str, List[Any]]: The portion of the variable that fits within the overflow trigger.

#### value\_if\_defined() {#AssemblyLine.al\_document.ALAddendumField.value\_if\_defined}

```python
def value_if_defined() -> Any
```

Fetch the value of the designated field if it exists; otherwise, return an empty string.

This method ensures that the addendum does not inadvertently trigger docassemble&#x27;s variable gathering.

**Returns**:

- `Any` - The value of the field if it exists, otherwise an empty string.

#### \_\_str\_\_() {#AssemblyLine.al\_document.ALAddendumField.\_\_str\_\_}

```python
def __str__()
```

Represent the ALAddendumField instance as a string.

**Returns**:

- `str` - The string representation of the value contained within the field.

#### columns(skip\_empty\_attributes: bool = True, skip\_attributes: Optional[set] = None) {#AssemblyLine.al\_document.ALAddendumField.columns}

```python
def columns(skip_empty_attributes: bool = True,
            skip_attributes: Optional[set] = None) -> Optional[list]
```

Return a list of the attributes present within the object that would make sense to go
in the table of an addendum.

If the `headers` attribute exists, this will be prioritized. Otherwise, the method will infer columns
from the first value in the list. Empty attributes and the `complete` attribute are typically ignored.

**Arguments**:

- `skip_empty_attributes` _bool, optional_ - Determines whether empty attributes are included in the list.
  Defaults to True.
- `skip_attributes` _Optional[set], optional_ - A set of attributes to ignore. Defaults to \{&quot;complete&quot;\}.
  

**Returns**:

- `Optional[list]` - A list of columns or None if no meaningful columns can be determined.
  

**Notes**:

  The &quot;location&quot; attribute of an Address object is always skipped in the column list.

#### type() {#AssemblyLine.al\_document.ALAddendumField.type}

```python
def type() -> str
```

Determine the data type of the contained value.

Categories:
- &#x27;list&#x27;: A simple list.
- &#x27;object_list&#x27;: A list containing dictionaries or objects.
- &#x27;other&#x27;: Any other type.

**Returns**:

- `str` - The type category of the value.

#### is\_list() {#AssemblyLine.al\_document.ALAddendumField.is\_list}

```python
def is_list() -> bool
```

Check if the field contains a list value, whether it consists of objects, dictionaries, or standard values.

**Returns**:

- `bool` - True if the field contains a list, otherwise False.

#### is\_object\_list() {#AssemblyLine.al\_document.ALAddendumField.is\_object\_list}

```python
def is_object_list() -> bool
```

Determine if the field contains a list of dictionaries or objects.

**Returns**:

- `bool` - True if the field contains a list of dictionaries or objects, otherwise False.

#### overflow\_markdown() {#AssemblyLine.al\_document.ALAddendumField.overflow\_markdown}

```python
def overflow_markdown() -> str
```

Generate a markdown representation of the overflow values.

The method returns either a markdown table or a bulleted list based on the structure of the values.
This utility offers a standardized way to represent overflow content, though users might prefer
to manually control the output&#x27;s format.

**Returns**:

- `str` - A markdown representation of the overflow values.

#### overflow\_docx(path: str = "docassemble.ALDocumentDict:data/templates/addendum\_table.docx") {#AssemblyLine.al\_document.ALAddendumField.overflow\_docx}

```python
def overflow_docx(
    path: str = "docassemble.ALDocumentDict:data/templates/addendum_table.docx"
) -> Any
```

Insert a formatted table into a docx file, representing the overflow values.

This method provides a convenient way to add overflow content into a docx file, although it
doesn&#x27;t offer formatting control. If more formatting flexibility is required, consider directly
fetching the overflow values using the `overflow_value()` method.

**Arguments**:

- `path` _str, optional_ - Path to the template docx file to be used.
  Defaults to a predetermined path.
  

**Returns**:

  A docx template with the inserted table.

## ALAddendumFieldDict Objects {#AssemblyLine.al\_document.ALAddendumFieldDict}

```python
class ALAddendumFieldDict(DAOrderedDict)
```

A specialized dictionary for managing fields that may overflow in a document.

This class assists in organizing and controlling fields that might exceed
a specified character limit in a document. It provides utilities to determine
if an overflow condition exists and to correctly display fields in various
contexts, ensuring only the necessary text is shown.

Adding a new entry will implicitly set the `field_name` attribute of the field

**Attributes**:

- `style` _str_ - Determines the display behavior. If set to &quot;overflow_only&quot;,
  only the overflow text will be displayed.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALAddendumFieldDict.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### initializeObject(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALAddendumFieldDict.initializeObject}

```python
def initializeObject(*pargs, **kwargs) -> Any
```

Initializes a new dictionary entry and sets its `field_name` attribute.

When an entry is implicitly created, this method ensures the item knows
its own field name by setting the `field_name` attribute.

**Arguments**:

- `*pargs` - List of arguments to use to create the dict entry. The 0th arg is
  also used to set the `field_name` attribute.
- `**kwargs` - List of keyword arguments used to create the dict entry
  

**Returns**:

  The new dictionary entry created

#### from\_list(data: List[Dict]) {#AssemblyLine.al\_document.ALAddendumFieldDict.from\_list}

```python
def from_list(data: List[Dict]) -> None
```

Populate the dictionary using a list of field data.

**Arguments**:

- `data` _list_ - List of dictionaries containing ield data with keys &quot;field_name&quot;
  and &quot;overflow_trigger&quot;.

#### defined\_fields(style: str = "overflow\_only") {#AssemblyLine.al\_document.ALAddendumFieldDict.defined\_fields}

```python
def defined_fields(style: str = "overflow_only") -> list
```

Fetch a list of fields that are defined.

**Arguments**:

- `style` _str, optional_ - If set to &quot;overflow_only&quot;, only the fields with overflow values
  will be returned. Defaults to &quot;overflow_only&quot;.
  

**Returns**:

- `list` - List of defined fields based on the specified style.

#### overflow() {#AssemblyLine.al\_document.ALAddendumFieldDict.overflow}

```python
def overflow() -> list
```

Retrieve fields that have overflowed their character limits.

**Returns**:

- `list` - A list of fields with overflow values.

#### has\_overflow() {#AssemblyLine.al\_document.ALAddendumFieldDict.has\_overflow}

```python
def has_overflow() -> bool
```

Determine if any field within the dictionary exceeds its overflow limit.

**Returns**:

- `bool` - True if at least one field overflows, False otherwise.

## DALazyAttribute Objects {#AssemblyLine.al\_document.DALazyAttribute}

```python
class DALazyAttribute(DAObject)
```

Extends the `DAObject` to support attributes that are re-evaluated with every page load.

This is particularly helpful when there&#x27;s a need to cache information on a per-page basis.
The implementation leverages docassemble&#x27;s object pickling process by customizing the
`__getstate__` method that Pickle uses for serialization.

**Attributes**:

- `instanceName` _str_ - A unique identifier for the object instance, if available.

#### \_\_getstate\_\_() {#AssemblyLine.al\_document.DALazyAttribute.\_\_getstate\_\_}

```python
def __getstate__() -> dict
```

Overrides the default method used by Pickle for object serialization.

If the object has an `instanceName` attribute, it is retained during serialization.
Otherwise, an empty dictionary is returned, ensuring that other attributes are not
persisted across page loads.

**Returns**:

- `dict` - A dictionary containing only the `instanceName` if it exists, or empty otherwise.

## ALDocument Objects {#AssemblyLine.al\_document.ALDocument}

```python
class ALDocument(DADict)
```

A dictionary of attachments, either created by a DAFile or an attachment
block. Typically there are three:
1. The final version of a document with a signature. E.g., my_doc[&#x27;final&#x27;].
2. The preview version of a document with no signature. E.g.,
my_doc[&#x27;preview&#x27;].
3. An addendum of a document contained in the attribute `addendum`. E.g.
`my_doc.addendum`.

There is no limit to the number of keys, but the ALDocumentBundle class
expects at least a &quot;final&quot; key to exist, and the `addendum` attribute is
required if you desire to use PDF documents with text overflow. It is best
practice to use exactly the two keys &quot;final&quot; and &quot;preview&quot; and the attribute
&quot;addendum&quot;. The &quot;final&quot; and &quot;preview&quot; documents will normally be the same
template, but with logic controlling the display of a particular section, such
as the signature.

Each form that an interview generates should get its own ALDocument object.

The &quot;addendum&quot; attribute can be handled in a generic object block. Multiple
documents can use the same addendum template, with just the case caption
varying.

ALDocuments are designed to be used contingently as part of ALDocumentBundle
objects. Each ALDocument is considered to be &quot;enabled&quot; or &quot;disabled&quot; for a
particular interview user&#x27;s session. This allows you to always work with a
single object representing all of the possible documents an interview can
generate, and use encapsulated logic to trigger individual documents inclusion
on the final download screen.

**Attributes**:

- `filename` _str_ - name used for output PDF
- `title` _str_ - display name for the output PDF
- `enabled` _bool_ - if this document should be created. See examples.
- `addendum` _DAFile | DAFileCollection_ - (optional) an attachment block
- `overflow_fields` _ALAddendumField_ - (optional) ALAddendumFieldDict
  instance. These values will be used to detect and handle overflow.
- `has_addendum` _bool_ - (optional) Defaults to False. Set to True if the
  document could have overflow, like for a PDF template.
  

**Notes**:

  The `enabled` attribute should always be defined by a code block or the
  objects block, because by default it is considered fresh on each page
  load. If your interview logic requires that you directly ask the user
  whether or not to include a document, you can use a single intermediate
  variable that is posed to the interview user to work around this
  limitation.
  
- `Examples` - # TODO: the code blocks aren&#x27;t working right yet on the Docusaurus page.
  
  Simple use where the document is always enabled and will have no addendum
  --------------------------------------------------------------------------
    ```yaml
    ---
    objects:
      - my_doc: ALDocument.using(filename="myDoc.pdf", title="myDoc", enabled=True)
    ---
    attachment:
      variable name: my_doc[i]  # This same template will be used for the `preview` and `final` keys
      content: |
        Here is some content

        % if i == 'final':
        $\{ users[0].signature \}
        % elif i == 'preview':
        [ Your signature here ]
        % endif
    ```
  
  Enable a document conditionally
  --------------------------------
    ```yaml
    ---
    # See that `enabled` is not defined here
    objects:
      - affidavit_of_indigency: ALDocument.using(filename=&quot;affidavit-of-indigency.pdf&quot;, title=&quot;Affidavit of Indigency&quot;)
    ---
    code: |
      affidavit_of_indigency.enabled = ask_indigency_questions and is_indigent
    ```
  
  An example enabling with a question posed to the interview user
  ----------------------------------------------------------------
  You should always use a code block or an object block to set the &quot;enabled&quot; status;
  Use an intermediate variable if you want to ask the user directly whether or not to include a document.
    ```yaml
    ---
    question: |
      Do you want the extra document included?
    fields:
      - no label: include_extra_document
        datatype: yesnoradio
    ---
    code: |
      extra_document.enabled = include_extra_document
    ---
    attachment:
        variable name: extra_document[i] # This same template will be used for `final` and `preview`
        docx template file: extra_document.docx
    ```
  
  For a document that may need an addendum, you must specify this when the object is created
  or in a mandatory code block. The addendum will only be triggered if the document has &quot;overflow&quot;
  in one of the fields that you specify.
    ```
    ---
    objects:
      - my_doc: ALDocument.using(filename="myDoc.pdf", title="myDoc", enabled=True, has_addendum=True)
    ---
    attachment:
        variable name: my_doc[i]
        ...
    ---
    generic object: ALDocument
    attachment:
      variable name: x.addendum
      docx template file: docx_addendum.docx
    ---
    code: |
      my_doc.overflow_fields['big_text_variable'].overflow_trigger = 640 # Characters
      my_doc.overflow_fields['big_text_variable'].label = "Big text label" # Optional - you may use in your addendum
      my_doc.overflow_fields['list_of_objects_variable'].overflow_trigger = 4 # Items in the list
      my_doc.overflow_fields.gathered = True
    ```

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALDocument.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### as\_pdf(key: str = "final", refresh: bool = True, pdfa: bool = False, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALDocument.as\_pdf}

```python
def as_pdf(key: str = "final",
           refresh: bool = True,
           pdfa: bool = False,
           append_matching_suffix: bool = True) -> DAFile
```

Generates a PDF version of the assembled document.

**Arguments**:

- `key` _str_ - Document version key. Defaults to &quot;final&quot;.
- `refresh` _bool_ - If True, generates the attachment anew each time. Defaults to True.
- `pdfa` _bool_ - If True, generates a PDF/A compliant document. Defaults to False.
- `append_matching_suffix` _bool_ - If True, appends the key as a suffix to the filename when it matches the suffix to append. Defaults to True.
  

**Returns**:

- `DAFile` - Assembled document in PDF format, possibly combined with addendum.

#### as\_docx(key: str = "final", refresh: bool = True, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALDocument.as\_docx}

```python
def as_docx(key: str = "final",
            refresh: bool = True,
            append_matching_suffix: bool = True) -> DAFile
```

Generates a DOCX version of the assembled document, if possible. Falls back to PDF if not.

**Arguments**:

- `key` _str_ - Document version key. Defaults to &quot;final&quot;.
- `refresh` _bool_ - If True, generates the attachment anew each time. Defaults to True.
- `append_matching_suffix` _bool_ - If True, appends the key as a suffix to the filename when it matches the suffix to append. Defaults to True.
  

**Returns**:

- `DAFile` - Assembled document in DOCX or PDF format.

#### as\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocument.as\_list}

```python
def as_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Generates a list containing the main document and its addendum, if applicable.

**Arguments**:

- `key` _str_ - Document version key. Defaults to &quot;final&quot;.
- `refresh` _bool_ - If True, generates the attachments anew each time. Defaults to True.
  

**Returns**:

- `List[DAFile]` - List containing the main document and possibly its addendum.

#### need\_addendum() {#AssemblyLine.al\_document.ALDocument.need\_addendum}

```python
def need_addendum() -> bool
```

Determines if there&#x27;s a need for an addendum in the document.
First checks if the addendum is enabled, and then checks if there&#x27;s overflow.

**Returns**:

- `bool` - True if an addendum is needed, False otherwise.

#### has\_overflow() {#AssemblyLine.al\_document.ALDocument.has\_overflow}

```python
def has_overflow() -> bool
```

Checks if the document has fields that exceed their character limits.

**Returns**:

- `bool` - True if there are overflow fields, False otherwise.

#### overflow() {#AssemblyLine.al\_document.ALDocument.overflow}

```python
def overflow() -> list
```

Retrieves a list of fields that have overflowed their character limits.

**Returns**:

- `list` - List of overflow fields.

#### original\_or\_overflow\_message(field\_name: str, overflow\_message: str = "", input\_width: int = 80, preserve\_newlines: bool = False, \_original\_value: Optional[str] = None, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALDocument.original\_or\_overflow\_message}

```python
def original_or_overflow_message(
        field_name: str,
        overflow_message: str = "",
        input_width: int = 80,
        preserve_newlines: bool = False,
        _original_value: Optional[str] = None,
        preserve_words: bool = True) -> Union[str, List[Any]]
```

Helper syntax to access a member field.

Return the original value if it is less than the overflow trigger (once processed), otherwise return the overflow message.

Unlike safe_value(), this will never output a partial value.

**Arguments**:

- `field_name` _str_ - The name of the field to check.
- `overflow_message` _str_ - A short message to go on the page where text is cutoff.
- `input_width` _int_ - The width, in characters, of the input box. Defaults to 80.
- `preserve_newlines` _bool_ - Determines whether newlines are preserved in the &quot;safe&quot; text.
  Defaults to False, which means all newlines are removed. This allows more text to appear
  before being sent to the addendum.
- `_original_value` _Any_ - for speed reasons, you can provide the full text and just use this
  method to determine if the overflow trigger is exceeded. If no _original_value is
  provided, this method will determine it using the value_if_defined() method.
- `preserve_words` _bool_ - If True, the algorithm will try to preserve whole words when
  truncating the text. If False, the algorithm will truncate the text at the overflow
  trigger, regardless of whether it is in the middle of a word.
  

**Returns**:

  Union[str, List[Any]]: Either the original value or the overflow message, never a truncated value.

#### safe\_value(field\_name: str, overflow\_message: Optional[str] = None, preserve\_newlines: bool = False, input\_width: int = 80, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALDocument.safe\_value}

```python
def safe_value(field_name: str,
               overflow_message: Optional[str] = None,
               preserve_newlines: bool = False,
               input_width: int = 80,
               preserve_words: bool = True) -> str
```

Retrieve the &quot;safe&quot; value of a specified field, which is shorter than the overflow trigger.

**Arguments**:

- `field_name` _str_ - The name of the field to retrieve the safe value from.
- `overflow_message` _Optional[str]_ - Message to display when the field value overflows. Defaults to the class&#x27;s default overflow message.
- `preserve_newlines` _bool_ - Whether to maintain newlines in the output. Defaults to False.
- `input_width` _int_ - The expected input width, used for formatting. Defaults to 80.
- `preserve_words` _bool_ - Whether to avoid splitting words during formatting. Defaults to True.
  

**Returns**:

- `str` - The &quot;safe&quot; value of the specified field.

#### overflow\_value(field\_name: str, overflow\_message: Optional[str] = None, preserve\_newlines: bool = False, input\_width: int = 80, preserve\_words: bool = True) {#AssemblyLine.al\_document.ALDocument.overflow\_value}

```python
def overflow_value(field_name: str,
                   overflow_message: Optional[str] = None,
                   preserve_newlines: bool = False,
                   input_width: int = 80,
                   preserve_words: bool = True) -> str
```

Retrieve the &quot;overflow&quot; value of a specified field, which is the amount exceeding the overflow trigger.

**Arguments**:

- `field_name` _str_ - The name of the field to retrieve the overflow value from.
- `overflow_message` _Optional[str]_ - Message to display when the field value overflows. Defaults to the object&#x27;s default overflow message.
- `preserve_newlines` _bool_ - Whether to maintain newlines in the output. Defaults to False.
- `input_width` _int_ - The expected input width, used for formatting. Defaults to 80.
- `preserve_words` _bool_ - Whether to avoid splitting words during formatting. Defaults to True.
  

**Returns**:

- `str` - The &quot;overflow&quot; value of the specified field.

#### is\_enabled(refresh: bool = True) {#AssemblyLine.al\_document.ALDocument.is\_enabled}

```python
def is_enabled(refresh: bool = True) -> bool
```

Determine if a document is considered &quot;enabled&quot; based on various conditions.

A document is &quot;enabled&quot; if:
1. The .always_enabled attribute is set to true (i.e., enabled at initialization).
2. The .enabled attribute is set to true (calculated fresh once per page load).
3. The cache.enabled attribute is set to true.

**Arguments**:

- `refresh` _bool_ - If True, refreshes the enabled status of the document. Defaults to True.
  

**Returns**:

- `bool` - True if the document is enabled, otherwise False.

## ALStaticDocument Objects {#AssemblyLine.al\_document.ALStaticDocument}

```python
class ALStaticDocument(DAStaticFile)
```

A class for initializing static documents for inclusion in an ALDocumentBundle with a one-liner.

**Notes**:

  Static files should always be placed in the `/data/static` folder of a package. The `/data/templates` folder is private
  and the ALDocumentBundle requires publicly accessible files.
  

**Attributes**:

- `filename` _str_ - Path to the file within `/data/static/`.
- `title` _str_ - Title displayed as a row when invoking `download_list_html()` method from ALDocumentBundle.
  

**Examples**:

  Add a static PDF file to a document bundle.
  .. code-block:: yaml
  ---
  objects:
  - static_test: ALStaticDocument.using(title=&quot;Static Test&quot;, filename=&quot;static.pdf&quot;, enabled=True)
  ---
  objects:
  - bundle: ALDocumentBundle.using(elements=[static_test], filename=&quot;bundle&quot;, title=&quot;Documents to download now&quot;)
  

**Todo**:

  Consider handling files in `/data/templates` if deemed useful, potentially by copying into a DAFile using `pdf_concatenate()`.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALStaticDocument.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### \_\_getitem\_\_(key) {#AssemblyLine.al\_document.ALStaticDocument.\_\_getitem\_\_}

```python
def __getitem__(key)
```

Override to ensure &#x27;final&#x27; and &#x27;private&#x27; keys always exist and reference the same file.

**Returns**:

- `ALStaticDocument` - Returns self.

#### as\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALStaticDocument.as\_list}

```python
def as_list(key: str = "final", refresh: bool = True) -> List[DAStaticFile]
```

Get the document as a list.

**Arguments**:

- `key` _str_ - Key to access the document. Defaults to &quot;final&quot;.
- `refresh` _bool_ - Whether to refresh the document. Defaults to True.
  

**Returns**:

- `List[DAStaticFile]` - A list containing this document.

#### as\_pdf(key: str = "final", pdfa: bool = False, filename: str = "", append\_matching\_suffix: bool = True, refresh: bool = False) {#AssemblyLine.al\_document.ALStaticDocument.as\_pdf}

```python
def as_pdf(key: str = "final",
           pdfa: bool = False,
           filename: str = "",
           append_matching_suffix: bool = True,
           refresh: bool = False) -> Union[DAStaticFile, DAFile]
```

Convert the document into PDF format.

**Arguments**:

- `key` _str_ - Key to access the document. Defaults to &quot;final&quot;.
- `pdfa` _bool_ - Whether to return the document in PDF/A format. Defaults to False.
- `filename` _str_ - Name for the converted file. Defaults to the original filename.
- `append_matching_suffix` _bool_ - Whether to append a matching suffix to the filename. Defaults to True.
- `refresh` _bool_ - Whether to refresh the document. Defaults to False.
  

**Returns**:

  Union[DAStaticFile, DAFile]: The document in PDF format.

#### as\_docx(key: str = "final", refresh: bool = True, append\_matching\_suffix: bool = False) {#AssemblyLine.al\_document.ALStaticDocument.as\_docx}

```python
def as_docx(
        key: str = "final",
        refresh: bool = True,
        append_matching_suffix: bool = False) -> Union[DAStaticFile, DAFile]
```

Convert the document into DOCX format, if possible. If not, return as PDF.

**Arguments**:

- `key` _str_ - Key to access the document. Defaults to &quot;final&quot;.
- `refresh` _bool_ - Whether to refresh the document. Defaults to True.
- `append_matching_suffix` _bool_ - Not used for static documents. They remain unchanged.
  

**Returns**:

  Union[DAStaticFile, DAFile]: The document in DOCX or PDF format.

#### show(\*\*kwargs) {#AssemblyLine.al\_document.ALStaticDocument.show}

```python
def show(**kwargs) -> DAFile
```

Display the document.

This method provides a workaround for problems generating thumbnails.

**Arguments**:

- `**kwargs` - Args to pass to DAFile&#x27;s show function
  

**Returns**:

- `DAFile` - Displayable version of the document.

#### is\_enabled(\*\*kwargs) {#AssemblyLine.al\_document.ALStaticDocument.is\_enabled}

```python
def is_enabled(**kwargs) -> bool
```

Check if the document is enabled.

**Arguments**:

- `**kwargs` - Unused (for signature compatibility only)
  

**Returns**:

- `bool` - True if the document is enabled, otherwise False.

## ALDocumentBundle Objects {#AssemblyLine.al\_document.ALDocumentBundle}

```python
class ALDocumentBundle(DAList)
```

A collection of ALDocuments or nested ALDocumentBundles, represented as a DAList.

This class provides functionalities for grouping multiple documents or nested bundles
in a specific order. For instance, you might want to bundle documents differently for the court,
the user, and the opposing party. Each ALDocument within this bundle can be individually &quot;enabled&quot;
or &quot;disabled&quot;, which will determine its inclusion in the generated bundle.

A bundle can be output as a single merged PDF or as a list of individual documents. For nested
bundles, each can be rendered as a merged PDF or a list of documents.

**Attributes**:

- `filename` _str_ - The name of the output file (without extension).
- `title` _str_ - The title of the bundle.
- `enabled` _bool, optional_ - Determines if the bundle is active. Defaults to True.
- `auto_gather` _bool, optional_ - Automatically gathers attributes. Defaults to False.
- `gathered` _bool, optional_ - Specifies if attributes have been gathered. Defaults to True.
- `default_parity` _Optional[Literal[&quot;even&quot;, &quot;odd&quot;]]_ - Default parity to enforce on the PDF. Defaults to None.
  

**Examples**:

  Given three documents: `Cover page`, `Main motion form`, and `Notice of Interpreter Request`,
  bundle them as follows:
    ```
    bundle = ALDocumentBundle(elements=[cover_page, main_motion, notice_of_request],
                              filename="documents_bundle", title="Document Set")
    ```
  
  Convert the bundle to a PDF:
    ```
    combined_pdf = bundle.as_pdf()
    ```
  
  Convert the bundle to a zip archive containing individual PDFs:
    ```
    zipped_files = bundle.as_zip()
    ```

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALDocumentBundle.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### as\_pdf(key: str = "final", refresh: bool = True, pdfa: bool = False, append\_matching\_suffix: bool = True, ensure\_parity: Optional[Literal["even", "odd"]] = None) {#AssemblyLine.al\_document.ALDocumentBundle.as\_pdf}

```python
def as_pdf(
    key: str = "final",
    refresh: bool = True,
    pdfa: bool = False,
    append_matching_suffix: bool = True,
    ensure_parity: Optional[Literal["even",
                                    "odd"]] = None) -> Optional[DAFile]
```

Returns a consolidated PDF of all enabled documents in the bundle.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to return a newly assembled version, default is True.
- `pdfa` _bool_ - If True, generates a PDF/A compliant document, defaults to False.
- `append_matching_suffix` _bool_ - Flag to determine if matching suffix should be appended to file name, default is True.
  Used primarily to enhance automated tests.
- `ensure_parity` _Optional[Literal[&quot;even&quot;, &quot;odd&quot;]]_ - Ensures the number of pages in the PDF is even or odd. If omitted,
  no parity is enforced. Defaults to None.
  

**Returns**:

- `Optional[DAFile]` - Combined PDF file or None if no documents are enabled.

#### \_\_str\_\_() {#AssemblyLine.al\_document.ALDocumentBundle.\_\_str\_\_}

```python
def __str__() -> str
```

Produces a string representation of the PDF in a compatible method
with the DAFile class. In an interview, this will show a thumbnail of
the PDF by default.

**Returns**:

- `str` - String representation of the PDF.

#### as\_zip(key: str = "final", refresh: bool = True, pdfa: bool = False, title: str = "", format: Optional[str] = "pdf", include\_pdf: Optional[bool] = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_zip}

```python
def as_zip(key: str = "final",
           refresh: bool = True,
           pdfa: bool = False,
           title: str = "",
           format: Optional[str] = "pdf",
           include_pdf: Optional[bool] = True) -> DAFile
```

Returns a zip file containing all enabled documents in the bundle in the specified format.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
- `pdfa` _bool_ - If True, all PDFs in the zip will be PDF/A compliant, defaults to False.
- `title` _str_ - Title of the zip file, shown next to the button to download the zip. Defaults to the bundle&#x27;s title.
- `format` _str_ - Format of the documents in the zip file (e.g., &quot;pdf&quot;, &quot;docx&quot;, &quot;original&quot;), default is &quot;pdf&quot;.
- `include_pdf` _bool_ - Flag to include a PDF version of the document if it&#x27;s originally in docx format, default is True.
  

**Returns**:

- `DAFile` - A zip file containing the enabled documents.

#### preview(refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.preview}

```python
def preview(refresh: bool = True) -> Optional[DAFile]
```

Returns a preview version of the bundle as a PDF.

**Arguments**:

- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `Optional[DAFile]` - Preview PDF file or None if no documents are enabled.

#### has\_enabled\_documents(refresh=False) {#AssemblyLine.al\_document.ALDocumentBundle.has\_enabled\_documents}

```python
def has_enabled_documents(refresh=False) -> bool
```

Checks if there is at least one enabled document in the bundle.

**Arguments**:

- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is False.
  

**Returns**:

- `bool` - True if there&#x27;s at least one enabled document, otherwise False.

#### enabled\_documents(refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.enabled\_documents}

```python
def enabled_documents(refresh: bool = True) -> List[Any]
```

Retrieves all enabled documents within the bundle.

**Arguments**:

- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `List[Any]` - List of enabled documents.

#### as\_flat\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_flat\_list}

```python
def as_flat_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Flattens and returns all enabled documents in the bundle, even from nested bundles.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `List[DAFile]` - Flattened list of enabled documents.

#### get\_titles(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.get\_titles}

```python
def get_titles(key: str = "final", refresh: bool = True) -> List[str]
```

Retrieves the titles of all enabled documents in the bundle.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `List[str]` - Titles of the enabled documents.

#### as\_pdf\_list(key: str = "final", refresh: bool = True, pdfa: bool = False) {#AssemblyLine.al\_document.ALDocumentBundle.as\_pdf\_list}

```python
def as_pdf_list(key: str = "final",
                refresh: bool = True,
                pdfa: bool = False) -> List[DAFile]
```

Returns all enabled documents in the bundle as individual PDFs, even from nested bundles.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute and regenerate the enabled documents, default is True.
- `pdfa` _bool_ - Flag to return the documents in PDF/A format, default is False.
  

**Returns**:

- `List[DAFile]` - List of enabled documents as individual PDFs.

#### as\_docx\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_docx\_list}

```python
def as_docx_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Generates a list of enabled documents from the bundle represented as DOCX files.

If a particular document can&#x27;t be represented as a DOCX, its original format or a PDF is returned.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `List[DAFile]` - List of documents represented as DOCX files or in their original format.

#### as\_editable\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_editable\_list}

```python
def as_editable_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Generates a list of editable (DOCX or RTF) versions of the documents in the bundle.

For documents that are not in DOCX or RTF formats, the original file format is returned.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
  

**Returns**:

- `List[DAFile]` - Flat list of documents in DOCX or RTF formats or their original format.

#### get\_cacheable\_documents(key: str = "final", pdf: bool = True, docx: bool = False, original: bool = False, refresh: bool = True, pdfa: bool = False, include\_zip: bool = True, include\_full\_pdf: bool = False, append\_matching\_suffix: bool = True, zip\_include\_pdf: Optional[bool] = None, zip\_format: Optional[str] = None) {#AssemblyLine.al\_document.ALDocumentBundle.get\_cacheable\_documents}

```python
def get_cacheable_documents(
    key: str = "final",
    pdf: bool = True,
    docx: bool = False,
    original: bool = False,
    refresh: bool = True,
    pdfa: bool = False,
    include_zip: bool = True,
    include_full_pdf: bool = False,
    append_matching_suffix: bool = True,
    zip_include_pdf: Optional[bool] = None,
    zip_format: Optional[str] = None
) -> Tuple[List[Dict[str, DAFile]], Optional[DAFile], Optional[DAFile]]
```

Generates a cache of all enabled documents in the bundle, and returns it in a structure that can be cached
and returned for use in a background process.

The result looks like this:

[
\{&quot;title&quot;: &quot;Document 1&quot;, &quot;pdf&quot;: DAFile, &quot;docx&quot;: DAFile, download_filename: str\},
],
DAFile, # Zip of whole bundle
DAFile # PDF of whole bundle

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `pdf` _bool_ - Flag to include a PDF version of each file, default is True.
- `docx` _bool_ - Flag to include a DOCX version of each file, default is False.
- `original` _bool_ - Flag to include the original version of each file, default is False.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
- `pdfa` _bool_ - Flag to return documents in PDF/A format, default is False.
- `include_zip` _bool_ - Flag to include a zip option, default is True.
- `include_full_pdf` _bool_ - Flag to include a PDF version of the whole bundle, default is False.
- `append_matching_suffix` _bool_ - Flag to determine if matching suffix should be appended to file name, default is True.
- `zip_include_pdf` _Optional[bool]_ - If True, includes a PDF version in the zip file even if original is in DOCX format.
- `zip_format` _Optional[str]_ - Format of the primary version of each document.
  

**Returns**:

  Tuple[List[Dict[str, DAFile]], Optional[DAFile], Optional[DAFile]]: A list of dictionaries containing the enabled documents, a zip file of the whole bundle, and a PDF of the whole

#### download\_list\_html(key: str = "final", format: str = "pdf", view: bool = True, refresh: bool = True, pdfa: bool = False, include\_zip: bool = True, view\_label="View", view\_icon: str = "eye", download\_label: str = "Download", download\_icon: str = "download", send\_label: str = "Send", send\_icon: str = "envelope", zip\_label: Optional[str] = None, zip\_icon: str = "file-archive", zip\_row\_label: Optional[str] = "", append\_matching\_suffix: bool = True, include\_email: bool = False, use\_previously\_cached\_files: bool = False, include\_full\_pdf: bool = False, full\_pdf\_label: Optional[str] = None, zip\_include\_pdf: Optional[bool] = True, zip\_format: Optional[str] = None) {#AssemblyLine.al\_document.ALDocumentBundle.download\_list\_html}

```python
def download_list_html(key: str = "final",
                       format: str = "pdf",
                       view: bool = True,
                       refresh: bool = True,
                       pdfa: bool = False,
                       include_zip: bool = True,
                       view_label="View",
                       view_icon: str = "eye",
                       download_label: str = "Download",
                       download_icon: str = "download",
                       send_label: str = "Send",
                       send_icon: str = "envelope",
                       zip_label: Optional[str] = None,
                       zip_icon: str = "file-archive",
                       zip_row_label: Optional[str] = "",
                       append_matching_suffix: bool = True,
                       include_email: bool = False,
                       use_previously_cached_files: bool = False,
                       include_full_pdf: bool = False,
                       full_pdf_label: Optional[str] = None,
                       zip_include_pdf: Optional[bool] = True,
                       zip_format: Optional[str] = None) -> str
```

Constructs an HTML table displaying a list of documents with &#x27;view&#x27; and &#x27;download&#x27; buttons.

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `format` _str_ - Specifies the format of the files in the list. Can be &quot;pdf&quot;, &quot;docx&quot;, or &quot;original&quot;. Default is &quot;pdf&quot;.
- `view` _bool_ - Flag to include a &#x27;view&#x27; button, default is True.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
- `pdfa` _bool_ - Flag to return documents in PDF/A format, default is False.
- `include_zip` _bool_ - Flag to include a zip option, default is True.
- `view_label` _str_ - Label for the &#x27;view&#x27; button, default is &quot;View&quot;.
- `view_icon` _str_ - Icon for the &#x27;view&#x27; button, default is &quot;eye&quot;.
- `download_label` _str_ - Label for the &#x27;download&#x27; button, default is &quot;Download&quot;.
- `download_icon` _str_ - Icon for the &#x27;download&#x27; button, default is &quot;download&quot;.
- `send_label` _str_ - Label for the &#x27;send&#x27; button. Default is &quot;Send&quot;.
- `send_icon` _str_ - Fontawesome icon for the &#x27;send&#x27; button. Default is &quot;envelope&quot;.
- `zip_label` _Optional[str]_ - Label for the zip option. If not provided, uses the generic template for `self.zip_label` (&quot;Download all&quot;).
- `zip_icon` _str_ - Icon for the zip option, default is &quot;file-archive&quot;.
- `zip_row_label` _str, optional_ - Text to go in the left-most column
  of the table&#x27;s zip row. Will default to the value of `self.title`.
- `append_matching_suffix` _bool_ - Flag to determine if matching suffix should be appended to file name, default is True.
- `include_email` _bool_ - Flag to include an option, default is False.
- `use_previously_cached_files` _bool_ - Flag to use previously cached files (e.g., made in background) if defined. default is False.
- `include_full_pdf` _bool_ - Flag to include a full PDF option, default is False.
- `full_pdf_label` _Optional[str]_ - Label for the full PDF option. If not provided, uses the generic template for `self.full_pdf_label` (&quot;Download all&quot;).
- `zip_include_pdf` _Optional[bool]_ - Flag to include PDF files in the zip archive, default is True. If `None` value of `view` will be used.
- `zip_format` _Optional[str]_ - Format of the files in the zip archive. If None, defaults to value of &quot;format&quot; parameter.
  

**Returns**:

- `str` - HTML representation of a table with documents and their associated actions.

#### download\_html(key: str = "final", format: str = "pdf", pdfa: bool = False, view: bool = True, refresh: bool = True, view\_label: str = "View", view\_icon: str = "eye", download\_label: str = "Download", download\_icon: str = "download") {#AssemblyLine.al\_document.ALDocumentBundle.download\_html}

```python
def download_html(key: str = "final",
                  format: str = "pdf",
                  pdfa: bool = False,
                  view: bool = True,
                  refresh: bool = True,
                  view_label: str = "View",
                  view_icon: str = "eye",
                  download_label: str = "Download",
                  download_icon: str = "download") -> str
```

Returns an HTML string of a table to display all the docs
combined into one pdf with &#x27;view&#x27; and &#x27;download&#x27; buttons.

Deprecated; use download_list_html instead

**Arguments**:

- `key` _str_ - Identifier for the document version, default is &quot;final&quot;.
- `format` _str_ - Specifies the format of the files in the list. Can be &quot;pdf&quot;, &quot;docx&quot;, or &quot;original&quot;. Default is &quot;pdf&quot;.
- `pdfa` _bool_ - Flag to return the documents in PDF/A format, default is False.
- `view` _bool_ - Flag to include a &#x27;view&#x27; button, default is True.
- `refresh` _bool_ - Flag to reconsider the &#x27;enabled&#x27; attribute, default is True.
- `view_label` _str_ - Label for the &#x27;view&#x27; button, default is &quot;View&quot;.
- `view_icon` _str_ - Icon for the &#x27;view&#x27; button, default is &quot;eye&quot;.
- `download_label` _str_ - Label for the &#x27;download&#x27; button, default is &quot;Download&quot;.
- `download_icon` _str_ - Icon for the &#x27;download&#x27; button, default is &quot;download&quot;.
  

**Returns**:

- `str` - HTML representation of a table with documents and their associated actions.

#### send\_email\_table\_row(key: str = "final", send\_label: str = "Send", send\_icon: str = "envelope") {#AssemblyLine.al\_document.ALDocumentBundle.send\_email\_table\_row}

```python
def send_email_table_row(key: str = "final",
                         send_label: str = "Send",
                         send_icon: str = "envelope") -> str
```

Generate HTML doc table row for an input box and button that allows
someone to send the bundle to the specified email address.

**Arguments**:

- `key` _str_ - A key used to identify which version of the ALDocument to send. Defaults to &quot;final&quot;.
- `send_label` _str_ - Label for the &#x27;send&#x27; button. Default is &quot;Send&quot;.
- `send_icon` _str_ - Icon for the &#x27;send&#x27; button. Default is &quot;envelope&quot;.
  

**Returns**:

- `str` - The generated HTML string for the table row.

#### send\_button\_to\_html(email: str, editable: Optional[bool] = None, template\_name: str = "", label: str = "Send", icon: str = "envelope", color: str = "primary", key: str = "final", preferred\_formats: Optional[Union[str, List[str]]] = None) {#AssemblyLine.al\_document.ALDocumentBundle.send\_button\_to\_html}

```python
def send_button_to_html(
        email: str,
        editable: Optional[bool] = None,
        template_name: str = "",
        label: str = "Send",
        icon: str = "envelope",
        color: str = "primary",
        key: str = "final",
        preferred_formats: Optional[Union[str, List[str]]] = None) -> str
```

Generate HTML for a button that allows someone to send the bundle to a
specific email address. The email address is not editable by the end user
in contrast to send_button_html.

**Arguments**:

- `email` _str_ - The recipient&#x27;s email address.
- `editable` _bool, optional_ - Flag indicating if the bundle is editable. Defaults to False. (deprecated; use preferred_formats instead)
- `template_name` _str, optional_ - The name of the template to be used. Defaults to an empty string.
- `label` _str, optional_ - The label for the button. Defaults to &quot;Send&quot;.
- `icon` _str, optional_ - The Fontawesome icon for the button. Defaults to &quot;envelope&quot;.
- `color` _str, optional_ - The Bootstrap color of the button. Defaults to &quot;primary&quot;.
- `key` _str, optional_ - A key used to identify which version of the ALDocument to send. Defaults to &quot;final&quot;.
- `preferred_formats` _Optional[Union[str,List[str]]], optional_ - A list of allowed formats for the document. Defaults to &quot;pdf&quot; if not specified.
  

**Returns**:

- `str` - The generated HTML string for the button.

#### send\_button\_html(key: str = "final", show\_editable\_checkbox: bool = True, template\_name: str = "", label: str = "Send", icon: str = "envelope", preferred\_formats: Optional[Union[str, List[str]]] = None) {#AssemblyLine.al\_document.ALDocumentBundle.send\_button\_html}

```python
def send_button_html(
        key: str = "final",
        show_editable_checkbox: bool = True,
        template_name: str = "",
        label: str = "Send",
        icon: str = "envelope",
        preferred_formats: Optional[Union[str, List[str]]] = None) -> str
```

Generate HTML for an input box and button that allows someone to send the bundle
to the specified email address.

Optionally, display a checkbox that allows someone to decide whether or not to
include an editable (Word) copy of the file, if and only if it is available.

**Arguments**:

- `key` _str, optional_ - A key used to identify which version of the ALDocument to send. Defaults to &quot;final&quot;.
- `show_editable_checkbox` _bool, optional_ - Flag indicating if the checkbox
  for deciding the inclusion of an editable (Word) copy should be displayed.
  Defaults to True. If preferred_formats = [&quot;pdf&quot;], this will be ignored and no checkbox will be shown.
- `template_name` _str, optional_ - Name of the template variable that is used to fill
  the email contents. By default, the `x.send_email_template` template will be used.
- `label` _str, optional_ - The label for the button. Defaults to &quot;Send&quot;.
- `icon` _str, optional_ - The Fontawesome icon for the button. Defaults
  to &quot;envelope&quot;.
- `preferred_formats` _Optional[Union[str,List[str]]], optional_ - A list of allowed formats for the document. Defaults to &quot;pdf&quot; if not specified.
  

**Returns**:

- `str` - The generated HTML string for the input box and button.

#### send\_email(to: Any = None, key: str = "final", editable: Optional[bool] = None, template: Optional[Any] = None, preferred\_formats: Optional[Union[str, List[str]]] = "pdf", \*\*kwargs) {#AssemblyLine.al\_document.ALDocumentBundle.send\_email}

```python
def send_email(to: Any = None,
               key: str = "final",
               editable: Optional[bool] = None,
               template: Optional[Any] = None,
               preferred_formats: Optional[Union[str, List[str]]] = "pdf",
               **kwargs) -> bool
```

Send an email with the current bundle as a series of flat pdfs (one per bundle entry)
or as editable documents. This function is similar to
https://docassemble.org/docs/functions.html#send_email with additional parameters.

**Arguments**:

- `to` _Any_ - The email address, list of email addresses, or list of Individuals with a .email attribute to send to.
- `key` _str, optional_ - Specifies which version of the document to send. Defaults to &quot;final&quot;.
- `editable` _bool, optional_ - If True, sends the editable documents. Defaults to False. (Deprecated)
- `template` _Any_ - The template variable for the subject and body of the email, similar to da `send_email` `template` variable.
- `preferred_formats` _str_ - Specifies the format of the files to send. Can be &quot;pdf&quot; or &quot;docx&quot;, or a list of these formats. Overrides deprecated `editable` keyword.
- `**kwargs` - Additional parameters to pass to the da `send_email` function.
  

**Returns**:

- `bool` - Indicates if the email was sent successfully.

#### is\_enabled(refresh=True) {#AssemblyLine.al\_document.ALDocumentBundle.is\_enabled}

```python
def is_enabled(refresh=True) -> bool
```

Check if the bundle itself is enabled, and if it has at least one enabled child document.

**Arguments**:

- `refresh` _bool_ - Whether to refresh the enabled status. Defaults to True.
  

**Returns**:

- `bool` - Indicates if the bundle and its child documents are enabled.

#### as\_docx(key: str = "final", refresh: bool = True, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_docx}

```python
def as_docx(key: str = "final",
            refresh: bool = True,
            append_matching_suffix: bool = True) -> DAFile
```

Convert the enabled documents to a single DOCX file or PDF file if conversion fails.

**Arguments**:

- `key` _str, optional_ - The key to identify enabled documents. Defaults to &quot;final&quot;.
- `refresh` _bool, optional_ - Refresh the enabled documents before conversion. Defaults to True.
- `append_matching_suffix` _bool, optional_ - Append a matching suffix to the output filename. Defaults to True.
  

**Returns**:

- `DAFile` - A DAFile object containing the concatenated DOCX or PDF file.

#### as\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALDocumentBundle.as\_list}

```python
def as_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Return a list of enabled documents.

**Arguments**:

- `key` _str, optional_ - The key to identify enabled documents. Defaults to &quot;final&quot;.
- `refresh` _bool, optional_ - Refresh the enabled documents before returning the list. Defaults to True.
  

**Returns**:

- `List[DAFile]` - A list of enabled DAFile objects.

## ALExhibit Objects {#AssemblyLine.al\_document.ALExhibit}

```python
class ALExhibit(DAObject)
```

Class to represent a single exhibit, with cover page, which may contain multiple documents representing pages.

**Attributes**:

- `pages` _list_ - List of individual DAFiles representing uploaded images or documents.
- `cover_page` _DAFile | DAFileCollection_ - (optional) A DAFile or DAFileCollection object created by an `attachment:` block
  Will typically say something like &quot;Exhibit 1&quot;
- `label` _str_ - A label, like &quot;A&quot; or &quot;1&quot; for this exhibit in the cover page and table of contents
- `starting_page` _int_ - first page number to use in table of contents

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALExhibit.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### ocr\_ready() {#AssemblyLine.al\_document.ALExhibit.ocr\_ready}

```python
def ocr_ready() -> bool
```

Returns True if the OCR process is complete. OCR is non-blocking, and assembly will work
even if OCR is not complete. Check this status if you want to wait to deliver a document until
OCR is complete.

Will return true (but log a warning) if OCR was never started on the documents.
That situation is likely a developer error, as you shouldn&#x27;t wait for OCR if it never started

**Returns**:

- `bool` - True iff OCR process has finished on all pages.

#### ocr\_pages() {#AssemblyLine.al\_document.ALExhibit.ocr\_pages}

```python
def ocr_pages() -> List[DAFile]
```

Retrieve the OCR-processed version of pages if available, else return the original pages.

**Returns**:

- `List[DAFile]` - List of pages, either OCR-processed or original.

#### as\_pdf(\*, refresh: bool = False, prefix: str = "", pdfa: bool = False, add\_page\_numbers: bool = True, add\_cover\_page: bool = True, filename: Optional[str] = None, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALExhibit.as\_pdf}

```python
def as_pdf(*,
           refresh: bool = False,
           prefix: str = "",
           pdfa: bool = False,
           add_page_numbers: bool = True,
           add_cover_page: bool = True,
           filename: Optional[str] = None,
           append_matching_suffix: bool = True) -> DAFile
```

Generates a PDF version of the exhibit, with optional features like Bates numbering or a cover page.

Note that these are keyword only parameters, not positional.

**Arguments**:

- `refresh` _bool_ - If True, forces the exhibit to refresh before generating the PDF. (unused, provided for signature compatibility)
- `prefix` _str_ - Prefix for Bates numbering if &#x27;add_page_numbers&#x27; is True.
- `pdfa` _bool_ - If True, the generated PDF will be in PDF/A format.
- `add_page_numbers` _bool_ - If True, apply Bates numbering starting from &#x27;self.start_page&#x27;.
- `add_cover_page` _bool_ - If True, prepend the exhibit with a cover page.
- `filename` _Optional[str]_ - Custom filename for the generated PDF. Default is &quot;exhibits.pdf&quot;.
- `append_matching_suffix` _bool_ - If True, appends a suffix to the filename based on certain matching criteria.
  

**Returns**:

- `DAFile` - PDF representation of the exhibit.

#### num\_pages() {#AssemblyLine.al\_document.ALExhibit.num\_pages}

```python
def num_pages() -> int
```

Calculate the total number of pages in the exhibit.

**Returns**:

- `int` - Total page count.

#### complete() {#AssemblyLine.al\_document.ALExhibit.complete}

```python
@property
def complete() -> bool
```

For purposes of list gathering, trigger the attributes in the order necessary
to gather a complete exhibit object.

Indicates if the exhibit is complete.

NOTE: This property always returns True after triggering the required attributes.

#### \_\_str\_\_() {#AssemblyLine.al\_document.ALExhibit.\_\_str\_\_}

```python
def __str__() -> str
```

Return the title of the exhibit.

**Returns**:

- `str` - Title of the exhibit.

#### ocrmypdf\_task(from\_file: Union[DAFile, DAFileList], to\_pdf: DAFile) {#AssemblyLine.al\_document.ocrmypdf\_task}

```python
def ocrmypdf_task(from_file: Union[DAFile, DAFileList],
                  to_pdf: DAFile) -> Optional[str]
```

Processes the provided files using the &#x27;ocrmypdf&#x27; utility to apply Optical Character Recognition (OCR).

If the source file is an image (e.g., png, jpg, jpeg, gif), this function sets the image DPI to 300.
For non-image files, the text in the file is skipped during OCR.

This function is designed to be executed as a background task (id: al_exhibit_ocr_pages_bg).

**Arguments**:

- `from_file` _Union[DAFile, DAFileList]_ - The source file or list of files to be OCR-processed.
- `to_pdf` _DAFile_ - The destination file where the OCR-processed output will be saved.
  

**Returns**:

- `Optional[str]` - The path of the OCR-processed file if successful; None otherwise.
  

**Raises**:

- `subprocess.TimeoutExpired` - If the ocrmypdf process takes longer than an hour.

## ALExhibitList Objects {#AssemblyLine.al\_document.ALExhibitList}

```python
class ALExhibitList(DAList)
```

A list representation of ALExhibit objects. Provides utility functions for managing exhibits
and rendering them into a single PDF file.

**Attributes**:

- `maximum_size` _int_ - The maximum allowed size in bytes of the entire document.
- `auto_label` _bool_ - If True, automatically numbers exhibits for cover page and table of contents. Defaults to True.
- `auto_labeler` _Callable_ - An optional function or lambda to transform the exhibit&#x27;s index to a label.
  Uses A..Z labels by default.
- `auto_ocr` _bool_ - If True, automatically starts OCR processing for uploaded exhibits. Defaults to True.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALExhibitList.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### as\_pdf(filename="file.pdf", pdfa: bool = False, add\_page\_numbers: bool = False, toc\_pages: int = 0, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALExhibitList.as\_pdf}

```python
def as_pdf(filename="file.pdf",
           pdfa: bool = False,
           add_page_numbers: bool = False,
           toc_pages: int = 0,
           append_matching_suffix: bool = True) -> DAFile
```

Compiles all exhibits in the list into a single PDF.

**Arguments**:

- `filename` _str_ - Desired filename for the generated PDF.
- `pdfa` _bool_ - If True, generates the PDF in PDF/A format.
- `add_page_numbers` _bool_ - If True, adds page numbers to the generated PDF.
- `toc_pages` _int_ - Expected number of pages in the table of contents.
- `append_matching_suffix` _bool_ - If True, appends matching suffix to the filename.
  

**Returns**:

- `DAFile` - A single PDF containing all exhibits.

#### size\_in\_bytes() {#AssemblyLine.al\_document.ALExhibitList.size\_in\_bytes}

```python
def size_in_bytes() -> int
```

Calculates the total size in bytes of all exhibits in the list.

**Returns**:

- `int` - Total size of all exhibits in bytes.

#### ocr\_ready() {#AssemblyLine.al\_document.ALExhibitList.ocr\_ready}

```python
def ocr_ready() -> bool
```

Checks if all exhibits in the list have completed the OCR process.

**Returns**:

- `bool` - True if all exhibits are OCRed or if OCR hasn&#x27;t started. False otherwise.

#### hook\_after\_gather() {#AssemblyLine.al\_document.ALExhibitList.hook\_after\_gather}

```python
def hook_after_gather() -> None
```

Callback function executed after the entire list of exhibits is collected.
Manages auto-labeling and initiates OCR if necessary.

## ALExhibitDocument Objects {#AssemblyLine.al\_document.ALExhibitDocument}

```python
class ALExhibitDocument(ALDocument)
```

Represents a collection of uploaded documents, formatted like a record appendix
or an exhibit list, complete with an optional table of contents and page numbering.

**Attributes**:

- `exhibits` _ALExhibitList_ - A list of ALExhibit documents. Each item represents
  a distinct exhibit, which can span multiple pages.
- `table_of_contents` _DAFile or DAFileCollection_ - Generated by an `attachment:` block.
- `_cache` _DAFile_ - A cached version of the exhibit list. Caching is used due to
  potential long processing times.
- `include_table_of_contents` _bool_ - Indicates if a table of contents should be generated.
- `include_exhibit_cover_pages` _bool_ - Determines if cover pages should accompany each exhibit.
- `add_page_numbers` _bool_ - If True, the as_pdf() method will add page numbers and labels.
- `auto_labeler` _Callable_ - A function or lambda for labeling exhibits.
  

**Todo**:

  * Implement a method for a safe link in place of the attachment
  (considering potential filesize constraints on emails).
  

**Examples**:

```
---
objects:
  - exhibit_attachment: ALExhibitDocument.using(title="Exhibits", filename="exhibits" )
---
code: |
  # This block is not needed, but you can provide and customize for your needs.
  # This mirrors the fallback block in ql_baseline.yml
  exhibit_attachment.enabled = exhibit_attachment.exhibits.has_exhibits
---
objects:
  - al_user_bundle: ALDocumentBundle.using(elements=[my_instructions, my_main_attachment, exhibit_attachment], filename="user_bundle.pdf", title="All forms to download for your records")
```
  
  Example of using a custom label function, https://docassemble.org/docs/functions.html#item_label:
```
---
objects:
  - exhibit_attachment: ALExhibitDocument.using(title="Exhibits", filename="exhibits" , auto_labeler=item_label)
```

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALExhibitDocument.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### has\_overflow() {#AssemblyLine.al\_document.ALExhibitDocument.has\_overflow}

```python
def has_overflow() -> bool
```

Check if there is any overflow in the document.

This is for compatibility with ALDocument; Exhibits inherently don&#x27;t have overflow.

**Returns**:

- `bool` - Always False for this implementation.

#### ocr\_ready() {#AssemblyLine.al\_document.ALExhibitDocument.ocr\_ready}

```python
def ocr_ready() -> bool
```

Determine if all exhibits within the document have undergone OCR processing.

**Returns**:

- `bool` - True if all exhibits have been OCRed or if the OCR process hasn&#x27;t been initiated.

#### \_\_getitem\_\_(key) {#AssemblyLine.al\_document.ALExhibitDocument.\_\_getitem\_\_}

```python
def __getitem__(key)
```

Overridden method to ensure &#x27;final&#x27; and &#x27;private&#x27; keys always reference the same file.

**Arguments**:

- `key` - The key to fetch the item.
  

**Returns**:

- `ALExhibitDocument` - Returns the current instance of the class.

#### as\_list(key: str = "final", refresh: bool = True) {#AssemblyLine.al\_document.ALExhibitDocument.as\_list}

```python
def as_list(key: str = "final", refresh: bool = True) -> List[DAFile]
```

Retrieve the document as a list.

**Arguments**:

- `key` _str_ - Identifier key for the document. Default is &quot;final&quot;.
- `refresh` _bool_ - If True, the document list will be refreshed. Default is True.
  

**Returns**:

- `List[DAFile]` - A list containing the document.

#### as\_pdf(key: str = "final", refresh: bool = True, pdfa: bool = False, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALExhibitDocument.as\_pdf}

```python
def as_pdf(key: str = "final",
           refresh: bool = True,
           pdfa: bool = False,
           append_matching_suffix: bool = True) -> DAFile
```

Render the document as a PDF.

**Arguments**:

- `key` _str_ - Identifier key for the document. Default is &quot;final&quot;.
  For compatibility with ALDocument.
- `refresh` _bool_ - If True, refreshes the PDF document. Default is True.
  For compatibility with ALDocument.
- `pdfa` _bool_ - If True, the output PDF will be in PDF/A format. Default is False.
- `append_matching_suffix` _bool_ - If True, appends a matching suffix to the filename.
  

**Returns**:

- `DAFile` - The document rendered as a PDF.

#### as\_docx(key: str = "final", refresh: bool = True, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALExhibitDocument.as\_docx}

```python
def as_docx(key: str = "final",
            refresh: bool = True,
            append_matching_suffix: bool = True) -> DAFile
```

Despite the name, renders the document as a PDF. Provided for signature compatibility.

**Arguments**:

- `key` _str, optional_ - Identifier key for the document. Default is &quot;final&quot;.
- `refresh` _bool, optional_ - If True, refreshes the DOCX document. Default is True.
- `append_matching_suffix` _bool, optional_ - If True, appends a matching suffix to the filename (for automated tests).
  

**Returns**:

- `DAFile` - The document rendered as a PDF.

## ALTableDocument Objects {#AssemblyLine.al\_document.ALTableDocument}

```python
class ALTableDocument(ALDocument)
```

Represents a document tailored for table-like data presentation.
This class provides functionality to export data as a table in various formats such as PDF and DOCX.

**Attributes**:

- `has_addendum` _bool_ - A flag indicating the presence of an addendum in the document.
- `suffix_to_append` _str_ - Suffix that can be appended to file names, defaulting to &quot;preview&quot;.
- `file` _DAFile, optional_ - Reference to the generated file (can be PDF, DOCX, etc.).
- `table` _???_ - Represents the actual table data. Type and attributes need more context to document.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALTableDocument.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### has\_overflow() {#AssemblyLine.al\_document.ALTableDocument.has\_overflow}

```python
def has_overflow() -> bool
```

Check for overflow in the document.

For compatibility with ALDocument; Tables inherently don&#x27;t have overflow.

**Returns**:

- `bool` - Always False for this implementation.

#### \_\_getitem\_\_(key) {#AssemblyLine.al\_document.ALTableDocument.\_\_getitem\_\_}

```python
def __getitem__(key)
```

Allows for index-based retrieval of a document.

Overridden to ensure &#x27;final&#x27; and &#x27;private&#x27; keys always return the same document.

**Arguments**:

- `key` - The key to fetch the item.
  

**Returns**:

- `DAFile` - The document in its PDF format.

#### as\_list(key: str = "final", refresh: bool = True, \*\*kwargs) {#AssemblyLine.al\_document.ALTableDocument.as\_list}

```python
def as_list(key: str = "final",
            refresh: bool = True,
            **kwargs) -> List[DAFile]
```

Retrieve the document as a list.

**Arguments**:

- `key` _str_ - Identifier key for the document. Default is &quot;final&quot;.
- `refresh` _bool_ - If True, the document list will be refreshed. Default is True.
  

**Returns**:

- `List[DAFile]` - A list containing the document.

#### as\_pdf(key: str = "final", refresh: bool = True, pdfa: bool = False, append\_matching\_suffix: bool = True, \*\*kwargs) {#AssemblyLine.al\_document.ALTableDocument.as\_pdf}

```python
def as_pdf(key: str = "final",
           refresh: bool = True,
           pdfa: bool = False,
           append_matching_suffix: bool = True,
           **kwargs) -> DAFile
```

Despite the name, returns the document as an Excel Spreadsheet (XLSX file).
Name retained for signature compatibility.

**Arguments**:

- `key` _str_ - Identifier key for the document, mainly for compatibility with ALDocument.
- `refresh` _bool_ - For signature compatibility
- `pdfa` _bool_ - For signature compatibility
- `append_matching_suffix` _bool_ - For signature compatibility
  

**Returns**:

- `DAFile` - The table rendered as an XLSX spreadsheet

#### as\_docx(key: str = "bool", refresh: bool = True, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALTableDocument.as\_docx}

```python
def as_docx(key: str = "bool",
            refresh: bool = True,
            append_matching_suffix: bool = True) -> DAFile
```

Despite the name, returns the document as an Excel Spreadsheet (XLSX file).
Name retained for signature compatibility.

**Arguments**:

- `key` _str_ - Identifier key for the document, mainly for compatibility with ALDocument.
- `refresh` _bool_ - For signature compatibility
- `pdfa` _bool_ - For signature compatibility
- `append_matching_suffix` _bool_ - For signature compatibility
  

**Returns**:

- `DAFile` - The table rendered as an XLSX spreadsheet

## ALUntransformedDocument Objects {#AssemblyLine.al\_document.ALUntransformedDocument}

```python
class ALUntransformedDocument(ALDocument)
```

Represents an untransformed document. The class provides methods to access the document
without making any modifications to it. The provided methods are mainly for duck-typing
compatibility with ALDocument.

**Attributes**:

- `has_addendum` _bool_ - A flag indicating the presence of an addendum in the document.
- `suffix_to_append` _str_ - Suffix that can be appended to file names, defaulting to &quot;preview&quot;.

#### init(\*pargs, \*\*kwargs) {#AssemblyLine.al\_document.ALUntransformedDocument.init}

```python
def init(*pargs, **kwargs) -> None
```

Standard DAObject init method.

**Arguments**:

- `*pargs` - Positional arguments
- `**kwargs` - Keyword arguments

#### has\_overflow() {#AssemblyLine.al\_document.ALUntransformedDocument.has\_overflow}

```python
def has_overflow() -> bool
```

Check for overflow in the document.

For compatibility with ALDocument. Untransformed documents inherently don&#x27;t have overflow.

**Returns**:

- `bool` - Always False for this implementation.

#### as\_list(key: str = "final", refresh: bool = True, \*\*kwargs) {#AssemblyLine.al\_document.ALUntransformedDocument.as\_list}

```python
def as_list(key: str = "final",
            refresh: bool = True,
            **kwargs) -> List[DAFile]
```

Retrieve the document as a list.

**Arguments**:

- `key` _str_ - Identifier key for the document. Default is &quot;final&quot;.
- `refresh` _bool_ - If True, the document list will be refreshed. Default is True.
  

**Returns**:

- `List[DAFile]` - A list containing the document.

#### as\_pdf(key: str = "final", refresh: bool = True, pdfa: bool = False, append\_matching\_suffix: bool = True, \*\*kwargs) {#AssemblyLine.al\_document.ALUntransformedDocument.as\_pdf}

```python
def as_pdf(key: str = "final",
           refresh: bool = True,
           pdfa: bool = False,
           append_matching_suffix: bool = True,
           **kwargs) -> DAFile
```

Fetch the document in its original form, without any transformations.

This method is primarily for duck-typing compatibility with ALDocument.

**Arguments**:

- `key` _str_ - Identifier key for the document. Unused, but included for compatibility.
- `refresh` _bool_ - If True, fetches the latest version of the document. Default is True.
- `pdfa` _bool_ - Unused argument for compatibility.
- `append_matching_suffix` _bool_ - Unused argument for compatibility.
  

**Returns**:

- `DAFile` - The original, untransformed document.

#### as\_docx(key: str = "final", refresh: bool = True, append\_matching\_suffix: bool = True) {#AssemblyLine.al\_document.ALUntransformedDocument.as\_docx}

```python
def as_docx(key: str = "final",
            refresh: bool = True,
            append_matching_suffix: bool = True) -> DAFile
```

Fetch the document in its original form, without any transformations.

This method is primarily for duck-typing compatibility with ALDocument.

**Arguments**:

- `key` _str_ - Identifier key for the document. Default is &quot;final&quot;.
- `refresh` _bool_ - If True, fetches the latest version of the document. Default is True.
- `append_matching_suffix` _bool_ - Unused argument for compatibility.
  

**Returns**:

- `DAFile` - The original, untransformed document.

## ALDocumentUpload Objects {#AssemblyLine.al\_document.ALDocumentUpload}

```python
class ALDocumentUpload(ALUntransformedDocument)
```

Simplified class to handle uploaded documents, without any of the complexity of the
ALExhibitDocument class.

#### unpack\_dafilelist(the\_file: DAFileList) {#AssemblyLine.al\_document.unpack\_dafilelist}

```python
def unpack_dafilelist(the_file: DAFileList) -> DAFile
```

Creates a plain DAFile out of the first item in a DAFileList

**Arguments**:

- `the_file` _DAFileList_ - an item representing an uploaded document in a docassemble interview
  

**Returns**:

  A DAFile representing the first item in the DAFileList, with a fixed instanceName attribute.


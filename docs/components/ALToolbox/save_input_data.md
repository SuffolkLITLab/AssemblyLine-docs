# Table of Contents

* [ALToolbox.save\_input\_data](#ALToolbox.save_input_data)
  * [save\_input\_data](#ALToolbox.save_input_data.save_input_data)

---
sidebar_label: save_input_data
title: ALToolbox.save_input_data
---

<a id="ALToolbox.save_input_data.save_input_data"></a>

#### save\_input\_data(title: str = "", input\_dict: Optional[Dict[str, Any]] = None, tags: Optional[List[str]] = None)

```python
def save_input_data(title: str = "",
                    input_dict: Optional[Dict[str, Any]] = None,
                    tags: Optional[List[str]] = None) -> None
```

Save survey interview input data to JSON storage for data reporting purposes.

Processes and stores user input data from survey-type interviews into the
docassemble JSON storage system. Automatically handles type inference and
flattening of complex data structures like checkboxes and multiselect fields.

**Arguments**:

- `title` _str, optional_ - A descriptive title for this data entry.
  Defaults to &quot;&quot;.
- `input_dict` _Optional[Dict[str, Any]], optional_ - Dictionary mapping field
  names to their values from interview questions. Values can be strings,
  floats, ints, or DADict objects. If None, an empty dict is used.
  Defaults to None.
- `tags` _Optional[List[str]], optional_ - List of string tags to associate
  with this data entry for categorization and filtering. Defaults to None.
  

**Notes**:

  - This function saves data to storage but does not return anything
  - Checkbox and multiselect fields (DADict) are automatically flattened
  so each option becomes a separate database column with a boolean value
  - Each call creates one database record per interview session
  - Data is stored with a random 32-character alphanumeric key
  

**Example**:

  &gt;&gt;&gt; survey_data = \{
  ...     &quot;age&quot;: 25,
  ...     &quot;income&quot;: 50000.0,
  ...     &quot;interests&quot;: my_checkbox_dict
  ... \}
  &gt;&gt;&gt; save_input_data(&quot;User Survey&quot;, survey_data, [&quot;survey&quot;, &quot;demographics&quot;])


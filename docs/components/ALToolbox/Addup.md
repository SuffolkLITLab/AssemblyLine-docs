# Table of Contents

* [ALToolbox.Addup](#ALToolbox.Addup)
  * [Addup](#ALToolbox.Addup.Addup)
    * [\_\_init\_\_](#ALToolbox.Addup.Addup.__init__)
    * [g](#ALToolbox.Addup.Addup.g)

---
sidebar_label: Addup
title: ALToolbox.Addup
---

<a id="ALToolbox.Addup.Addup"></a>

## Addup Objects

```python
class Addup()
```

Utility class for calculating sums of numeric fields across DAList objects.

This class provides functionality to sum specific numeric fields from all
items in a docassemble DAList, which is useful for financial calculations
and data aggregation in legal document automation.

<a id="ALToolbox.Addup.Addup.__init__"></a>

#### \_\_init\_\_(listName, varName)

```python
def __init__(listName, varName)
```

Initialize the Addup calculator and compute the sum immediately.

**Arguments**:

- `self` - The instance being initialized.
- `listName` - A DAList object containing items with numeric fields.
- `varName` _str_ - The name of the field to sum across all list items.

<a id="ALToolbox.Addup.Addup.g"></a>

#### g(listName, varName)

```python
def g(listName, varName) -> float
```

Calculate the sum of a specific numeric field across all items in a DAList.

Iterates through each item in the provided DAList, extracts the specified
field value, and adds all values together. Raises an error if the sum is 0,
which indicates the field was not found or contained no numeric values.

**Arguments**:

- `listName` - A DAList object containing items with numeric fields.
- `varName` _str_ - The name of the field to sum across all list items.
  

**Returns**:

- `float` - The sum of all values for the specified field.
  

**Raises**:

- `DAValidationError` - If the sum is 0, indicating the field was not found
  or contained no numeric values.
  

**Example**:

  &gt;&gt;&gt; addup = Addup(income_list, &quot;monthly_amount&quot;)
  &gt;&gt;&gt; # Returns sum of monthly_amount fields from all items in income_list


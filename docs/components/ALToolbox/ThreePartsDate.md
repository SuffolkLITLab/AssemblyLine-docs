# Table of Contents

* ALToolbox.ThreePartsDate
  * [check\_empty\_parts](#ALToolbox.ThreePartsDate.check_empty_parts)
  * [ThreePartsDate](#ALToolbox.ThreePartsDate.ThreePartsDate)
    * [validate](#ALToolbox.ThreePartsDate.ThreePartsDate.validate)
    * [transform](#ALToolbox.ThreePartsDate.ThreePartsDate.transform)
    * [default\_for](#ALToolbox.ThreePartsDate.ThreePartsDate.default_for)
  * [BirthDate](#ALToolbox.ThreePartsDate.BirthDate)
    * [validate](#ALToolbox.ThreePartsDate.BirthDate.validate)

---
sidebar_label: ThreePartsDate
title: ALToolbox.ThreePartsDate
---

#### check\_empty\_parts(item: str, default\_msg="{} is not a valid date") {#ALToolbox.ThreePartsDate.check\_empty\_parts}

```python
def check_empty_parts(item: str,
                      default_msg="{} is not a valid date") -> Optional[str]
```

Validate a date string in MM/DD/YYYY format and return specific error messages for missing parts.

Analyzes a date string separated by forward slashes to determine which parts
(month, day, year) are missing and returns a helpful error message indicating
what needs to be entered. Currently only handles US date format.

**Arguments**:

- `item` _str_ - The date string to validate, expected in MM/DD/YYYY format.
- `default_msg` _str, optional_ - Default error message template for invalid dates.
  Defaults to &quot;\{\} is not a valid date&quot;.
  

**Returns**:

  Error message if validation fails, None if date is valid.
  Returns None when the date is complete and valid, otherwise returns
  a localized error message indicating which parts need to be entered.
  

**Example**:

  &gt;&gt;&gt; check_empty_parts(&quot;12//2023&quot;)
  &quot;Enter a day&quot;
  &gt;&gt;&gt; check_empty_parts(&quot;//&quot;)
  &quot;Enter a month, a day, and a year&quot;
  &gt;&gt;&gt; check_empty_parts(&quot;12/25/2023&quot;)
  None

## ThreePartsDate Objects {#ALToolbox.ThreePartsDate.ThreePartsDate}

```python
class ThreePartsDate(CustomDataType)
```

#### validate(cls, item: str) {#ALToolbox.ThreePartsDate.ThreePartsDate.validate}

```python
@classmethod
def validate(cls, item: str) -> bool
```

Validate a date string in MM/DD/YYYY format.

**Arguments**:

- `item` _str_ - The date string to validate.
  

**Returns**:

- `bool` - True if valid or empty, raises DAValidationError if invalid.
  

**Raises**:

- `DAValidationError` - If the date string is invalid or cannot be parsed.

#### transform(cls, item) {#ALToolbox.ThreePartsDate.ThreePartsDate.transform}

```python
@classmethod
def transform(cls, item) -> Optional[datetime]
```

Transform a date string into a datetime object.

**Arguments**:

- `item` - The date string to transform.
  

**Returns**:

  datetime or None: The parsed datetime object, or None if empty.

#### default\_for(cls, item) {#ALToolbox.ThreePartsDate.ThreePartsDate.default\_for}

```python
@classmethod
def default_for(cls, item) -> Optional[str]
```

Convert a datetime object to MM/dd/yyyy format string.

**Arguments**:

- `item` - The datetime object to format.
  

**Returns**:

  str or None: The formatted date string, or None if empty.

## BirthDate Objects {#ALToolbox.ThreePartsDate.BirthDate}

```python
class BirthDate(ThreePartsDate)
```

#### validate(cls, item: str) {#ALToolbox.ThreePartsDate.BirthDate.validate}

```python
@classmethod
def validate(cls, item: str) -> bool
```

Validate a birth date string ensuring it&#x27;s a valid past date.

Validates that the input is a properly formatted date string in MM/DD/YYYY
format that represents a date on or before today and after the year 1000.
Empty or None values are considered valid.

**Arguments**:

- `item` _str_ - The birth date string to validate in MM/DD/YYYY format.
  

**Returns**:

  True if the date is valid, otherwise raises DAValidationError.
  

**Raises**:

- `DAValidationError` - If the date is invalid, improperly formatted,
  or in the future.


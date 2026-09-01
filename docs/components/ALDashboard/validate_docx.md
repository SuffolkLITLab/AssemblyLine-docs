# Table of Contents

* ALDashboard.validate\_docx
  * [CallAndDebugUndefined](#ALDashboard.validate_docx.CallAndDebugUndefined)
    * [\_\_getitem\_\_](#ALDashboard.validate_docx.CallAndDebugUndefined.__getitem__)
  * [get\_jinja\_errors](#ALDashboard.validate_docx.get_jinja_errors)

---
sidebar_label: validate_docx
title: ALDashboard.validate_docx
---

## CallAndDebugUndefined Objects {#ALDashboard.validate\_docx.CallAndDebugUndefined}

```python
class CallAndDebugUndefined(DebugUndefined)
```

Handles Jinja2 undefined errors by printing the name of the undefined variable.
Extended to handle callable methods.

#### \_\_getitem\_\_ {#ALDashboard.validate\_docx.CallAndDebugUndefined.\_\_getitem\_\_}

type: ignore

#### get\_jinja\_errors(the\_file: str) {#ALDashboard.validate\_docx.get\_jinja\_errors}

```python
def get_jinja_errors(the_file: str) -> Optional[str]
```

Just try rendering the DOCX file as a Jinja2 template and catch any errors.
Returns a string with the errors, if any.


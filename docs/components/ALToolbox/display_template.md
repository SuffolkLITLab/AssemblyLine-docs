# Table of Contents

* ALToolbox.display\_template
  * [display\_template](#ALToolbox.display_template.display_template)

---
sidebar_label: display_template
title: ALToolbox.display_template
---

#### display\_template(template, scrollable=True, collapse=False, copy=False, classname="bg-light", class\_name=None) {#ALToolbox.display\_template.display\_template}

```python
def display_template(template,
                     scrollable=True,
                     collapse=False,
                     copy=False,
                     classname="bg-light",
                     class_name=None) -> str
```

Display a template with optional scrolling, collapsing, and copy functionality.

Renders a template in a styled container with various display options including
scrollable content, collapsible sections, and copy-to-clipboard functionality.
Supports both the current `classname` parameter and the deprecated `class_name`
parameter for backwards compatibility.

**Arguments**:

- `template` - A docassemble template object with content to display.
- `scrollable` _bool, optional_ - Whether the content should be scrollable.
  Defaults to True.
- `collapse` _bool, optional_ - Whether the content should be collapsible.
  Defaults to False.
- `copy` _bool, optional_ - Whether to include a copy-to-clipboard button.
  Defaults to False.
- `classname` _str, optional_ - CSS class name for styling the container.
  Defaults to &quot;bg-light&quot;.
- `class_name` _str, optional_ - Deprecated parameter for CSS class name.
  Defaults to None.
  

**Returns**:

  HTML string containing the rendered template with the specified
  display options.
  

**Example**:

  &gt;&gt;&gt; display_template(my_template, scrollable=True, collapse=True)
  &#x27;&lt;div id=&quot;...&quot; class=&quot;al_display_template&quot;&gt;...&lt;/div&gt;&#x27;


# Table of Contents

* ALToolbox.copy\_button
  * [copy\_button\_html](#ALToolbox.copy_button.copy_button_html)

---
sidebar_label: copy_button
title: ALToolbox.copy_button
---

#### copy\_button\_html(text\_to\_copy: str, text\_before: str = "", label: str = "Copy", tooltip\_inert\_text: str = "Copy to clipboard", tooltip\_copied\_text: str = "Copied!", copy\_template\_block: bool = False, scroll\_class: str = "", style\_class: str = "", adjust\_height: str = "") {#ALToolbox.copy\_button.copy\_button\_html}

```python
def copy_button_html(text_to_copy: str,
                     text_before: str = "",
                     label: str = "Copy",
                     tooltip_inert_text: str = "Copy to clipboard",
                     tooltip_copied_text: str = "Copied!",
                     copy_template_block: bool = False,
                     scroll_class: str = "",
                     style_class: str = "",
                     adjust_height: str = "") -> str
```

Return the HTML for a button that will let a user copy the given text.

Creates a copy-to-clipboard button with customizable styling and tooltip text.
The button can be configured to display as a simple input field or as a styled
template block suitable for displaying longer content.

To use, include `docassemble.ALToolbox:copy_button.yml` in your DA interview.

**Arguments**:

- `text_to_copy` _str_ - Text you want the user to be able to copy to clipboard.
- `text_before` _str, optional_ - The prompt that will appear to the left of the
  HTML input. Defaults to &quot;&quot;.
- `label` _str, optional_ - The label text displayed on the copy button.
  Defaults to &quot;Copy&quot;.
- `tooltip_inert_text` _str, optional_ - Tooltip text shown when hovering over
  the button before it&#x27;s clicked. Defaults to &quot;Copy to clipboard&quot;.
- `tooltip_copied_text` _str, optional_ - Tooltip text shown when hovering over
  the button after the text is placed on the clipboard. Defaults to &quot;Copied!&quot;.
- `copy_template_block` _bool, optional_ - If True, displays the content in a
  textarea with template block styling. If False, uses a simple input field.
  Defaults to False.
- `scroll_class` _str, optional_ - CSS class for scroll behavior when using
  template block mode. Defaults to &quot;&quot;.
- `style_class` _str, optional_ - Additional CSS classes for styling the container.
  Defaults to &quot;&quot;.
- `adjust_height` _str, optional_ - HTML attributes for height adjustment behavior.
  Defaults to &quot;&quot;.
  

**Returns**:

- `str` - Complete HTML string containing the copy button and associated elements.
  

**Example**:

  &gt;&gt;&gt; copy_button_html(&quot;Hello World&quot;, text_before=&quot;Message:&quot;, label=&quot;Copy Message&quot;)
  &#x27;&lt;div class=&quot;al_copy&quot;&gt;...&lt;button class=&quot;btn btn-secondary al_copy_button&quot;&gt;...&lt;/div&gt;&#x27;


# Table of Contents

* ALToolbox.misc
  * [thousands](#ALToolbox.misc.thousands)
  * [tel](#ALToolbox.misc.tel)
  * [fa\_icon](#ALToolbox.misc.fa_icon)
  * [space](#ALToolbox.misc.space)
  * [yes\_no\_unknown](#ALToolbox.misc.yes_no_unknown)
  * [number\_to\_letter](#ALToolbox.misc.number_to_letter)
  * [collapse\_template](#ALToolbox.misc.collapse_template)
  * [tabbed\_templates\_html](#ALToolbox.misc.tabbed_templates_html)
  * [review\_widget](#ALToolbox.misc.review_widget)
  * [sum\_if\_defined](#ALToolbox.misc.sum_if_defined)
  * [add\_records](#ALToolbox.misc.add_records)
  * [output\_checkbox](#ALToolbox.misc.output_checkbox)
  * [nice\_county\_name](#ALToolbox.misc.nice_county_name)
  * [button\_array](#ALToolbox.misc.button_array)
  * [none\_to\_empty](#ALToolbox.misc.none_to_empty)
  * [option\_or\_other](#ALToolbox.misc.option_or_other)
  * [true\_values\_with\_other](#ALToolbox.misc.true_values_with_other)
  * [include\_a\_year](#ALToolbox.misc.include_a_year)
  * [is\_leap\_year](#ALToolbox.misc.is_leap_year)
  * [age\_in\_years](#ALToolbox.misc.age_in_years)
  * [format\_date\_if\_defined](#ALToolbox.misc.format_date_if_defined)

---
sidebar_label: misc
title: ALToolbox.misc
---

#### thousands(num: Union[float, str, Decimal], show\_decimals=False) {#ALToolbox.misc.thousands}

```python
def thousands(num: Union[float, str, Decimal], show_decimals=False) -> str
```

Return a whole number formatted with thousands separator.

Optionally, format with 2 decimal points (for a PDF form with the
currency symbol already present in the form). If `show_decimals` is False,
will call `int(num)`, truncating the decimals instead of rounding to the
closest int.

**Arguments**:

- `num` _Union[float, str, Decimal]_ - The numeric value to format.
- `show_decimals` _bool, optional_ - Whether to display 2 decimal places.
  Defaults to False.
  

**Returns**:

  The formatted number string with thousands separators, optionally
  with 2 decimal places.
  

**Example**:

  &gt;&gt;&gt; thousands(1234.56)
  &#x27;1,234&#x27;
  &gt;&gt;&gt; thousands(1234.56, show_decimals=True)
  &#x27;1,234.56&#x27;

#### tel(phone\_number) {#ALToolbox.misc.tel}

```python
def tel(phone_number) -> str
```

Format a phone number so you can click on it to open in your phone dialer.

Creates an HTML anchor tag with tel: protocol that allows users to click
and dial the number on mobile devices or applications that support tel links.

**Arguments**:

- `phone_number` - The phone number to format. Can be string or numeric type.
  

**Returns**:

- `str` - HTML anchor tag with tel: link containing the phone number.
  

**Example**:

  &gt;&gt;&gt; tel(&quot;555-123-4567&quot;)
  &#x27;&lt;a href=&quot;tel:555-123-4567&quot;&gt;555-123-4567&lt;/a&gt;&#x27;

#### fa\_icon(icon: str, color: Optional[str] = "primary", color\_css: Optional[str] = None, size: Optional[str] = "sm", fa\_class: str = "fa-solid", aria\_hidden: bool = True) {#ALToolbox.misc.fa\_icon}

```python
def fa_icon(icon: str,
            color: Optional[str] = "primary",
            color_css: Optional[str] = None,
            size: Optional[str] = "sm",
            fa_class: str = "fa-solid",
            aria_hidden: bool = True) -> str
```

Display a fontawesome icon inline.

docassemble allows you to display an icon from [fontawesome](https://fontawesome.com),
but it does not provide control over the size or color of the icon. This function gives
you more control over the icon that is inserted.

**Arguments**:

- `icon` - a string representing a fontawesome icon. The icon needs to be in the
  [free library](https://fontawesome.com/search?o=r&amp;m=free).
- `color` - can be any [Bootstrap color variable](https://getbootstrap.com/docs/5.0/utilities/colors/).
  For example: `primary`, `secondary`, `warning`
- `color_css` - allows you to use a CSS code to represent the color, e.g., `blue`, or ``fff`` for black
- `size` - used to control the [fontawesome size](https://fontawesome.com/v6.0/docs/web/style/size)
  (without the `fa-` prefix). Valid values include `2xs`, `xs`, the default of `sm`,
  `md`, `lg`, `xl`, `2x1`, and the python `None`, which defaults to `md`.
- `fa_class` - let&#x27;s you specify the fontawesome class, needed for any icon that isn&#x27;t
  the default class of `fa-solid`, like `fa-brands`, or `fa-regular` and `fa-light`.
- `aria_hidden` - if True, adds `aria-hidden="true"` to the icon, which is the default
  

**Returns**:

  HTML for a font-awesome icon of the specified size and color.

#### space(var\_name: str, prefix=" ", suffix="") {#ALToolbox.misc.space}

```python
def space(var_name: str, prefix=" ", suffix="") -> str
```

If the value as a string is defined, return it prefixed/suffixed.

Defaults to prefix of a space. Helps build a sentence with less cruft.
Equivalent to SPACE function in HotDocs. Only returns the formatted value
if the variable name is valid and the variable is defined and has a value.

**Arguments**:

- `var_name` _str_ - The name of the variable to check and format.
- `prefix` _str, optional_ - String to prepend to the value. Defaults to &quot; &quot;.
- `suffix` _str, optional_ - String to append to the value. Defaults to &quot;&quot;.
  

**Returns**:

  The variable value with prefix and suffix if variable is defined
  and has a value, otherwise an empty string.
  

**Example**:

  &gt;&gt;&gt; space(&quot;user_middle_name&quot;, prefix=&quot; &quot;, suffix=&quot;&quot;)
  &quot; John&quot;  # if user_middle_name is defined as &quot;John&quot;
  &gt;&gt;&gt; space(&quot;undefined_var&quot;)
  &quot;&quot;  # if variable is not defined

#### yes\_no\_unknown(var\_name: str, condition: Optional[bool], unknown="Unknown", placeholder=0) {#ALToolbox.misc.yes\_no\_unknown}

```python
def yes_no_unknown(var_name: str,
                   condition: Optional[bool],
                   unknown="Unknown",
                   placeholder=0) -> Any
```

Return &#x27;unknown&#x27; if the value is None rather than False.

Helper for PDF filling with yesnomaybe fields. Distinguishes between
False (explicitly no) and None (unknown/not answered).

**Arguments**:

- `var_name` _str_ - The name of the variable to return if condition is True.
- `condition` _Optional[bool]_ - The condition to evaluate. True returns the
  variable value, False returns placeholder, None returns unknown.
- `unknown` _str, optional_ - Value to return when condition is None.
  Defaults to &quot;Unknown&quot;.
- `placeholder` - Value to return when condition is False. Defaults to 0.
  

**Returns**:

  The value of var_name if condition is True, the unknown string if
  condition is None, or the placeholder value if condition is False.
  

**Example**:

  &gt;&gt;&gt; yes_no_unknown(&quot;user_answer&quot;, True, &quot;Unknown&quot;, 0)
  # Returns value of user_answer variable
  &gt;&gt;&gt; yes_no_unknown(&quot;user_answer&quot;, None, &quot;Unknown&quot;, 0)
  &quot;Unknown&quot;
  &gt;&gt;&gt; yes_no_unknown(&quot;user_answer&quot;, False, &quot;Unknown&quot;, 0)
  0

#### number\_to\_letter(n: Optional[int]) {#ALToolbox.misc.number\_to\_letter}

```python
def number_to_letter(n: Optional[int]) -> str
```

Returns a capital letter representing ordinal position.

E.g., 1=A, 2=B, etc. Appends letters once you reach 26 in a way compatible
with Excel/Google Sheets column naming conventions. 27=AA, 28=AB...

**Arguments**:

- `n` _Optional[int]_ - The number to convert to letters. If None, treated as 0.
  

**Returns**:

- `str` - The letter representation of the number using Excel-style column naming.
  

**Example**:

  &gt;&gt;&gt; number_to_letter(1)
  &#x27;A&#x27;
  &gt;&gt;&gt; number_to_letter(26)
  &#x27;Z&#x27;
  &gt;&gt;&gt; number_to_letter(27)
  &#x27;AA&#x27;

#### collapse\_template(template: DALazyTemplate, classname: str | None = None, closed\_icon: str = "caret-right", open\_icon: str = "caret-down", collapsed: bool = True) {#ALToolbox.misc.collapse\_template}

```python
def collapse_template(template: DALazyTemplate,
                      classname: str | None = None,
                      closed_icon: str = "caret-right",
                      open_icon: str = "caret-down",
                      collapsed: bool = True) -> str
```

Insert HTML for a Bootstrap &quot;collapse&quot; div.

Creates a collapsible section with a clickable header that shows/hides content.
Optionally, you can specify custom icons to override the defaults.

The default icons are &quot;right caret&quot; which displays when the text is collapsed
(`closed_icon`) and &quot;down caret&quot; which displays when the text is open (`open_icon`).

**Arguments**:

- `template` _DALazyTemplate_ - The docassemble template to render in the collapsible section.
- `classname` _str | None, optional_ - CSS class name for styling the content container.
  Defaults to None (uses &quot;bg-light&quot;).
- `closed_icon` _str, optional_ - FontAwesome icon name for collapsed state.
  Defaults to &quot;caret-right&quot;.
- `open_icon` _str, optional_ - FontAwesome icon name for expanded state.
  Defaults to &quot;caret-down&quot;.
- `collapsed` _bool, optional_ - Whether the section should start collapsed.
  Defaults to True.
  

**Returns**:

  Complete HTML string for the Bootstrap collapse component, or empty
  string if template has no content.
  

**Example**:

  &gt;&gt;&gt; collapse_template(my_template, classname=&quot;bg-primary&quot;, collapsed=False)
  &#x27;&lt;div id=&quot;...&quot; class=&quot;al_collapse_template&quot;&gt;...&lt;/div&gt;&#x27;

#### tabbed\_templates\_html(tab\_group\_name: str, \*pargs) {#ALToolbox.misc.tabbed\_templates\_html}

```python
def tabbed_templates_html(tab_group_name: str, *pargs) -> str
```

Create Bootstrap v 4.5 tabs with template subjects as tab labels.

Provided a list of templates, creates a tabbed interface where each template&#x27;s
subject becomes the tab label and the content becomes the tab panel content.

**Arguments**:

- `tab_group_name` _str_ - The base name for the tab group, used to generate
  unique IDs for the tabs.
- `*pargs` - Variable number of template objects that have subject and content_as_html
  methods.
  

**Returns**:

  Complete HTML string containing Bootstrap tabs navigation and content
  panels.
  

**Example**:

  &gt;&gt;&gt; tabbed_templates_html(&quot;my_tabs&quot;, template1, template2, template3)
  &#x27;&lt;ul class=&quot;nav nav-tabs&quot; id=&quot;my_tabs&quot;&gt;...&lt;/ul&gt;&lt;div class=&quot;tab-content&quot;&gt;...&lt;/div&gt;&#x27;

#### review\_widget(\*, up\_action: str, down\_action: str, review\_action: Optional[str] = None, thumbs\_display: str = "Did we help you?", review\_display: str = "Thank you for your feedback. Let us know what we could do better", submit\_review\_button: str = "Add your review", post\_review\_display: str = "Thank you for your review!") {#ALToolbox.misc.review\_widget}

```python
def review_widget(
        *,
        up_action: str,
        down_action: str,
        review_action: Optional[str] = None,
        thumbs_display: str = "Did we help you?",
        review_display:
    str = "Thank you for your feedback. Let us know what we could do better",
        submit_review_button: str = "Add your review",
        post_review_display: str = "Thank you for your review!") -> str
```

A widget that allows people to give a quick review (thumbs up and down, with an optional text
component) in the middle of an interview without triggering a page reload.

If `review_action` is provided, once you press either of the thumbs, a text input screen with
a submit button appears, and once the text review is submitted (or after the thumbs, if no
`review_action` was provided), a final &quot;thank you&quot; message is displayed.

**Arguments**:

- `up_action` - the variable name of an event to be executed on the server if the
  thumbs up is pressed
- `down_action` - the variable name of an event to be executed on the server if the
  thumbs down is pressed
- `review_action` - the variable name of an event to be execute on the
  server when someone submits their text review
- `thumbs_display` - text displayed to user describing the thumbs
- `review_display` - text displayed to user describing the text input
- `submit_review_button` - text on the button to submit their text review
- `post_review_display` - text displayed to user after review is submitted

**Returns**:

  the HTML string of the widget

#### sum\_if\_defined(\*pargs) {#ALToolbox.misc.sum\_if\_defined}

```python
def sum_if_defined(*pargs) -> Union[int, float, Decimal]
```

Add up the value of variables that are not in a list.

Lets you sum the values of multiple variables, but only includes variables
that are defined. Undefined variables are skipped rather than causing errors.

**Arguments**:

- `*pargs` - Variable number of variable names (strings) to sum up.
  

**Returns**:

  The sum of all defined variable values. Variables that are not defined
  are treated as 0 (skipped).
  

**Example**:

  &gt;&gt;&gt; sum_if_defined(&quot;income1&quot;, &quot;income2&quot;, &quot;income3&quot;)
  # Returns sum of defined income variables, skipping any undefined ones

#### add\_records(obj, labels) {#ALToolbox.misc.add\_records}

```python
def add_records(obj, labels) -> Any
```

List demo interviews in the current package to be run from the landing page.

Populates a DAList object with records containing interview information
including name, description, and reference for creating a demo landing page.

**Arguments**:

- `obj` - A DAList object to populate with interview records.
- `labels` _dict_ - Dictionary where keys are interview names and values are
  tuples/lists containing [description, reference].
  

**Returns**:

  The populated obj (DAList) with interview records added.
  

**Example**:

  &gt;&gt;&gt; interviews = \{&quot;intake&quot;: [&quot;Intake Interview&quot;, &quot;intake.yml&quot;]\}
  &gt;&gt;&gt; add_records(my_list, interviews)
  # my_list[0].name = &quot;intake&quot;, description = &quot;Intake Interview&quot;, etc.

#### output\_checkbox(value\_to\_check: bool, checked\_value: str = "[X]", unchecked\_value: str = "[  ]") {#ALToolbox.misc.output\_checkbox}

```python
def output_checkbox(value_to_check: bool,
                    checked_value: str = "[X]",
                    unchecked_value: str = "[  ]") -> str
```

Generate a conditional checkbox for docx templates.

Returns different values based on whether a boolean condition is true or false,
useful for creating checkboxes in document templates.

**Arguments**:

- `value_to_check` _bool_ - The boolean value to evaluate.
- `checked_value` _str, optional_ - Value to return when condition is True.
  Defaults to &quot;[X]&quot;. Can be any string or even a DAFile or DAStaticFile
  with the image of a checkbox.
- `unchecked_value` _str, optional_ - Value to return when condition is False.
  Defaults to &quot;[  ]&quot;. Opposite meaning of `checked_value`.
  

**Returns**:

  The checked_value if value_to_check is True, otherwise unchecked_value.
  

**Example**:

  &gt;&gt;&gt; output_checkbox(True)
  &#x27;[X]&#x27;
  &gt;&gt;&gt; output_checkbox(False, checked_value=&quot;YES&quot;, unchecked_value=&quot;NO&quot;)
  &#x27;NO&#x27;

#### nice\_county\_name(address: Address) {#ALToolbox.misc.nice\_county\_name}

```python
def nice_county_name(address: Address) -> str
```

Clean up county name by removing &quot; County&quot; suffix if present.

If the county name contains the word &quot;County&quot;, which Google Address
Autocomplete does by default, remove it to get a cleaner display name.

**Arguments**:

- `address` _Address_ - A docassemble Address object that may have a county attribute.
  

**Returns**:

  The county name with &quot; County&quot; suffix removed, or empty string if
  the address has no county attribute.
  

**Example**:

  &gt;&gt;&gt; nice_county_name(address_with_county)
  &#x27;Suffolk&#x27;  # if address.county was &quot;Suffolk County&quot;
  &gt;&gt;&gt; nice_county_name(address_without_county)
  &#x27;&#x27;

#### button\_array(buttons: List[ButtonDict], custom\_container\_class="", custom\_link\_class="") {#ALToolbox.misc.button\_array}

```python
def button_array(buttons: List[ButtonDict],
                 custom_container_class="",
                 custom_link_class="") -> str
```

Create a grid of da-buttons from a dictionary of links and icons

This uses the same CSS classes to mimic the look and feel of docassemble&#x27;s `buttons` field type, but
doesn&#x27;t have the limits of that particular input method. This is meant to appear
on any page of an interview in the `subquestion` area.

Optionally, you can limit access to paricular buttons by specifying a privilege or a list
of privileges.

**Arguments**:

- `buttons` _List[ButtonDict]_ - A list of ButtonDicts (or plain dictionaries)
  with the following keys:
  - `name`: the text to display on the button
  - `image`: the name of a fontawesome icon to display on the button
  - `url`: the name of the page to link to
  - `privilege`: optional, the name of a docassemble privilege that the
  user must have to see the button. Can be a list or a single string.
- `custom_container_class` _str, optional_ - Additional CSS classes to add to
  the container div. Defaults to &quot;&quot;.
- `custom_link_class` _str, optional_ - Additional CSS classes to add to each
  link. Defaults to &quot;&quot;.
  

**Returns**:

- `str` - HTML for a grid of buttons that mimics docassemble&#x27;s button field type.

#### none\_to\_empty(val: Any) {#ALToolbox.misc.none\_to\_empty}

```python
def none_to_empty(val: Any) -> Any
```

If the value is None or &quot;None&quot;, return a DAEmpty value. Otherwise return the value.

This is useful for filling in a template and to prevent the word None from appearing in the output. For example,
when handling a radio button that is not required and left unanswered.

A DAEmpty value appears as an empty string in the output. You can also safely transform it or use any method on it
without raising an error.

**Arguments**:

- `val` - the value to check

**Returns**:

  a DAEmpty if the value is None, otherwise the value

#### option\_or\_other(variable\_name: str, other\_variable\_name: Optional[str] = None) {#ALToolbox.misc.option\_or\_other}

```python
def option_or_other(variable_name: str,
                    other_variable_name: Optional[str] = None) -> str
```

If the variable is set to &#x27;Other&#x27;, return the value of the &#x27;other&#x27; variable. Otherwise return the value of the variable.

This is useful for filling in a template and to prevent the word &#x27;Other&#x27; from appearing in the output.

**Arguments**:

- `variable_name` - the name of the variable to check
- `other_variable_name` - the name of the variable to return if the value of the first variable is &#x27;Other&#x27;

**Returns**:

  the value of the variable if it is not &#x27;Other&#x27;, otherwise the value of the other variable

#### true\_values\_with\_other(variable\_name: str, other\_variable\_name: Optional[str] = None) {#ALToolbox.misc.true\_values\_with\_other}

```python
def true_values_with_other(
        variable_name: str,
        other_variable_name: Optional[str] = None) -> List[str]
```

Return a list of values that are True, with the value of the &#x27;other&#x27; variable appended to the end of the list.

This is useful for filling in a template and to prevent the word &#x27;Other&#x27; from appearing in the output.

**Arguments**:

- `variable_name` _str_ - The dictionary of variables to check.
- `other_variable_name` _Optional[str], optional_ - The name of the variable
  (as a string) to return if the value of the first variable is &#x27;Other&#x27;.
  Defaults to None (uses variable_name + &quot;_other&quot;).
  

**Returns**:

  A list of values that are True, with the value of the &#x27;other&#x27;
  variable appended to the end of the list if &#x27;other&#x27;/&#x27;Other&#x27; was selected.

#### include\_a\_year(text: str, field: Optional[str] = None) {#ALToolbox.misc.include\_a\_year}

```python
def include_a_year(text: str, field: Optional[str] = None) -> bool
```

Validates whether the input text contains at least one 4-digit year.

Validates whether the input text contains at least one 4-digit sequence
that occurs within a range of ~ 200 years (1800-2199), indicating a valid
&quot;year&quot; for an event that should be reported on most court forms, like a
birthdate or a moving date.

**Arguments**:

- `text` _str_ - The text to search for a year pattern.
- `field` _Optional[str], optional_ - The field name to use in validation
  error messages. Defaults to None.
  

**Returns**:

- `bool` - True if a valid year is found, otherwise raises a DAValidationError.
  

**Raises**:

- `DAValidationError` - If no valid year pattern is found in the text.
  

**Example**:

  &gt;&gt;&gt; include_a_year(&quot;Born in 1985&quot;)
  True
  &gt;&gt;&gt; include_a_year(&quot;Born long ago&quot;)  # raises DAValidationError

#### is\_leap\_year(year: int) {#ALToolbox.misc.is\_leap\_year}

```python
def is_leap_year(year: int) -> bool
```

Helper function for `age_in_years` to determine if a year is a leap year.

**Arguments**:

- `year` - The year to check.

**Returns**:

  True if the year is a leap year, False otherwise.

#### age\_in\_years(the\_date: Union[str, DADateTime]) {#ALToolbox.misc.age\_in\_years}

```python
def age_in_years(the_date: Union[str, DADateTime]) -> int
```

Calculate the age in years from a date (treated like a date of birth).

**Arguments**:

- `the_date` - A string or DADateTime object representing the date of birth.

**Returns**:

  The age in years as an integer.

#### format\_date\_if\_defined(date\_object\_name: str, \*pargs, default: str = "", \*\*kwargs) {#ALToolbox.misc.format\_date\_if\_defined}

```python
def format_date_if_defined(date_object_name: str,
                           *pargs,
                           default: str = "",
                           **kwargs) -> str
```

Format a date string if it is defined, otherwise return an empty string.

Passes all additional arguments to the `format_date` function.

**Arguments**:

- `date_object_name` - The date string to format.
- `*pargs` - Additional positional arguments to pass to `format_date`.
- `default` - A default string to return if `date_object_name` is not defined.
- `**kwargs` - Additional keyword arguments to pass to `format_date`. E.g., format=&quot;yyyy-MM-dd&quot;
  

**Returns**:

  A formatted date string if `date_object_name` is defined, otherwise an empty string.
  

**Example**:

  
  &gt;&gt;&gt; format_date_if_defined(&quot;users[0].birthdate&quot;, format=&#x27;yyyy-MM-dd&#x27;)
  
  Returns a formatted date string if &quot;users[0].birthdate&quot; is defined, otherwise returns an empty string.
  
  &gt;&gt;&gt; format_date_if_defined(&quot;users[0].birthdate&quot;, default=&quot;No date provided&quot;, format=&#x27;yyyy-MM-dd &#x27;)
  
  Returns a formatted date string followed by one space if &quot;users[0].birthdate&quot; is defined, otherwise returns &quot;No date provided&quot;. (Note space is added to the format=&quot;...&quot; parameter)


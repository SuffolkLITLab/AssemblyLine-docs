---
id: accessibility
title: Making docassemble interviews accessible
sidebar_label: Accessibility
slug: accessibility
---

**Web accessibility** means designing websites and tools (like docassemble interviews) so that people with disabilities can use them. Web accessibility also benefits everyone by making websites more usable across a range of situations. 

Making docassemble interviews accessible involves structuring interviews for people who use keyboard controls and screen readers, which [docassemble handles by default](https://docassemble.org/docs/accessibility.html). To the extent the AssemblyLine software adds features (such as [`AL` object classes](../components/AssemblyLine/reserved_keywords#full-list-of-reserved-variable-names)), they are also built to be accessible by default.

Interview builders must address accessibility, too, so the Document Assembly Line has powerful accessibility tools, a [style guide for writing questions](../style_guide/question_style_overview.md), and [user interface guidelines](./yaml_interface.md). These address readability and UI choices that improve interview accessibility overall. (Translation can also be considered part of web accessibility, and AssemblyLine also adds [helpful translation tools](../components/AssemblyLine/translation.md).)

## AssemblyLine accessibility tools


The AssemblyLine software includes a [code linter](https://en.wikipedia.org/wiki/Lint_(software)) used in the [ALDashboard](../components/ALDashboard/overview) and [ALWeaver](../authoring/weaver/weaver_overview) packages. It can check interviews against the Document Assembly Line style guide, interface guidelines, and [WCAG accessibility guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/). (WCAG accessibility checks must be run manually from the Dashboard **Interview style check (lint)** link.)

<p><img src="/assets/images/aldashboard-interview-linter-icon-637e617e05301566f585ec7978cb46b8.png" style={{borderRadius: 6 + 'px', display: 'block', height: 128 + 'px', width: 128 + 'px', marginRight: 'auto', marginLeft: 'auto'}} alt='ALDashboard icon for the code linter. The text reads "Interview style check (lint)"' /></p>

Accessibility checks include:

- Web Content Accessibility Guidelines (WCAG) clear failures
- DOCX and PDF template accessibility
- DAL style guide issues
- Low contrast
- Skipped [heading levels](#heading-levels)
- Empty links
- Non-descriptive link text
- Missing [alt text](#alt-text)
- Missing field labels
- [Combobox](#avoid-comboboxes) use
- Translateability

## General tips for improving interview accessibility

### Use strongly contrasting colors

When [customizing the look and feel of your interviews](../components/ALThemeTemplate/overview), make sure the colors you choose for text and background have high contrast. This is important to both low-vision and sighted users. WCAG 2 defines the **minimum** color contrast between an element and it's background as 4.5:1. For larger text like headings, the minimum is 3:1.

Check for proper contrast with these tools:

* [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/)
* [Accessible Web's contrast checker](https://accessibleweb.com/color-contrast-checker/)

### Use alt-text with images {#alt-text}

To describe images, screen readers read out descriptions called alternative text, or alt-text. Without alt-text, people using a screen reader won't get any of the benefits of the graphic. The W3 WAI group has [a good decision tree on how to write alt-text](https://www.w3.org/WAI/tutorials/images/decision-tree/).

To describe an image in docassemble, [set the `alt_text` attribute of a DAFile](https://docassemble.org/docs/objects.html#DAFile), or use [the `set_alt_text()` function](https://docassemble.org/docs/objects.html#DAFile.set_alt_text). If you are writing HTML directly, add an `alt` property to all `img` tags:

```html
<img src="my_image.png" alt="A drawing of a flowchart: the question is 'do you have any children?', the option 'yes' leads to 'scenario 1', and the option 'no' leads to 'scenario 2'."/>
```

:::tip
Don't forget to add alt-text to your organization's logo. It can be a simple description like "Organization A's logo", but it should be present.
:::

### Don't skip heading levels {#heading-levels}

Headings provide semantic structure to web pages and help screen readers navigate. When using headings, increment one level at a time. Don't skip from `h2` to `h4`.

Screen readers have special features that let users navigate between different headings in order to navigate quickly, and skipped heading levels can disorient users.

<div class="row">
  <div class="col">
    Like this:

    ```markdown
    <!-- Markdown -->
    ## Heading 2
    ### Heading 3
    ### Heading 3
    ## Heading 2
    ```

    ```html
    <!-- HTML -->
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h3>Heading 3</h3>
    <h2>Heading 2</h2>
    ```
  </div>
  <div class="col">
    **Not** like this:

    ```markdown
    <!-- Markdown -->
    ## Heading 2
    #### Heading 4
    #### Heading 4
    ## Heading 2
    ```

    ```html
    <!-- HTML -->
    <h2>Heading 2</h2>
    <h4>Heading 4</h4>
    <h4>Heading 4</h4>
    <h2>Heading 2</h2>
    ```
  </div>
</div>

#### Don't use `h1`

There should only be one `h1` heading on a page. In docassemble, that will be the `question` attribute. Don't use a single `#` Markdown heading or an `<h1>` HTML tag in a subquestion or note.

#### How to change heading sizes

You might notice that the question heading in docassemble looks smaller than headings in the subquestion. This is because docassemble manually styles the question to look like an `h3` heading even though it is really an `h1` heading.

If you want to change the size of a heading, don't skip heading levels! Use HTML classes to style them as a smaller (or larger) heading level:

```yaml
subquestion: |
  <h2 class="h4">Heading 2 (shown the same size as heading 4)</h2>
  ...

  <h3 class="h5">Heading 3 (shown the same size as heading 5)</h3>
  ...
```

### Avoid comboboxes {#avoid-comboboxes}

[Comboboxes](https://docassemble.org/docs/fields.html#field%20with%20combobox) allow the user to choose a selection from a list or enter their own "other" value. As implemented in docassemble, comboboxes have [several usability problems](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/issues/548), especially for screen readers, so we recommend you don't use them. Instead, split the combobox into multiple fields or use a single text field with validation.

**Two fields.** Split the combobox into:

1. A dropdown with an additional "other" option
2. A text input hidden with `show if` when the dropdown is not "other"

This works best if the list of options is short and the user would expect to find an "other" option on the list.

```yaml
fields:
  - What is your role?: role_name
    choices:
      - employee
      - manager
      - other
  - Enter your role: role_other
    show if:
      variable: role_name
      is: other
```

**Three fields.** Split the combobox into:

1. A dropdown with options (e.g., a list of courts inside the user's state)
2. A checkbox that indicates the list doesn't apply (e.g., "My court is not in Massachusetts")
3. A fill-in-the-blank text input hidden with `show if`

This works better if the list of options is longer, and it makes the "other" option much  more prominent.

```yaml
fields:
  - What is your court name?: court_name
    required: False
    code: |
      list_of_courts
  - My court is outside of Massachusetts: outside_ma
    datatype: yesno
  - Enter your court's name: court_outside_ma_name
    show if: outside_ma
```

**Text field with validation.** Use a single text field with input validation by the interview. To help the user fill in the field correctly, include some valid values as examples on the page. Ensure validation errors are descriptive.

## Accessibility testing tools {#accessibility-tools}

Test your interview with assistive technology as much as you can! The best way to improve your interviews for assistive technology users is by actually experiencing it yourself.

Here are some common tools to help you test and validate the accessibility of your interviews:

### Screen readers

Screen readers read website copy aloud for users who are blind, have low vision, or have other challenges reading text. Each screen reader behaves differently, so test with as many as you can.

**But** don't rewrite your copy based on how it sounds in a screen reader. Screen readers may pronounce some words and acronyms differently than you might expect. This is fine; screen reader users are used to these differences. For more discussion of this, see [Adrian Roselli's post about this](https://adrianroselli.com/2023/04/dont-override-screen-reader-pronunciation.html).

:::tip
docassemble includes a [built-in screen reader based on VoiceRSS](https://docassemble.org/docs/config.html#voicerss).
:::

Free screen readers:
- **[NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)** is a free, open-source screen reader for Windows that is widely used and regularly updated
- **[VoiceOver](https://www.apple.com/accessibility/vision/)** is built into Apple devices. Activate with Command (⌘) + F5 on Mac.
- **[TalkBack](https://support.google.com/accessibility/android/answer/6283677)** is Android's built-in screen reader
- **[Orca](https://help.gnome.org/users/orca/stable/)** is an open-source screen reader for Linux systems

Commercial screen readers:
- **[JAWS (Job Access With Speech)](https://www.freedomscientific.com/products/software/jaws/)** is the most popular screen reader for Windows with advanced features

### Browser accessibility checkers

These tools can automatically scan your interview pages for accessibility issues:

- **[WAVE Web Accessibility Evaluator](https://wave.webaim.org/extension/)** is a browser extension that highlights accessibility issues directly on the page
- **[Axe DevTools](https://www.deque.com/axe/devtools/)** is a browser extension for Chrome, Firefox, and Edge that integrates with developer tools
- **[Lighthouse](https://developer.chrome.com/docs/lighthouse/)** is built into Chrome DevTools and includes accessibility auditing alongside performance testing
- **[Accessibility Insights](https://accessibilityinsights.io/)** is Microsoft's accessibility testing tool for web and Windows

### Manual testing tools

- **[Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)** is a desktop application for testing color contrast ratios
- **[Accessibility bookmarklets](https://accessibility-bookmarklets.org/)** is a collection of browser bookmarklets for quick accessibility checks

### Mobile accessibility testing

- **[VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios)** is iOS's built-in screen reader
- **[TalkBack](https://support.google.com/accessibility/android/answer/6283677)** is Android's built-in screen reader
- **[Switch Access](https://support.google.com/accessibility/android/answer/6122836)** is an Android feature for users with motor disabilities

### Automated testing integration

- **[ALKiln](../components/ALKiln/automated_testing.mdx#accessibility)** is the Document Assembly Line's testing framework with built-in accessibility testing using [axe-core](https://github.com/dequelabs/axe-core)
- **[aXe-core](https://github.com/dequelabs/axe-core)** is an open-source accessibility testing engine used by many tools
- **[Pa11y](https://pa11y.org/)** is a command-line accessibility testing tool that can be integrated into CI/CD pipelines

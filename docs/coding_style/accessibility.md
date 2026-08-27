---
id: accessibility
title: Making docassemble interviews accessible
sidebar_label: Accessibility
slug: accessibility
---

**Web accessibility** is the practice of making your website usable by many different users, such as those who use keyboard controls or screen readers.

Making guided interviews accessible is first and foremost about making them easy to understand and use. Following [our advice about writing good questions](../style_guide/question_overview) can make your interview easier to understand and complete overall, which helps everyone!

Web accessibility also involves writing interviews in a way the user's browser or accessibility tools like screen readers can understand. docassemble [handles many of these things](https://docassemble.org/docs/accessibility.html) for you, but there are some parts that you have to address when building your interview.

To help you find accessibility problems in your interview you can use the [WAVE browser extension](https://wave.webaim.org/extension/), or if you want to check accessibility of your interview automatically, you can use the [ALKiln testing framework](../components/ALKiln/automated_testing.mdx#accessibility).

## Best practices for accessibility

### Use colors that contrast strongly with their backgrounds

One thing that you have control over in your interviews is your interview "branding", including fonts, styles, and importantly, colors. Making sure the text colors and background colors that you choose have high enough contrast is important to both low-vision and sighted users. Web accessibility standards like WCAG 2 define the **minimum** proper color contrast between an element and it's background color as 4.5:1. For larger text like headings, the minimum is 3:1.

You can check that the colors you are using in your interview's branding have proper contrast with the following tools:

* [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/)
* [Accessible Web's contrast checker](https://accessibleweb.com/color-contrast-checker/)

### Use alt-text with images

To describe images in webpages, screen readers read out author-provided descriptions called alternative text, or alt-text. Without alt-text, people visiting your page with screen readers won't get any of the benefits of the graphic. The W3 WAI group has [a good decision tree on how to write alt-text](https://www.w3.org/WAI/tutorials/images/decision-tree/).

In docassemble, you should [set the `alt_text` attribute of a DAFile](https://docassemble.org/docs/objects.html#DAFile), or use [the `set_alt_text()` function](https://docassemble.org/docs/objects.html#DAFile.set_alt_text). If you are writing HTML directly, you can add an `alt` property to any `img` tags you use:

```html
<img src="my_image.png" alt="A drawing of a flowchart: the question is 'do you have any children?', the option 'yes' leads to 'scenario 1', and the option 'no' leads to 'scenario 2'."/>
```

:::tip
Don't forget to add alt-text to your organization's logo. It can be a simple description like "Organization A's logo", but it should be present.
:::

### Maintain consistent heading increments

Headings provide semantic structure to web pages and help screen readers navigate.

If you use headings in your questions, always increment your heading levels one step at a time. In other words, always go from heading level 2 to 3, not from 2 to 4.

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

Screen readers have special features that let users navigate between different headings in order to navigate quickly, and skipped heading levels can disorient users.

#### Don't use `h1` in sub questions

There should only ever be one `h1` heading on a page. In docassemble, that heading is the `question` attribute. Don't use a single `#` Markdown heading or an `<h1>` HTML tag in a subquestion or note.

#### Changing heading sizes

You might notice that the question heading in docassemble looks smaller than headings in the subquestion. This is because docassemble manually styles the question to look like an `h3` heading, even though it is really a `h1` heading.

If you want to change the size of a heading, don't skip heading levels until they "look right." Instead, use HTML to style them as a smaller (or larger) heading level:

```yaml
subquestion: |
  <h2 class="h4">Heading 2 (shown the same size as heading 4)</h2>
  ...

  <h3 class="h5">Heading 3 (shown the same size as heading 5)</h3>
  ...

```

### Avoid comboboxes

[Comboboxes](https://docassemble.org/docs/fields.html#field%20with%20combobox) allow the user to choose a selection from a list or enter their own "other" value. But as implemented in docassemble, have [several usability problems](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/issues/548), especially with screen readers, so we recommend you don't use them. Instead, split the combobox into multiple fields or use a single text field with validation.

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

## Accessibility testing tools

You should test your interview with assistive technology as much as you can! The best way to improve your interviews for assistive technology users is by actually experiencing them yourself.

Here are some common tools to help you test and validate the accessibility of your interviews:

### Screen readers

Screen readers read content aloud for users who are blind, have low vision, or other challenges reading text. Each screen reader behaves differently, so test with as many as you can.

Do not rewrite your content based on how it sounds in a screen reader. Screen readers may pronounce some words and acronyms differently than you might expect. This is fine; screen reader users are used to these differences. For more discussion of this, see [Adrian Roselli's post about this](https://adrianroselli.com/2023/04/dont-override-screen-reader-pronunciation.html). 

Free screen readers:
* **[NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)** is a free, open-source screen reader for Windows that is widely used and regularly updated
* **[VoiceOver](https://www.apple.com/accessibility/vision/)** is built into Apple devices. Activate with Command (⌘) + F5 on Mac.
* **[TalkBack](https://support.google.com/accessibility/android/answer/6283677)** is Android's built-in screen reader
* **[Orca](https://help.gnome.org/users/orca/stable/)** is an open-source screen reader for Linux systems

Commercial screen readers:
* **[JAWS (Job Access With Speech)](https://www.freedomscientific.com/products/software/jaws/)** is the most popular screen reader for Windows with advanced features

### Browser accessibility checkers

These tools can automatically scan your interview pages for accessibility issues:

* **[WAVE Web Accessibility Evaluator](https://wave.webaim.org/extension/)** is a browser extension that highlights accessibility issues directly on the page
* **[Axe DevTools](https://www.deque.com/axe/devtools/)** is a browser extension for Chrome, Firefox, and Edge that integrates with developer tools
* **[Lighthouse](https://developer.chrome.com/docs/lighthouse/)** is built into Chrome DevTools and includes accessibility auditing alongside performance testing
* **[Accessibility Insights](https://accessibilityinsights.io/)** is Microsoft's accessibility testing tool for web and Windows

### Manual testing tools

* **[Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)** is a desktop application for testing color contrast ratios
* **[Accessibility bookmarklets](https://accessibility-bookmarklets.org/)** is a collection of browser bookmarklets for quick accessibility checks

### Mobile accessibility testing

* **[VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios)** is iOS's built-in screen reader
* **[TalkBack](https://support.google.com/accessibility/android/answer/6283677)** is Android's built-in screen reader
* **[Switch Access](https://support.google.com/accessibility/android/answer/6122836)** is an Android feature for users with motor disabilities

### Automated testing integration

* **[ALKiln](../components/ALKiln/automated_testing.mdx#accessibility)** is the Document Assembly Line's testing framework with built-in accessibility testing using [axe-core](https://github.com/dequelabs/axe-core)
* **[aXe-core](https://github.com/dequelabs/axe-core)** is an open-source accessibility testing engine used by many tools
* **[Pa11y](https://pa11y.org/)** is a command-line accessibility testing tool that can be integrated into CI/CD pipelines

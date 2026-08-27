---
id: accessibility
title: Making docassemble interviews accessible
sidebar_label: Accessibility
slug: accessibility
---

**Web Accessibility** is the practice of making your website usable by many different users, such as those who use keyboard controls or screen readers.

Making your guided interviews accessible is first and foremost about making them easy to understand and use. Following [our advice about writing good questions](../style_guide/question_overview) can make your interview overall easier to understand and complete, which helps everyone!

Other parts of web accessibility involve writing the interview in a way that the user's browser and other accessibility tools (like screen readers) can understand. docassemble [handles many of these things](https://docassemble.org/docs/accessibility.html) for you, but there are some parts that you'll have to address when writing your interview.

To help you find accessibility problems in your interview you can use the [WAVE browser extension](https://wave.webaim.org/extension/), or if you want to check accessibility of your interview automatically, you can use the [ALKiln testing framework](../components/ALKiln/automated_testing.mdx#accessibility).

## Use colors that contrast strongly with their backgrounds

One thing that you have control over in your interviews is your interview "branding", including fonts, styles, and importantly, colors. Making sure the text colors and background colors that you choose have high enough contrast is important to both low-vision and sighted users. Web accessibility standards like WCAG 2 define the **minimum** proper color contrast between an element and it's background color as 4.5:1. For larger text like headings, the minimum is 3:1.

You can check that the colors you are using in your interview's branding have proper contrast with the following tools:

* [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/)
* [Accessible Web's contrast checker](https://accessibleweb.com/color-contrast-checker/)

## Use alt-text with images

To describe images in webpages, screen readers read out author-provided descriptions called alternative text, or "alt-text". Without alt-text, people visiting your page with screen readers won't get any of the benefits of the graphic. The W3 WAI group has [a good decision tree on how to write alt-text](https://www.w3.org/WAI/tutorials/images/decision-tree/).

In docassemble, you should [set the `alt_text` attribute of a DAFile](https://docassemble.org/docs/objects.html#DAFile), or use [the `set_alt_text()` function](https://docassemble.org/docs/objects.html#DAFile.set_alt_text). If you are writing HTML directly, you can add an `alt` property to any `img` tags you use (see below).

```html
<img src="my_image.png" alt="A drawing of a flowchart: the question is 'do you have any children?',
    the option 'yes' leads to 'scenario 1', and the option 'no' leads to 'scenario 2'."/>
```

### Logos

You should add alt-text to your organizations logo. This alt-text can be simple, such as "Organization A's logo", but it should be present.

## Maintain consistent header increments

If you use headers in your question markdown, make sure that you always increment your header levels by one. For examples, always go from header level 2 to 3, and not 2 to 4. Screen readers have special features that let users navigate between different headers in order to navigate quickly, and skipped header levels can disorient users.

### Don't use `h1` in sub questions

There should only ever be one `h1` header on a page, and in docassemble, that header is the `question` attribute. Because of that, you shouldn't use a `#` header (or if you use HTML, an `<h1>` tag) in a subquestion.

### Header sizes

You might notice that the question header in docassemble looks smaller than headers in the subquestion. This is because docassemble manually styles the question to
look like an `h3` header, even though it is really a `h1` header. If you want the headers in your subquestion, don't skip header levels until they "look right". Instead, you can manually use HTML and style them as such:

```yaml
subquestion: |
  <h2 class="h4">Main Description</h2>

  ...

  <h3 class="h5">More Details</h3>

  ...

```

## Avoid comboboxes

Comboboxes, as implemented in docassemble, have [several usability problems](https://github.com/SuffolkLITLab/docassemble-AssemblyLine/issues/548), especially with screen readers. We recommend that you don't use comboboxes in new interviews, instead using one of the below alternatives:

* split out the combo box into two fields: a dropdown with the same fields and an additional "other" option, and a fill-in-the-blank text input hidden behind a `show if` when the dropdown is not "other". This only works if the list of predefined options is short and the user will expect to find an "other" option on the list.

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

* split the combo box into three fields: a dropdown menu with options (like a list of courts inside the user's state), a checkbox that indicates the list doesn't apply, and a fill-in-the-blank text input hidden behind a `show if`. This is appropriate if the list of options represents the most common selections, and there is an obvious "mode" switch. For example, the checkbox might read "My court is outside of Massachusetts".

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

* if the combo box suggestions are validated by the interview, add some some of those suggestions into examples on the page (which makes them easier to discover for some users) and turn the field into a text input where the validation errors are descriptive.

## Accessibility testing tools

You should test your interview with assistive technology as much as you can! The best way to improve your interviews for assistive technology users is by actually experiencing them yourself.
Here are some common tools to help you test and validate the accessibility of your interviews:

### Screen readers

Screen readers are assistive technologies that read content aloud for users who are blind or have low vision. Each of these screen readers behaves differently, so test with as many of them as
you can.

It's important to note that you shouldn't rewrite your content based on how it sounds in the screen reader. When using a screen reader, some words and acronyms will be pronounced differently than you might expect. This is fine; screen reader users are used to these differences. For more discussion here, see [Adrian Roselli's post about this](https://adrianroselli.com/2023/04/dont-override-screen-reader-pronunciation.html). 

**Free screen readers:**
* **[NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)** - Free, open-source screen reader for Windows. Widely used and regularly updated.
* **[VoiceOver](https://www.apple.com/accessibility/vision/)** - Built into macOS and iOS devices. Activate with Command+F5 on Mac.
* **[Orca](https://help.gnome.org/users/orca/stable/)** - Open-source screen reader for Linux systems.

**Commercial screen readers:**
* **[JAWS (Job Access With Speech)](https://www.freedomscientific.com/products/software/jaws/)** - The most popular screen reader for Windows with advanced features.

### Browser accessibility checkers

These tools can automatically scan your interview pages for accessibility issues:

* **[WAVE Web Accessibility Evaluator](https://wave.webaim.org/extension/)** - Browser extension that highlights accessibility issues directly on the page.
* **[axe DevTools](https://www.deque.com/axe/devtools/)** - Browser extension for Chrome, Firefox, and Edge that integrates with developer tools.
* **[Lighthouse](https://developer.chrome.com/docs/lighthouse/)** - Built into Chrome DevTools, includes accessibility auditing alongside performance testing.
* **[Accessibility Insights](https://accessibilityinsights.io/)** - Microsoft's accessibility testing tools for web and Windows applications.

### Manual testing tools

* **[Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)** - Desktop application for testing color contrast ratios.
* **[Accessibility bookmarklets](https://accessibility-bookmarklets.org/)** - Collection of browser bookmarklets for quick accessibility checks.

### Mobile accessibility testing

* **[TalkBack](https://support.google.com/accessibility/android/answer/6283677)** - Android's built-in screen reader.
* **[Switch Access](https://support.google.com/accessibility/android/answer/6122836)** - Android feature for users with motor disabilities.
* **[VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios)** - iOS's built-in screen reader.

### Automated testing integration

* **[ALKiln](../components/ALKiln/automated_testing.mdx#accessibility)** - Assembly Line's testing framework with built-in accessibility testing using aXe-core.
* **[aXe-core](https://github.com/dequelabs/axe-core)** - Open-source accessibility testing engine used by many tools.
* **[Pa11y](https://pa11y.org/)** - Command-line accessibility testing tool that can be integrated into CI/CD pipelines.

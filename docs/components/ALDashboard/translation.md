# Table of Contents

* ALDashboard.translation
  * [gpt\_is\_available](#ALDashboard.translation.gpt_is_available)
  * [may\_have\_mako](#ALDashboard.translation.may_have_mako)
  * [may\_have\_html](#ALDashboard.translation.may_have_html)
  * [translate\_fragments\_gpt](#ALDashboard.translation.translate_fragments_gpt)
  * [Translation](#ALDashboard.translation.Translation)
    * [file](#ALDashboard.translation.Translation.file)
    * [untranslated\_segments](#ALDashboard.translation.Translation.untranslated_segments)
  * [translation\_file](#ALDashboard.translation.translation_file)

---
sidebar_label: translation
title: ALDashboard.translation
---

#### gpt\_is\_available() {#ALDashboard.translation.gpt\_is\_available}

```python
def gpt_is_available() -> bool
```

Return True if the GPT API is available.

#### may\_have\_mako(text: str) {#ALDashboard.translation.may\_have\_mako}

```python
def may_have_mako(text: str) -> bool
```

Return True if the text appears to contain any Mako code, such as $\{...\} or % at the beginning of a line.

#### may\_have\_html(text: str) {#ALDashboard.translation.may\_have\_html}

```python
def may_have_html(text: str) -> bool
```

Return True if the text appears to contain any HTML code, such as &lt;p&gt; or &lt;div&gt;.

#### translate\_fragments\_gpt(fragments: Union[str, List[Tuple[int, str]]], source\_language: str, tr\_lang: str, interview\_context: Optional[str] = None, special\_words: Optional[Dict[int, str]] = None, model="gpt-4.1-nano", openai\_base\_url: Optional[str] = None, max\_output\_tokens: Optional[int] = None, max\_input\_tokens: Optional[int] = None, openai\_api: Optional[str] = None) {#ALDashboard.translation.translate\_fragments\_gpt}

```python
def translate_fragments_gpt(
        fragments: Union[str, List[Tuple[int, str]]],
        source_language: str,
        tr_lang: str,
        interview_context: Optional[str] = None,
        special_words: Optional[Dict[int, str]] = None,
        model="gpt-4.1-nano",
        openai_base_url: Optional[str] = None,
        max_output_tokens: Optional[int] = None,
        max_input_tokens: Optional[int] = None,
        openai_api: Optional[str] = None) -> Dict[int, str]
```

Use an AI model to translate a list of fragments (strings) from one language to another and provide a dictionary
with the original text and the translated text.

You can optionally provide an alternative model, but it must support JSON mode.

**Arguments**:

- `fragments` - A list of strings to be translated.
- `source_language` - The language of the original text.
- `tr_lang` - The language to translate the text into.
- `special_words` - A dictionary of special words that should be translated in a specific way.
- `model` - The GPT model to use. The default is &quot;gpt-4.1-nano&quot;
- `openai_base_url` - The base URL for the OpenAI API. If not provided, the default OpenAI URL will be used.
- `max_output_tokens` - The maximum number of tokens to generate in the output.
- `max_input_tokens` - The maximum number of tokens in the input. If not provided, it will be set to 4000.
- `openai_api` - The OpenAI API key. If not provided, it will use the key from the configuration.

**Returns**:

  A dictionary where the keys are the indices of the fragments and the values are the translated text.

## Translation Objects {#ALDashboard.translation.Translation}

```python
class Translation(NamedTuple)
```

#### file: `DAFile` {#ALDashboard.translation.Translation.file}

an XLSX or XLIFF file

#### untranslated\_segments: `int` {#ALDashboard.translation.Translation.untranslated\_segments}

Number of rows in the output that have untranslated text - one for each question, subquestion, field, etc.

#### translation\_file(yaml\_filename: str, tr\_lang: str, use\_gpt=False, use\_google\_translate=False, openai\_api: Optional[str] = None, max\_tokens=4000, interview\_context: Optional[str] = None, special\_words: Optional[Dict[int, str]] = None, model: Optional[str] = None, openai\_base\_url: Optional[str] = None, max\_input\_tokens: Optional[int] = None, max\_output\_tokens: Optional[int] = None) {#ALDashboard.translation.translation\_file}

```python
def translation_file(yaml_filename: str,
                     tr_lang: str,
                     use_gpt=False,
                     use_google_translate=False,
                     openai_api: Optional[str] = None,
                     max_tokens=4000,
                     interview_context: Optional[str] = None,
                     special_words: Optional[Dict[int, str]] = None,
                     model: Optional[str] = None,
                     openai_base_url: Optional[str] = None,
                     max_input_tokens: Optional[int] = None,
                     max_output_tokens: Optional[int] = None) -> Translation
```

Return a tuple of the translation file in XLSX format, plus a count of the
number of words and segments that need to be translated.

The word and segment count only apply when filetype=&quot;XLSX&quot;.

This code was adjusted from the Flask endpoint-only version in server.py. XLIFF support was removed
for now but can be added later.


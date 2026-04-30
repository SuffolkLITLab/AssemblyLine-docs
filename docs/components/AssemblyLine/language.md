# Table of Contents

* [AssemblyLine.language](#AssemblyLine.language)
  * [get\_local\_languages\_yaml](#AssemblyLine.language.get_local_languages_yaml)
  * [get\_tuples](#AssemblyLine.language.get_tuples)
  * [get\_language\_list\_dropdown](#AssemblyLine.language.get_language_list_dropdown)
  * [get\_language\_list\_dropdown\_item](#AssemblyLine.language.get_language_list_dropdown_item)
  * [get\_language\_list](#AssemblyLine.language.get_language_list)
  * [get\_language\_list\_item](#AssemblyLine.language.get_language_list_item)

---
sidebar_label: language
title: AssemblyLine.language
---

<a id="AssemblyLine.language.get_local_languages_yaml"></a>

#### get\_local\_languages\_yaml()

```python
def get_local_languages_yaml() -> str
```

Get the path to the local languages.yml file. If it does not exist, it will return the path to the languages.yml

**Returns**:

- `str` - the path to the local languages.yml file if it exists, otherwise the path to the languages.yml file

<a id="AssemblyLine.language.get_tuples"></a>

#### get\_tuples(lang\_codes: List[str], languages\_path: Optional[str] = None)

```python
def get_tuples(lang_codes: List[str],
               languages_path: Optional[str] = None) -> List[Tuple[str, str]]
```

Returns a list of tuples representing the language name, followed by language ISO 639-1 code.

It will use the native_name value from the languages.yml file if available, otherwise it will use the
English name from pycountry. If neither is present, it will use the language code itself.

**Arguments**:

- `lang_codes` - a list of ISO 639-1 language codes (e.g. [&#x27;en&#x27;, &#x27;es&#x27;])
- `languages_path` - the path to the languages.yml file (defaults to data/sources/languages.yml)
  

**Returns**:

  A list of tuples representing the language name, followed by language ISO 639-1 code.

<a id="AssemblyLine.language.get_language_list_dropdown"></a>

#### get\_language\_list\_dropdown(lang\_codes: List[str], current: str = "", languages\_path: Optional[str] = None, event\_name="al\_change\_language", icon="fa-solid fa-language fa-xl", extra\_class: str = "text-light")

```python
def get_language_list_dropdown(lang_codes: List[str],
                               current: str = "",
                               languages_path: Optional[str] = None,
                               event_name="al_change_language",
                               icon="fa-solid fa-language fa-xl",
                               extra_class: str = "text-light") -> str
```

Get a Bootstrap 5 dropdown menu for language selection that can be added to navigation bar.

**Arguments**:

- `lang_codes` - a list of ISO 639-1 language codes (e.g. [&#x27;en&#x27;, &#x27;es&#x27;])
- `current` - the current language code
- `languages_path` - the path to the languages.yml file (defaults to data/sources/languages.yml)
- `event_name` - the name of the event to trigger when the language is changed
- `icon` - the name of the icon to use for the dropdown menu (defaults to fa-solid fa-language fa-xl)
- `extra_class` - additional classes to add to the link

**Returns**:

  A string containing the HTML for a dropdown menu for language selection.

<a id="AssemblyLine.language.get_language_list_dropdown_item"></a>

#### get\_language\_list\_dropdown\_item(language: Tuple[str, str], link: bool = True, event\_name="al\_change\_language")

```python
def get_language_list_dropdown_item(language: Tuple[str, str],
                                    link: bool = True,
                                    event_name="al_change_language") -> str
```

Given an ordered tuple, returns a link to the current interview with lang=language code and the link title
given in the first part of the tuple.

**Arguments**:

- `language` - a tuple containing the language name and language code
- `link` - whether to return a link or just the text
- `event_name` - the name of the event to trigger when the language is changed
  

**Returns**:

- `str` - A string containing the HTML for a dropdown menu item for language selection.

<a id="AssemblyLine.language.get_language_list"></a>

#### get\_language\_list(languages: Optional[List[Tuple[str, str]]] = None, current="", lang\_codes: Optional[List[str]] = None, languages\_path: Optional[str] = None, event\_name="al\_get\_language\_list\_change\_language")

```python
def get_language_list(languages: Optional[List[Tuple[str, str]]] = None,
                      current="",
                      lang_codes: Optional[List[str]] = None,
                      languages_path: Optional[str] = None,
                      event_name="al_get_language_list_change_language") -> str
```

Given a list of language codes, returns
a Bootstrap-formatted unordered inline list. The current language will not be a link.

Deprecated behavior: instead of a list of language codes, you can provide list of
tuples containing the language name and language code. This is deprecated and may be removed in a future version.

**Arguments**:

- `languages` - a list of tuples containing the language name and language code (deprecated)
- `current` - the current language code
- `lang_codes` - a list of ISO 639-1 language codes (e.g. [&#x27;en&#x27;, &#x27;es&#x27;])
- `languages_path` - the path to the languages.yml file (defaults to data/sources/languages.yml)
- `event_name` - the name of the event to trigger when the language is changed
  

**Returns**:

  A string containing the HTML for an unordered inline list of language selection.

<a id="AssemblyLine.language.get_language_list_item"></a>

#### get\_language\_list\_item(language, link=True, event\_name="al\_change\_language")

```python
def get_language_list_item(language,
                           link=True,
                           event_name="al_change_language") -> str
```

Given an ordered tuple, returns a link to the current interview with lang=language code and the link title
given in the first part of the tuple.

**Arguments**:

- `language` - a tuple containing the language name and language code
- `link` - whether to return a link or just the text
- `event_name` - the name of the event to trigger when the language is changed
  

**Returns**:

- `str` - A string containing the HTML for an unordered inline list item for language selection.

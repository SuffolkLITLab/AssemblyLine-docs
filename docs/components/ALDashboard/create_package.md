# Table of Contents

* [ALDashboard.create\_package](#ALDashboard.create_package)
  * [create\_package\_zip](#ALDashboard.create_package.create_package_zip)

---
sidebar_label: create_package
title: ALDashboard.create_package
---

<a id="ALDashboard.create_package.create_package_zip"></a>

#### create\_package\_zip(pkgname: str, info: dict, author\_info: dict, folders\_and\_files: dict, fileobj: Optional[DAFile] = None)

```python
def create_package_zip(pkgname: str,
                       info: dict,
                       author_info: dict,
                       folders_and_files: dict,
                       fileobj: Optional[DAFile] = None) -> DAFile
```

Given a dictionary of lists, with the keys representing folders and the values
representing a list of DAFiles, create a Python package with docassemble conventions.
info: (created by DAInterview.package_info())
license
author_name
readme
description
url
version
dependencies
// interview_files replaced with folders_and_files
// template_files
// module_files
// static_files
author_info:
author name and email
folders_and_files:
questions-&gt;list of absolute file paths on the local filesystem
templates
modules
static
sources

Strucure of a docassemble package:
+ docassemble-PKGNAME/
LICENSE
MANIFEST.in
README.md
setup.cfg
setup.py
+-------docassemble
__init__.py
+------PKGNAME
__init__.py
SOME_MODULE.py
+------data
+------questions
README.md
+------sources
README.md
+------static
README.md
+------templates
README.md


---
id: aldashboard_overview
title: ALDashboard overview
sidebar_label: About ALDashboard
slug: /components/ALDashboard/overview
---

ALDashboard is a collection of tools to help administer a docassemble server and debug interviews. It provides utilities for package management, server maintenance, translation workflows, and debugging tools specifically designed for the Document Assembly Line ecosystem.

:::warning This page is a stub

We have not yet documented the key modules in the ALDashboard.
:::

## Main Modules

ALDashboard consists of several Python modules, each providing specific functionality:

- **aldashboard.py** - Core dashboard functionality and server management
- **create_package.py** - Package creation and management utilities
- **translation.py** - Translation workflow and management tools
- **project_maintenance.py** - Project maintenance and update utilities
- **docx_wrangling.py** - DOCX document processing and validation
- **package_scanner.py** - Package analysis and scanning tools
- **validate_docx.py** - DOCX validation utilities
- **validate_attachment.py** - Attachment validation tools

Some of this functionality is useful outside of the ALDashboard. `project_maintenance.py` is specifically a tool to run from the commandline and is not available as a "widget" you can interact with from the docassemble frontend.

## Installation

ALDashboard is typically installed as part of the Document Assembly Line setup:

- [Installation Guide](/docs/get_started/installation)

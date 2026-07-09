---
id: interviewstats_overview
title: 'InterviewStats: Tracking usage of Assembly Line interviews'
sidebar_label: InterviewStats
slug: overview
---

## Overview

docassemble is designed to protect the privacy of interview users. However, you may
have very good reasons to collect usage information:

* Your users might all be inside a single organization rather than consumers
* You may need to collect anonymous statistics to report to a funder
* You may be an entity like a court or tribunal and need the information for a
  legitimate purpose, to serve the user or litigant's needs

## Collecting anonymous analytics with Google or Segment

docassemble has a native integration with both [Google
Analytics](https://docassemble.org/docs/config.html#google%20analytics) and
[Segment](https://docassemble.org/docs/config.html#segment%20id).

Google is widely used and free, but usage is reported to Google and used for
purposes of selling advertisements. Segment is a commercial analytics tool with
a paid tier.

An advantage of Google Analytics and Segment is that the data will be stored for
the long term and you do not need to worry about persisting it between server
outages or upgrades, nor about retaining information long term on your server. A
disadvantage is that they rely on well-known user tracking tools that may be
blocked by ad-blocking or other security software, so the usage statistics may
not be completely accurate.

To use this integration:

1. Make sure each question in your interview has an `id`. The `id` specifier
will be added automatically to interviews created with the Assembly Line Weaver.

Example:

```yaml
id: this is the google or segment analytics id
question: |
  What is your name
fields:
  - Name: user_name
```

Sign up for Google Analytics or Segment, and follow the [docassemble
documentation](https://docassemble.org/docs/config.html#google%20analytics) to
enable tracking with the system of your choice.

This integration allows for very basic tracking. You can identify popular
interviews, screens, and dropoff points. Perhaps the most important thing to
track is to assign an id named `download` to your download screen. Then, inside
Google Analytics, you can search for the keyword "download" under Behavior |
Site Content | All pages.

Note that the "page url" in Google Analytics will have the name of the package
and YAML file inserted into the URL. This means you do not need to worry about
prefixing the page IDs in order to uniquely track the usage of different
interviews installed on your server.

## Collecting information with `store_variables_snapshot()`

By default, every interview created by the Weaver includes this line in a
mandatory `code` block:

```python
store_variables_snapshot({"zip": users[0].address.zip})
```

This code runs immediately before the download screen, providing a good proxy of
completed interviews. It stores the user's zip code in the docassemble
datatabase, and can be used to run reports about anonymous usage.

You can choose to narrow or expand the data that is captured with this tool. The
default stores only the zip code, but if you remove all parameters, the user's
full interview session will be captured in a simplified state. You can also
manually add additional interview variables that you want to store. For example,
if you wanted to store the user's city and the list of options they chose for a
checkbox variable named `user_preference`:

```python
store_variables_snapshot({
    "zip": users[0].address.zip,
    "city": users[0].address.city,
    "user_preference": user_preference.true_values()
    })
```

docassemble interviews can store complex nested objects that don't fit neatly in
a spreadsheet. If you want to manipulate the data later, you may want to
"flatten" the data so that it is a neat linear list of fields. That will make
later analysis easier.

You may also want to adjust the time that the data is stored. If you add the
parameter `persistent=True`, the data will persist even if the user's session is deleted,
which may happen every 90 days in a default docassemble server environment.

Full documentation for
[`store_variables_snapshot()`](https://docassemble.org/docs/functions.html#store_variables_snapshot)
can be found on the docassemble website.

### Viewing information stored by `store_variables_snapshot()`

You can use the Assembly Line
[`InterviewStats`](https://github.com/suffolklitlab/docassemble-InterviewStats) package to 
view statistics that are captured with `store_variables_snapshot()`.

`InterviewStats` can be installed with the `ALDashboard` installation wizard.
Once it is installed, visit
`https://docassemble.example.com/start/InterviewStats/stats` (replace
docassemble.example.com with the correct address for your docassemble server).

You will see a selection of interviews to choose from. This list is taken from
the list of interviews that you have set up in the [`dispatch`
directive](https://docassemble.org/docs/config.html#dispatch) in your
docassemble configuration file.

Once you select an interview, you will be able browse and view basic summary information about it.
You will also see a link to download the full data as an Excel spreadsheet.
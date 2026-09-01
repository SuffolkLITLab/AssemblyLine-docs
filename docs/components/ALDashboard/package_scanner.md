# Table of Contents

* ALDashboard.package\_scanner
  * [URL](#ALDashboard.package_scanner.URL)
  * [PARAMETERS](#ALDashboard.package_scanner.PARAMETERS)
  * [DELAY\_BETWEEN\_QUERYS](#ALDashboard.package_scanner.DELAY_BETWEEN_QUERYS)
  * [getUrl](#ALDashboard.package_scanner.getUrl)
  * [fetch\_github\_repos](#ALDashboard.package_scanner.fetch_github_repos)

---
sidebar_label: package_scanner
title: ALDashboard.package_scanner
---

#### URL {#ALDashboard.package\_scanner.URL}

The basic URL to use the GitHub API

#### PARAMETERS {#ALDashboard.package\_scanner.PARAMETERS}

Additional parameters for the query (by default 100 items per page)

#### DELAY\_BETWEEN\_QUERYS {#ALDashboard.package\_scanner.DELAY\_BETWEEN\_QUERYS}

The time to wait between different queries to GitHub

#### getUrl(url) {#ALDashboard.package\_scanner.getUrl}

```python
def getUrl(url)
```

Given a URL it returns its body

#### fetch\_github\_repos(github\_user, sub\_queries) {#ALDashboard.package\_scanner.fetch\_github\_repos}

```python
def fetch_github_repos(github_user, sub_queries) -> dict
```

Given a github user input, returns soughted info. It doesn&#x27;t contain version number.


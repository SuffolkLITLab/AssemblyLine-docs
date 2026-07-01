---
id: installation
title: Installing the Document Assembly Line
sidebar_label: Install the Assembly Line
slug: installation
---

Before you get started, make sure that you have [installed
docassemble](../admin_guide_docassemble/setup-server)
on a server that you maintain.

Installing the Assembly Line covers the following basic steps:

1. Install the docassemble.ALDashboard package
2. Run the installation script
3. Customize and install the
   [ALThemeTemplate](https://github.com/SuffolkLITLab/docassemble-ALThemeTemplate/)
   package with branding and question wording to match your needs.
4. Use the Weaver tool to automate your labeled PDF or DOCX forms.

## Install ALDashboard

[ALDashboard](https://github.com/SuffolkLITLab/docassemble-ALDashboard) contains
several features, but most importantly, it includes a menu-driven installation
script for the Assembly Line.

It will help you:

1. install all required and optional Assembly Line packages
2. verify and configure short links, configuration changes, and API
   configurations

To install ALDashboard:

1. visit the "Package Management" menu on your docassemble server when you are
   logged in as a server administrator
1. Type `docassemble.ALDashboard` into the input box labeled `Package on PyPI`
   ![Package on PyPI](../assets/installation_package_on_pypi.png)
1. Click the **Update** button.

## Run the installation script

Once ALDashboard is successfully installed, edit this link to replace
`YOUR_SERVER` with the URL to your own docassemble server and visit it.

```
https://YOURSERVER.com/start/ALDashboard/menu
```

Click the icon labeled "Install Assembly Line"

![Install assembly line](../assets/installation_install_assembly_line.png)

You will be asked to set up multiple APIs during the installation process.
If you do not have accounts yet, you can use the default choices for those
requests and return to them later.

Specifically, you will be asked to setup:

* [Google Maps, Places, and Google Geocoding APIs](https://docassemble.org/docs/config.html#google)
* [VoiceRSS](https://docassemble.org/docs/config.html#voicerss)
* [Twilio SMS](https://docassemble.org/docs/config.html#twilio)
* an [email server](https://docassemble.org/docs/config.html#mail) of your choice (we recommend Sendgrid)

You will also be asked to create a GitHub private access token on a new
GitHub account. This account should NOT be your primary account as it will
be used for automation.

Walk through the guided menus to complete the installation. You can safely
install all recommended packages and use all default configuration choices.
If you do not know the answer, you can return and manually edit your
configuration later.


## Customize the ALThemeTemplate repository

[ALThemeTemplate](https://github.com/SuffolkLITLab/docassemble-ALThemeTemplate/)
is a docassemble package that includes an example of how to modify questions and customize
them for your own jurisdiction or organization.

To use this package, [pull it into your own docassemble playground](https://docassemble.org/docs/playground.html#packages).

Next, [follow our guide](../components/ALThemeTemplate/althemetemplate_overview.md) to edit the YAML files and add a custom CSS theme to fit your own organization's needs.

Now, create a new package from the [Playground packages menu](https://docassemble.org/docs/playground.html#packages).
Give the package a meaningful name, like LouisianaSharedBranding.
Select the files that you customized and push them to your own Github repository.

:::info Copy, do not fork
It is important to copy and create a new package. Do not
fork the ALThemeTemplate package as docassemble makes it
challenging to rename a package.
:::

### Using your ALThemeTemplate with the ALWeaver

If you plan on using the [ALWeaver](../authoring/weaver_overview.md) to create your
interviews, you will want to include your branding package in your
weaved interviews. You can do this by adding 2 files to your branding
package:

1. [In your modules folder](https://docassemble.org/docs/playground.html#modules), create a file named `advertise_weaver.py` and add the following contents:

    ```python
    # pre-load
    import os
    from docassemble.ALWeaver.custom_values import advertise_capabilities

    if not os.environ.get('ISUNITTEST'):
        advertise_capabilities(__name__, minimum_version="1.5")
    ```

2. [In your sources folder](https://docassemble.org/docs/playground.html#sources), create a file named `configuration_capabilities.yml` (needs to have that exact spelling), and add the following contents:

    ```yaml
    package name: My Package
    organization_choices:
      - description: MyPackage
        dependency: "docassemble.MyPackage @ https://github.com/MyOrg/docassemble-MyPackage/archive/main.zip"
        include_name: "docassemble.MyPackage:custom_organization.yml"
        state: TX
        country: US
        default: false
    ```

    You should replace `MyOrg` and `MyPackage` with the name of your GitHub organization and
    the name you gave your custom branding package. If you changed the name of `custom_organization.yml`,
    the default name of the yaml in `ALThemeTemplate`, in your package,
    you should also change `custom_organization.yml` above.

## Docker-level server configuration changes we recommend

### Increase nginx timeouts to 5 minutes

Sometimes, long-running docassemble processes can "timeout." The default
experience in docassemble is to show the server's built-in error page,
which can be confusing for your end user.

We recommend that you increase the nginx timeout for uwsgi from 60 seconds
(default) to 5 minutes to reduce the frequency that users run into this
ugly error screen.


Unfortunately, this error page can only be changed by sshing into the
server and then entering the docker container.


1. SSH to the server running Docker.
1. Type `docker exec -ti $(docker ps --filter "ancestor=jhpyle/docassemble" --format {{.ID}}) /bin/bash`

Install a text editor and open the nginx configuration file as follows:

```bash
apt update
apt install nano
nano /etc/nginx/nginx.conf
```

Add the following exact text to the `http` section: `uwsgi_read_timeout 300s;`

![Edit uwsgi timeout](../assets/edit_uwsgi_timeout.png)

Type CTRL+O, Enter, and then CTRL+X to save and exit the configuration file.

Type the following commands to restart the nginx process:

```bash
supervisorctl restart nginx
```

### Replace the nginx 504 gateway timeout page

The default `nginx` timeout screen is a little menacing. It also does not give
you an indication that you can refresh the screen to try again, but often that
lets you get past the timeout. But you can customize it.

Here is a [custom HTML 504 gateway timeout
page](https://github.com/SuffolkLITLab/docassemble-ALToolbox/blob/main/docassemble/ALToolbox/data/static/custom_504.html)
that you could install with your own branding and that you can use to replace
the `nginx` default. It adds a "Reload" button that may allow your user to move
past the error string.

First:

1. SSH to the server running Docker.
1. Type `docker exec -ti $(docker ps --filter "ancestor=jhpyle/docassemble" --format {{.ID}}) /bin/bash`

Install a text editor:

```bash
apt update
apt install nano
```

Create a directory to store your custom configuration files:

```bash
mkdir /usr/share/nginx/html/errors
```

Open a new nano editor:

```bash
nano /usr/share/nginx/html/errors/custom_504.html
```

Copy and paste the contents  [custom HTML 504 gateway timeout
page](https://github.com/SuffolkLITLab/docassemble-ALToolbox/blob/main/docassemble/ALToolbox/data/static/custom_504.html)
into the open `nano` editor on your server.

Type CTRL+O, Enter, and then CTRL+X to save and close the editor.

Edit the `nginx` configuration file to point to your new custom error page:

```bash
nano /etc/nginx/nginx.conf
```

Add this line of code to the configuration file, inside the main `http` `{}`
brackets: `error_page 504 /errors/custom_504.html;`

Type CTRL+O, Enter, and then CTRL+X to save and close the editor.

Restart the nginx process:

```bash
supervisorctl restart nginx
```

## Monitor your server

There is always the chance that something goes wrong with your server when you aren't looking and that it goes down.

We suggest using a service that can attempt to access your server periodically and notifies you if it goes down. Some options include:

* [UptimeRobot](https://uptimerobot.com/)
* Using GitHub action's scheduled actions to attempt to access your server. The [SuffolkLITLab has an example of this type of GitHub action](https://github.com/SuffolkLITLab/ALActions/blob/main/.github/workflows/run_hall_monitor.yml), that you could copy and modify (we'd be happy to help your modify it for your needs).

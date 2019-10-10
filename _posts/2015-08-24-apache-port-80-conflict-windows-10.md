---
layout: post
title:  "Apache Port 80 conflict on Windows 10 (XAMPP/WAMP)"
date:   2015-08-24 15:09:20
tags: tutorial
author: Marcel Badua
---

If you are having a port 80 issue starting Apache on your local Windows 10 machine and have have already disable Skype to use port 80, here's a quick solution for you.

Open your Run Dialog and type `services.msc`.

Look for **World Wide Web Publishing Service** and double click on it. Click on stop. To permanently stop this service, change Startup type to Disable.

Restart Apache.

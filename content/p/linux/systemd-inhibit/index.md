---
title: "Linux Tips 01: systemd-inhibit"
description: A quick and casual guide on how to keep your Linux system awake during important tasks using the handy systemd-inhibit command.
pubDate: 2025-09-30
categories: ["linux", "systemd", "terminal"]
---

Ever started something important on your Linux machine and worried it might just go to sleep and ruin your flow? Like waiting for a big download, or burning a CD, or running some script that takes forever? Luckily, Linux has a neat little trick called **`systemd-inhibit`** that keeps your system awake as long as your task is running.

## What is systemd-inhibit?

Here’s the lowdown: when you run a command with `systemd-inhibit`, it basically puts up a “Don’t disturb” sign for your system’s sleep and shutdown modes. So the computer won’t doze off or restart until whatever you’re running is done.

The simplest way to use it is:

```bash
systemd-inhibit your-command-here
```

As long as `your-command-here` is running, your system stays awake. When it’s done, normal sleep and shutdown rules kick back in.

---

## Why should you care?

- No more interrupted backups or downloads.
- Prevent annoying sleep during important updates or installs.
- Keep your streaming or media server running without hiccups.
- Make sure your long scripts run through without a surprise sleep.

You can even get fancy with options, like telling it exactly what to block (`--what=sleep`), or giving a reason for your no-sleep mode (`--why="Burning a CD"`).

Here’s a quick example that’ll stop your PC from sleeping while you burn an ISO image to a CD:

```bash
systemd-inhibit wodim my-cool-iso.iso
```

---

## Quick Tip: Keep Your System Awake

If you want to keep your system awake for as long as you want without running a specific command, you can use:

```bash
systemd-inhibit bash
```

This will start a shell session that holds the inhibition lock until you `exit` the shell. Handy if you just want to prevent sleep temporarily without running other tasks.

---

## Wrap Up

Simple, right? It’s one of those little Linux things that can save a ton of headaches. So next time you’ve got something important going on, just wrap your command in `systemd-inhibit` and relax, your Linux box won’t bail on you.

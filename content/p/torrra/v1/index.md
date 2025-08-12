---
title: "Released: torrra v1.0.0"
description: From basic prompts to a full terminal interface - torrra v1.0.0 makes torrent searching and downloading seamless, right from your CLI.
pubDate: 2025-07-18
categories: ["foss", "announcement"]
---

When I first started building **torrra**, the goal was simple:
I wanted a fast, minimal way to search and download torrents right from the terminal - without bloat, without ads, and without needing to open a browser.

The early versions used [rich](https://github.com/Textualize/rich) for output and [questionary](https://github.com/tmbo/questionary) for prompts. That got the job done, but I knew it could be better.

Today, I’m releasing **torrra v1.0.0**, and it finally feels like the tool I wanted from the beginning.

---

## From Basic CLI to Full Terminal UI

This release moves `torrra` from a simple prompt-driven CLI to a fully interactive terminal UI - powered by [Textual](https://github.com/Textualize/textual).

The upgrade brings:

- A clean, keyboard-friendly interface
- Light and dark mode support
- Real-time download status
- Built-in search, selection, and controls - all without leaving the terminal

No more clunky prompt loops or plain stdout logs - the app now feels responsive, fluid, and fun to use.

---

## Designed for Power Users

`torrra` connects to your [Jackett](github.com/Jackett/Jackett) (if you use one), and gives you full control over torrent searching and downloading.

Just pick a provider, type your query, and you're off.

It supports:

- Selecting from multiple search results
- Streaming live download info
- Seeding after completion
- Pause/resume/stop with simple keybindings

---

## Install It

- **GitHub**: [stabldev/torrra](https://github.com/stabldev/torrra)
- **AUR**: [`torrra`](https://aur.archlinux.org/packages/torrra) / [`torrra-bin`](https://aur.archlinux.org/packages/torrra-bin)
- Prebuilt binaries available on the [Releases](https://github.com/stabldev/torrra/releases) page

> No setup needed. Just run and start searching.

---

## Looking Back, Looking Ahead

Shipping v1.0.0 feels like a solid milestone - not because it’s done, but because it finally feels stable, useful, and worth sharing widely.

I'm planning to improve it further with things like:

- More provider support
- Parallel downloads
- Better error handling

---

## Thanks

To everyone who tried the early versions and gave feedback (especially on Reddit): thank you. Your ideas shaped a lot of what’s in this release.

If you try `torrra`, I’d love to hear your thoughts.

PRs welcome.
Ideas welcome.
Bugs… not welcome, but I’ll fix them :P

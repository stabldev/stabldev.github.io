---
tittle: torrra
description: A Python tool that lets you find and download torrents without leaving your CLI.
pubDate: 2025-07-10
---

## What is torrra?

`torrra` is a Python tool that lets you find and download torrents without leaving your CLI. 
You can search for [torrents](https://en.wikipedia.org/wiki/Torrent) and select indexers based on what you want to search. And download it to your system using [libtorrent](https://en.wikipedia.org/wiki/Libtorrent).

---

## Features

- Search torrents from multiple indexers
- Fetch magnet links directly
- Download torrents via libtorrent
- Pretty CLI with Rich-powered progress bars
- Modular and easily extensible indexer architecture

---

## Story behind torrra

I'm a kind of person who loves to do stuffs straight from the terminal. And yes I used to torrent using some torrent clients like [qBittorrent](https://en.wikipedia.org/wiki/QBittorrent). 
The flow was like, I go to some torrent search engine, copy the [magnet uri](https://en.wikipedia.org/wiki/Magnet_URI_scheme), paste it in the client and hit download. You see that? it's like 4 steps.

I wanted to simplify this, since I'm a terminal person- I found creating a CLI tool would be the best bet. And then `torrra` was created.

ps: I'm just using this to download torrents send from my friends, yk.

### Challenges

The biggest challenge I faced while creating `torrra` was to find the right indexer. Because, I want the indexer to be server-rendered ([SSR](https://en.wikipedia.org/wiki/SSR)), only that way I can make this fast. 
With a server-side rendered indexer page, I can easily scrape it using [selectolax](https://github.com/rushter/selectolax) and [httpx](https://www.python-httpx.org/), 
this combo is actually faster than [bs4](https://en.wikipedia.org/wiki/BS4) with [requests](https://en.wikipedia.org/wiki/Requests_(software)).

And the other one was [anti-bot protection](https://en.wikipedia.org/wiki/Bot_prevention). 
If an indexer uses any kind of protection, for example- sites deployed on cloudflare has in-build anti-bot protection. 
This is not really good for us, and I tried [cloudscraper](https://pydigger.com/pypi/cloudscraper), guess it's not working now. 

So the only solution to these are to find the perfect indexers which are server-rendered and has no anti-bot protection. That wasn't easy- as most of the good ones has these measures. 
Finally I ended up with [YTS.mx](https://yts.mx/) for movie torrents and [magnetdl.hair](https://magnetdl.hair/) for everything. And it went well!

---

## How to install?

You can easily install this tool using [pipx](https://pipx.pypa.io/), with:

```bash
pipx install torrra
```

And boom! pipx installs `torrra` in an isolated environment, also it installs `libtorrent` in that same env. And finally you can run it by typing `torrra` in the terminal. 

There it is! just search something, select an indexer, select the torrent you want to download, enter the location and you will see a nice rich-progress bar showing the thing.

---

## Contributing & Notes

This project is a weekend-hacker side project- built for fun and learning. It's not a polished product (yet), but it works well enough for daily use!

If you run into any bugs, have suggestions, or want to help improve it, feel free to [open an issue](https://github.com/stabldev/torrra/issues) or even send a pull request. All contributions are welcome.


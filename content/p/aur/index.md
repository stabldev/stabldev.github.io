---
title: How to Publish Packages to AUR
description: Let's see how can we publish our packages to Arch User Repository (AUR) with best practices.
pubDate: 2025-07-21
---

## What is AUR?

The Arch User Repository (AUR) is a community-driven repository for Arch Linux and its derivatives. 
It contains user-created packages, often referred to as PKGBUILDs, which are essentially recipes for building and installing software not found in the official Arch Linux repositories. 
These packages can be built from source using tools like [makepkg](https://wiki.archlinux.org/title/Makepkg) and installed with [pacman](https://wiki.archlinux.org/title/Pacman). 

---

## What is a PKGBUILD File?

A PKGBUILD file is a shell script used by the Arch Linux package manager, makepkg, to build and package software. 
It contains instructions and metadata for creating an installable package from source code or other files. 
Essentially, it's a recipe for building and packaging software on Arch Linux.

Example one:

```bash title=PKGBUILD
# Maintainer: stabldev <thestabldev@gmail.com> # maintainer information

pkgname=torrra # package name
pkgver=1.1.0 # package version
pkgrel=2 # release number of the package version
pkgdesc="A Python tool that lets you find and download torrents without leaving your CLI." # project description
arch=('any') # supported architecture
url="https://github.com/stabldev/torrra" # project homepage
license=('MIT') # project license
depends=( # your project dependencies
  'libtorrent-rasterbar'
  'python'
  'python-diskcache'
  'python-httpx'
  'python-platformdirs'
  'python-textual'
  'python-tomli-w'
)
makedepends=('python-build' 'python-installer' 'python-wheel' 'python-hatchling') # dependencies need for building your project
source=("https://files.pythonhosted.org/packages/source/${pkgname:0:1}/$pkgname/$pkgname-$pkgver.tar.gz") # source to download your code from
sha256sums=('6f6ad553c857008a57b534001e0bcb851fb307fdc882a920afa841273a56296d') # for verification

build() { # build steps
    cd "$pkgname-$pkgver"
    python -m build --wheel --no-isolation
}

package() { # package steps
    cd "$pkgname-$pkgver"
    python -m installer --destdir="$pkgdir" dist/*.whl
    install -Dm644 LICENSE -t "$pkgdir/usr/share/licenses/$pkgname/"
}
```

---

## Create AUR Repostiory

### Generate a dedicated SSH key-pair

First thing you need is an AUR account. But before that- let's create a ssh key-pair for authenticating into aur, just like how we do it for GitHub. 
For that run this command:

```bash
ssh-keygen -t ed25519 -C "aur" -f ~/.ssh/id_aur
```

 - `-t ed25519`: specifies the key type (modern and recommended).
 - `-C "aur"`: adds a comment for easier identification.
 - `-f ~/.ssh/id_aur`: saves the key as `id_aur` (you can choose a different name if you want).

You'll see output like:

```bash
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_aur
Your public key has been saved in /home/user/.ssh/id_aur.pub
```

### Add the public key to your AUR account

 - Register an AUR account from [here](https://aur.archlinux.org/register) using your email address.
 - Go to "My Account".
 - Paste the contents of `~/.ssh/id_aur.pub` into the "SSH Public Key" field.

To get the contents, run:

```bash
cat ~/.ssh/id_aur.pub
```

### Configure SSH to use this key for the AUR

Edit (or create) your SSH config file:

```bash
nano ~/.ssh/config
```

Add this block:

```bash title=config
Host aur.archlinux.org
    User aur
    IdentityFile ~/.ssh/id_aur
```

### Clone Repo using SSH

Finally, we can clone the AUR repo using:

```bash
git clone ssh://aur@aur.archlinux.org/<package-name>.git
```

> Make sure to enter your package name in place of `<package-name` and AUR will create a repo for you.

---

## Make Changes and Publish

If you don't have a `PKGBUILD` file, then create it. Use the above PKGBUILD file example and make your changes. 
You can search around [aur](https://aur.archlinux.org/) for getting dependency names.

Once you have a proper `PKGBUILD` file, you need to update the `sha256sums` field with a proper sha-key. 
You can use [updpkgsums](https://man.archlinux.org/man/updpkgsums.8.env) for doing this, It downloads the source from the specified `source` path and update the field accordingly.

Run:

```bash
updpkgsums
```

> For development/testing, you can add `SKIP`. But, it is recommended to add a proper sha-key.

### .SRCINFO

After PKGBUILD, `.SRCINFO` is the file we need. It is auto-generated from the details we specified on `PKGBUILD` file. 
You can create it by running the command:

```
makepkg --printsrcinfo > .SRCINFO
```

> You need to run this command everytime you make changes to `PKGBUILD` file.

With these two files, you are almost done.

### Commit and Push

Just like git, do commit the changes and push to `master` branch.

```bash
git commit -m "chore: release v1.0.0"
git push origin -u master
```

And that's it! You can see your package at https://aur.archlinux.org/packages/<package_name>

---

## Things to Keep in Mind

 - Always run that command to auto-generate a `.SRCINFO` after everytime you update `PKGBUILD`.
 - If you've changed something on the build file, like dependencies- then increment the `pkgrel` number from the build file to force a new update.
 - Aur only supports `master` branch.
 - Don't update `sha256sums` field manually, use `updpkgsums` to auto-update it.

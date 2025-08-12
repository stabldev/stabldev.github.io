---
title: Python Virtual Environment Explained
description: We'll cover the basics of virtual environments in this guide and how to use them. We will then take a closer look at how virtual environments actually work.
pubDate: 2025-08-01
categories: ["python", "topics"]
---

## What is a Virtual Environment

A virtual environment is simply a tool that separates the dependencies of different projects by creating isolated environments for each project.

It is basically a directory inside your project, so you can create unilimted environments for your project projects.
This is one of the most popular tool used by python developers.

## Why do we need a Virtual Environment

Imagine you're working on a project which requires a [3rd-party](https://en.wikipedia.org/wiki/Third-party_software_component) library and you don't want to install it globally on your system, it is required for that specific project.

In such cases, virtual environment comes into play. It can create a seperate isolated environment in your project and can store/retrieve packages.
Think of it like a virtual space for just your awesome project.

Also, let's consider another case where you're working on two projects, `project_1` and `project_2`.

If the `project_1` needs [python_3.9](https://www.python.org/downloads/release/python-390/) and `project_2` needs [python_3.13](https://www.python.org/downloads/release/python-3130/),
they would be stored in the same directory with same name, so a version conflict may occur.
In such cases, virtual environment can be really helpful for you to maintain the dependencies of both the projects.

## How to Create a Virtual Environment

To create a virtual environment, you can either use the build-in [venv](https://docs.python.org/3/library/venv.html) module or the 3rd-party [virtualenv](https://pypi.org/project/virtualenv/) module.
Here, we can just use the build-in one.

> Make sure you've [pip](https://pypi.org/project/pip/) installed on your system.

### Create venv

Open the terminal in your project working directory and paste the following command to create a venv (virtual environment):

```bash
python -m venv .venv
```

Here, I created a virtual environment named `.venv`, you can name it whatever you desire. This will create a folder called `.venv` in your [current working directory](https://en.wikipedia.org/wiki/Working_directory) (cwd).
This is the folder where all your python packages will run.

### Activate venv

After successfully creating a virtual environment, you need to activate it to enter into that isolated environment.
Always remember to activate the required virtual environment before working on a project.
To activate it, run the following command:

**Linux and macOS**:

```bash
source .venv/bin/activate
```

**Windows**:

```bash
.venv\Scripts\activate
# or
.venv\Scripts\activate.bat
```

Once activated, your shell prompt will typically change to include the activated virtual environment, like: `(venv) your_username@your_machine:~$`.
This indicates that the virtual environment is active, and any python packages installed using [pip](https://pip.pypa.io/en/stable/) will be instaled within this isolated environment, not globally on your system.

### Deactivate venv

To deactivate the virtual environment and return to the system's global python environment, simply run this command:

```bash
deactivate
```

This command works on all operating systems after activating the virtual environment.

## Extras

After doing this couple of times, you might get bored and want something more fun and easy to work with. That's where package managers like [uv](https://docs.astral.sh/uv/), [poetry](https://python-poetry.org/), etc shines.
They are not like pip. They have their own virtual env, caching mechanism, lock file generation for faster installation and a build system.

I suggest [uv](https://docs.astral.sh/uv/), because it is written in [rust](https://www.rust-lang.org/), so is faster than other package managers.
You can manage projects with commands like:

```bash
# create project
uv init <project-name>
# sync lock file and dependencies
uv sync
# add packages
uv add <package-one> <package-two>
# remove packages
uv remove <package-two>
# build and publish
uv build && uv publish
```

Package managers like this makes your workflow even smoother not a mess.
Make sure to check out [uv](https://docs.astral.sh/uv/), its cool!

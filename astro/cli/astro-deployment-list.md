---
sidebar_label: "astro deployment list"
title: "astro deployment list"
id: astro-deployment-list
description: Reference documentation for astro deployment list.
---

## Description

List all Deployments within your current Workspace.

## Usage

```sh
astro deployment list
```

## Options

| Option  | Description                             | Possible Values |
| ------- | --------------------------------------- | --------------- |
| `-a`,`--all` | Show Deployments across all Workspaces that you have access to. | ``              |
| `--workspace-id` | Specify a Workspace to list Deployments outside of your current Workspace | Any valid Workspace ID                                            |

## Examples

```sh
$ astro deployment list --all
# Shows Deployments from all Workspaces that you're authenticated to
```

## Related Commands

- [`astro auth login`](cli/astro-auth-login.md)
- [`astro deploy`](cli/astro-deploy.md)
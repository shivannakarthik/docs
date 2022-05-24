---
sidebar_label: 'Install the CLI'
title: 'Install the Astro CLI'
id: cli-quickstart
description: Install the Astro CLI, the best way to run Apache Airflow and test data pipelines on your local machine.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {siteVariables} from '@site/src/versions';

## Overview

The Astro CLI is the easiest way to run Apache Airflow on your machine. By the end of this quickstart, you'll be able to run an Airflow project on your local machine with just a few commands.

## Step 1: Install the Astro CLI

<Tabs
    defaultValue="mac"
    values={[
        {label: 'Mac', value: 'mac'},
        {label: 'Windows', value: 'windows'},
        {label: 'Linux', value: 'linux'},
    ]}>
<TabItem value="mac">

Install the Astro CLI by running the following command:

```sh
brew install astronomer/tap/astro
```

</TabItem>

<TabItem value="windows">

#### Prerequisites

To use the Astro CLI on Windows, you must have:

- [Docker Desktop](https://docs.docker.com/desktop/windows/install/) for windows.
- [Docker Engine](https://docs.docker.com/engine/install/) (v0.13.1 or higher).
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) enabled on your local machine.
-  Windows 10 or Windows 11.

#### Installation


1. Go to the [**Releases** page of the Astro CLI GitHub](https://github.com/astro-projects/astro-cli/releases). Based on your desired CLI version and CPU architecture, download one of the `.zip` files available on this page.

    For example, if you wanted to install v1.0.0 of the Astro CLI on a Windows Machine with an AMD 64 architecture, you would download `astro_1.0.0-converged_windows_amd64.zip`.

2. Run the following command to unzip the executable:

    ```sh
    tar -xvzf .\astrocli.tar.gz
    ```

3. Save `astro.exe` in a secure location on your machine and add its filepath in the Windows PATH environment variable. For more information about configuring the PATH environment variable, read [Java documentation](https://www.java.com/en/download/help/path.html).

</TabItem>

<TabItem value="linux">

#### Prerequisites

To use the Astro CLI on Linux, you must have:

- [Docker Engine](https://docs.docker.com/engine/install/) (v0.13.1 or higher).

#### Installation

Run the following command to install the latest version of the Astro CLI directly to `PATH`:

```sh
curl -sSL install.astronomer.io | sudo bash -s
```

</TabItem>

</Tabs>

## Step 2: Confirm the Install

To confirm the CLI was installed properly, run the following CLI command:

```
astro version
```

If the installation was successful, you should see the following output:

<pre><code parentName="pre">{`% astro version
Astro CLI Version: ${siteVariables.cliVersion}`}</code></pre>

## Step 3: Create an Astro Project

The CLI can create an Astro project which contains all of the files you need to run Airflow locally. To create a new Astro project:

1. Create a new directory for your Astro project:

    ```sh
    mkdir <your-astro-project-name>
    ```

2. Open the directory:

    ```sh
    cd <your-astro-project-name>
    ```

3. Run the following Astro CLI command to initialize an Astro project in the directory:

    ```sh
    astro dev init
    ```

    This command generates all of the necessary files to run Airflow locally, including Docker configurations and example DAGs.

## Step 4: Run Airflow Locally

To confirm that you successfully initialized an Astro project, run the following command from your project directory:

```sh
astro dev start
```

This command builds your project and spins up 3 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks
- **Triggerer:** The Airflow component responsible for running Triggers and signaling tasks to resume when their conditions have been met. The Triggerer is used exclusively for tasks that are run with [deferrable operators](deferrable-operators.md)

## Step 5: Access the Airflow UI

Once your project builds successfully, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password.

After logging in, you should see the DAGs from your `dags` directory in the Airflow UI.

<div class="text--center">
<img src="/img/docs/sample-dag.png" alt="Example DAG in the Airflow UI" />
</div>

That's all it takes to run Airflow locally using Astro! From here, you can manage your entire local Airflow environment directly for your Astro project.

## Next Steps

Once you install the CLI, there are a few different paths you can take:

- To learn more about the available commands in the CLI, see the [CLI Command Reference] or run `astro help`.
- To develop your Astro project and configure your local Airflow environment, see [Develop Project](develop-project.md).
- If you're ready to deploy your project to a production environment on Astro, see [Deploy Code](deploy-code.md).
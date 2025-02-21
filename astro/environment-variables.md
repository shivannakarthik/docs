---
sidebar_label: 'Environment variables'
title: 'Set environment variables on Astro'
id: environment-variables
---

<head>
  <meta name="description" content="Learn how you can set environment variables on Astro to specify Airflow configurations and custom logic that better meet the requirements of your organization." />
  <meta name="og:description" content="Learn how you can set environment variables on Astro to specify Airflow configurations and custom logic that better meet the requirements of your organization." />
</head>

import {siteVariables} from '@site/src/versions';

An environment variable on Astro is a key-value configuration that is applied to a specific Deployment. You can use environment variables to set Airflow configurations and custom values for Deployments on Astro. For example, you can use environment variables to:

- Identify a production Deployment versus a development Deployment that allows you to apply conditional logic in your DAG code.
- Store [Airflow connections and variables](environment-variables.md#add-airflow-connections-and-variables-using-environment-variables).
- Set up an SMTP service to receive [Airflow alerts](airflow-alerts.md) by email.
- Integrate with Datadog or other third-party tooling to [export Deployment metrics](deployment-metrics.md#export-airflow-metrics-to-datadog).
- Set [Airflow configurations](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html?), such as default timezone and maximum active runs per DAG.

Some environment variables on Astro are set globally and cannot be overridden for individual Deployments. For more information on these environment variables, see [Global environment variables](platform-variables.md).

## Set environment variables in the Cloud UI

:::cli

If you prefer to work with the Astro CLI, you can create and update environment variables using the `astro deployment variable create` and `astro deployment variable update` commands. See [CLI command reference](cli/astro-deployment-variable-create.md).

:::

1. In the Cloud UI, select a Workspace and then select a Deployment.

2. Click the **Variables** tab.

3. Click **Edit Variables**.

4. Enter an environment variable key and value. For sensitive credentials that should be treated with an additional layer of security, select the **Secret** checkbox. This will permanently hide the variable's value from all users in your Workspace.

5. Click **Add**.

6. Click **Save Variables** to save your changes. Your Airflow scheduler, webserver, and workers restart. After saving, it can take up to two minutes for new variables to be applied to your Deployment.

### Edit existing values

After you set an environment variable key, only the environment variable value can be modified. You can modify environment variables that are set as secret. However, the variable value is never shown. When you modify a secret environment variable, you'll be prompted to enter a new value.

1. In the Cloud UI, select a Workspace and then select a Deployment.

2. Click the **Variables** tab.

3. Click **Edit Variables**.

4. Click **Edit value** next to the value you want to edit.

    ![Edit value location](/img/docs/variable-pencil.png)

5. Modify the variable's value, then click **Done editing**.

    ![Done editing location](/img/docs/variable-checkmark.png)

6. Click **Save Variables** to save your changes. Your Airflow scheduler, webserver, and workers restart. After saving, it can take up to two minutes for updated variables to be applied to your Deployment.

### How environment variables are stored on Astro

Non-secret environment variables set in the Cloud UI are stored in a database that is managed by Astronomer and hosted in the Astro control plane. When you configure a secret environment variable in the Cloud UI, the following methodology is used:

- Astro generates a manifest that defines a Kubernetes secret containing your variable's key and value.
- Astro applies this manifest to your Deployment's namespace in the data plane.
- After the manifest is applied, the key and value of your environment variable are stored in an [etcd cluster](https://etcd.io/) at rest within the Astro control plane.

This process occurs every time you update the environment variable's key or value.

:::caution

Environment variables marked as secret are stored securely by Astronomer and are not shown in the Cloud UI. However, it's possible for a user in your organization to create or configure a DAG that exposes secret values in Airflow task logs. Airflow task logs are visible to all Workspace members in the Airflow UI and accessible in your Astro cluster's storage.

To avoid exposing secret values in task logs, instruct users to not log environment variables in DAG code.

:::

## Set environment variables in your Dockerfile

If you want to store environment variables using an external version control tool, Astronomer recommends setting them in your `Dockerfile`. This file is automatically created when you first initialize an Astro project using `astro dev init`.

Environment variables added to a `Dockerfile` are mounted at build time and can be referenced in any other build process that follows `astro deploy` or `astro dev start`. Environment variables applied in the Cloud UI only become available once the Docker build process is completed.

:::caution

Environment variables set in your `Dockerfile` are stored in plain text. For this reason, Astronomer recommends storing sensitive environment variables using the Cloud UI or a third party secrets backend. For more information, see [Configure a secrets backend](secrets-backend.md).

:::

To add environment variables, declare an ENV command with the environment variable key and value. For example, the following `Dockerfile` sets two environment variables:

<pre><code parentName="pre">{`FROM quay.io/astronomer/astro-runtime:${siteVariables.runtimeVersion}
ENV AIRFLOW__CORE__MAX_ACTIVE_RUNS_PER_DAG=1
ENV AIRFLOW_VAR_MY_VAR=25`}</code></pre>

After you add your environment variables, use one of the following options to deploy your changes:

- Run `astro dev restart` to rebuild your image and apply your changes locally.
- Run `astro deploy` to apply your changes to your Deployment on Astro.

## Environment variable priority

On Astro, environment variables are applied and overridden in the following order:

- Cloud UI
- [.env (local development only)](develop-project.md#set-environment-variables-local-development)
- Dockerfile
- Default Airflow values

For example, if you set `AIRFLOW__CORE__PARALLELISM` with one value in the Cloud UI and you set the same environment variable with another value in your `Dockerfile`, the value set in the Cloud UI takes precedence.

## Add Airflow connections and variables using environment variables

If you regularly use [Airflow connections](https://airflow.apache.org/docs/apache-airflow/stable/concepts/connections.html) and [variables](https://airflow.apache.org/docs/apache-airflow/stable/concepts/variables.html), Astronomer recommends storing and fetching them with environment variables instead of adding them to the Airflow UI.

As mentioned above, Airflow connections and variables are stored in Airflow's metadata database. Adding them outside of task definitions and operators requires an additional connection to Airflow's metadata database, which is called every time the scheduler parses a DAG. This parsing process is defined by the `process_poll_interval` environment variable, which is set to 1 second by default.

By adding connections and variables as environment variables, you can refer to them more easily in your code and lower the amount of open connections, thus preventing a strain on your Database and resources.

### Airflow connections

The environment variable naming convention for Airflow connections is:

```
ENV AIRFLOW_CONN_<CONN_ID>=<connection-uri>
```

For example, consider the following Airflow connection:

- Connection ID: `MY_PROD_DB`
- Connection URI: `my-conn-type://login:password@host:5432/schema`

Here, the full environment variable would read:

```
ENV AIRFLOW_CONN_MY_PROD_DB=my-conn-type://login:password@host:5432/schema
```

For more information on how to generate a Connection URI, see the [Apache Airflow documentation](https://airflow.apache.org/docs/stable/howto/connection/index.html#generating-connection-uri).

:::info

Airflow connections set with environment variables do not appear in the Airflow UI and cannot be modified there.

:::

### Airflow variables

The environment variable naming convention for Airflow variables is:

```
ENV AIRFLOW_VAR_<VAR_NAME>=Value
```

For example, consider the following Airflow Variable:

- Variable Name: `My_Var`
- Value: `2`

Here, the environment variable would read:

```
ENV AIRFLOW_VAR_MY_VAR=2
```

## Query environment variables in a DAG

When you set an Airflow variable as an environment variable on Astro, there are two ways you can call that variable in your DAGs:

- `Variable.get('<environment-variable-key>')`
- `os.getenv('<environment-variable-key>', '<default_value>')`

If your variable or environment variable contains a secret value, Astronomer recommends using `Variable.get` to ensure that secret values are not present as plain text in your DAG code. However, with this method, requests to the Airflow metadata database can occur every time your DAGs are parsed. Typically, requests occur every 1 to 5 seconds and a significant number of requests could negatively affect database performance. For more information about retrieving Airflow variables using this method, see [Variables](https://airflow.apache.org/docs/apache-airflow/stable/concepts/variables.html).

For non-secret values, Astronomer recommends using `os.getenv('<environment-variable-key>', '<default_value>')` to reduce the number of Airflow metadata database requests.  Replace `environment-variable-key` with the key for your environment variable on Astro and `default_value` with the default value for the key. Typically, `default_value` is the value you defined for the environment variable in the Cloud UI. When your DAG queries an environment variable that doesn't exist, `default_value` is used.

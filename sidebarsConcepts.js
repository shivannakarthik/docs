module.exports = {
  concepts: [
    'overview',
    {
      type: 'category',
      label: 'Basics',
      items: [
        'intro-to-airflow',
        'dags',
        'what-is-an-operator',
        'what-is-a-sensor',
        'connections',
        'what-is-a-hook',
        'airflow-decorators',
        'bashoperator',
        'airflow-sql',
        'airflow-ui',
        'scheduling-in-airflow',
      ],
    },
    {
      type: 'category',
      label: 'Pipelines',
      items: [
        'dag-best-practices',
        'airflow-passing-data-between-tasks',
        'airflow-branch-operator',
        'airflow-importing-custom-hooks-operators',
        'debugging-dags',
        'subdags',
        'task-groups',
        'execute-notebooks',
        'rerunning-dags',
        'managing-dependencies',
        'managing-airflow-code',
        'templating',
        'cross-dag-dependencies',
      ],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: [
        'airflow-components',
        'deferrable-operators',
        'airflow-database',
        'using-airflow-plugins',
        'airflow-scaling-workers',
        'airflow-executors-explained',
        'airflow-pools',
      ],
    },
    {
      type: 'category',
      label: 'Management',
      items: [
        'testing-airflow',
        'custom-xcom-backends',
        'logging',
        'kubepod-operator',
        'airflow-sql-data-quality-tutorial',
        'dynamically-generating-dags',
        'dynamic-tasks',
      ],
    },
  ],
};

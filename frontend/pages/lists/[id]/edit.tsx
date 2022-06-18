import { NonIdealState, Spinner } from '@blueprintjs/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { List } from 'lib/types';
import { buildUrl } from 'lib/url';
import useFetch from 'lib/useFetch';
import FormView from 'views/FormView';

type Values = Omit<List, 'id' | 'todos'>;

const Edit: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data, isLoading, isError } = useFetch<Values>(`/lists/${id}`);

  if (isLoading) return <Spinner size={50} />;
  if (isError || data === undefined) {
    return (
      <NonIdealState
        icon="help"
        title="List not found"
        description="We couldn't find a list with that ID. Please check it is correct and try again."
      />
    );
  }

  return (
    <FormView
      url={buildUrl(`/lists/${id}`)}
      method="PATCH"
      objectType="list"
      initialValues={data}
      fields={[{ type: 'short', key: 'name', label: 'Name', required: true }]}
      redirectTo="/lists"
    />
  );
};

export default Edit;

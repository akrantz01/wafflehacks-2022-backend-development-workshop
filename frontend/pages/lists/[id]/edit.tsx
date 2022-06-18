import { NonIdealState, Spinner } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React from 'react';

import type { Page } from 'lib/page';
import { List } from 'lib/types';
import useFetch from 'lib/useFetch';
import FormView from 'views/FormView';

import { buildUrl } from '../../../lib/url';

type Values = Omit<List, 'id' | 'todos'>;

const Edit: Page = ({ domain }) => {
  const { query } = useRouter();
  const { id } = query;
  const { data, isLoading, isError } = useFetch<Values>(domain, `/lists/${id}`);

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
      url={buildUrl(domain, `/lists/${id}`)}
      method="PATCH"
      objectType="list"
      initialValues={data}
      fields={[{ type: 'short', key: 'name', label: 'Name', required: true }]}
      redirectTo="/lists"
    />
  );
};

export default Edit;

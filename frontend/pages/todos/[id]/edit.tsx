import { NonIdealState, Spinner } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React from 'react';

import { ListSelectInput } from 'components/inputs';
import type { Page } from 'lib/page';
import { Todo } from 'lib/types';
import useFetch from 'lib/useFetch';
import FormView from 'views/FormView';

import { buildUrl } from '../../../lib/url';

type Values = Omit<Todo, 'id' | 'tags'>;

const Edit: Page = ({ domain }) => {
  const { query } = useRouter();
  const { id } = query;
  const { data, isLoading, isError } = useFetch<Values>(domain, `/todos/${id}`);

  if (isLoading) return <Spinner size={50} />;
  if (isError || data === undefined) {
    return (
      <NonIdealState
        icon="help"
        title="Todo not found"
        description="We couldn't find a todo with that ID. Please check it is correct and try again."
      />
    );
  }

  return (
    <FormView
      url={buildUrl(domain, `/todos/${id}`)}
      method="PATCH"
      objectType="todo"
      initialValues={data}
      fields={[
        { type: 'short', key: 'summary', label: 'Summary', required: true },
        {
          type: 'custom',
          key: 'list_id',
          component: (props) => <ListSelectInput label="List" domain={domain} {...props} />,
        },
        { type: 'long', key: 'description', label: 'Description' },
        { type: 'switch', key: 'complete', label: 'Complete' },
      ]}
      redirectTo={`/todos/${id}`}
    />
  );
};

export default Edit;

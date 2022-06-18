import { Spinner, TagInput } from '@blueprintjs/core';
import React, { ReactNode, useState } from 'react';
import { KeyedMutator } from 'swr';

import { Todo } from 'lib/types';

import { buildUrl } from '../../lib/url';

interface Props {
  domain: string;
  id: number | string;
  values: string[];
  mutate: KeyedMutator<Todo>;
}

const Tags = ({ domain, id, values, mutate }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const onAdd = (updated: string[]) => {
    setLoading(true);

    mutate(async (todo) => {
      if (todo === undefined) return undefined;

      // Update the todo
      const added = updated[updated.length - 1];
      await fetch(buildUrl(domain, `/todos/${id}/tags?name=${added}`), { method: 'POST' });

      todo.tags = values;
      return todo;
    }).finally(() => setLoading(false));

    return true;
  };
  const onRemove = (node: ReactNode, index: number) => {
    setLoading(true);

    mutate(async (todo) => {
      if (todo === undefined) return undefined;

      // Remove the todo
      const removed = values[index];
      await fetch(buildUrl(domain, `/todos/${id}/tags?name=${removed}`), { method: 'DELETE' });

      todo.tags = todo.tags.filter((t) => t !== removed);
      return todo;
    }).finally(() => setLoading(false));

    return true;
  };

  return (
    <TagInput
      values={values}
      onAdd={onAdd}
      onRemove={onRemove}
      leftIcon={loading ? <Spinner size={25} /> : undefined}
      disabled={loading}
    />
  );
};

export default Tags;

import { Button, Intent, Tag } from '@blueprintjs/core';
import Link from 'next/link';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

import type { Page } from '../lib/page';
import { ReducedTodo } from '../lib/types';
import TableView, { RowProps } from '../views/TableView';

const Row = ({ item, domain }: RowProps<ReducedTodo>): JSX.Element => {
  const { mutate } = useSWRConfig();
  const [isLoading, setLoading] = useState(false);

  const onClick = () =>
    mutate('/todos', async (items: ReducedTodo[] | undefined) => {
      if (items === undefined) return undefined;

      setLoading(true);
      await fetch(`https://${domain}/todos/${item.id}/toggle`, { method: 'PUT' });

      const filtered = items.filter((i) => i.id !== item.id);
      const updated = [...filtered, { ...item, complete: !item.complete }];
      updated.sort((a, b) => {
        if (a.id > b.id) return 1;
        else if (a.id < b.id) return -1;
        else return 0;
      });

      setLoading(false);
      return updated;
    });

  return (
    <tr>
      <td>
        <Link href={`/todos/${item.id}`}>{item.summary}</Link>
      </td>
      <td>
        <Button small intent={item.complete ? Intent.SUCCESS : Intent.DANGER} onClick={onClick} loading={isLoading}>
          {item.complete ? 'Complete' : 'Incomplete'}
        </Button>
      </td>
      <td>
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </td>
    </tr>
  );
};

const Todos: Page = ({ domain }) => (
  <TableView
    domain={domain}
    objectType="todos"
    headings={['Summary', 'Status', 'Tags']}
    generateRowKey={(e: ReducedTodo) => e.id}
    Row={Row}
  />
);

export default Todos;

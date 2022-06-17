import { Button, Intent, Tag } from '@blueprintjs/core';
import Link from 'next/link';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

import { ReducedTodo } from 'lib/types';
import { RowProps } from 'views/TableView';

import styles from './row.module.css';

interface Props extends RowProps<ReducedTodo> {
  cacheKey?: string;
}

const TodoRow = ({ cacheKey = '/todos', item, domain }: Props): JSX.Element => {
  const { mutate } = useSWRConfig();
  const [isLoading, setLoading] = useState(false);

  const onClick = () =>
    mutate(cacheKey, async (items: ReducedTodo[] | undefined) => {
      if (items === undefined) return undefined;

      setLoading(true);
      await fetch(`https://${domain}/todos/${item.id}/toggle`, { method: 'PUT' });
      setLoading(false);

      return items;
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
          <Link key={tag} href={`/tags/${tag}`}>
            <Tag className={styles.tag}>{tag}</Tag>
          </Link>
        ))}
      </td>
    </tr>
  );
};

export default TodoRow;

import { Intent, Tag } from '@blueprintjs/core';
import Link from 'next/link';

import type { Page } from '../lib/page';
import { ReducedTodo } from '../lib/types';
import TableView, { RowProps } from '../views/TableView';

const Row = ({ item }: RowProps<ReducedTodo>): JSX.Element => (
  <tr>
    <td>
      <Link href={`/todos/${item.id}`}>{item.summary}</Link>
    </td>
    <td>
      <Tag intent={item.complete ? Intent.SUCCESS : Intent.DANGER}>{item.complete ? 'Complete' : 'Incomplete'}</Tag>
    </td>
    <td>
      {item.tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </td>
  </tr>
);

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

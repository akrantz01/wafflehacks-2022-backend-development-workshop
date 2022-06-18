import { Tag } from '@blueprintjs/core';
import Link from 'next/link';

import Status from 'components/Status';
import { ReducedTodo } from 'lib/types';
import { RowProps } from 'views/TableView';

import styles from './row.module.css';

interface Props extends RowProps<ReducedTodo> {
  invalidates?: string;
}

const TodoRow = ({ invalidates = '/todos', item }: Props): JSX.Element => (
  <tr>
    <td>
      <Link href={`/todos/${item.id}`}>{item.summary}</Link>
    </td>
    <td>
      <Status complete={item.complete} id={item.id} invalidates={invalidates} />
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

export default TodoRow;

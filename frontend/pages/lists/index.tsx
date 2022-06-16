import Link from 'next/link';

import type { Page } from '../../lib/page';
import { ReducedList } from '../../lib/types';
import TableView, { RowProps } from '../../views/TableView';

const Row = ({ item }: RowProps<ReducedList>): JSX.Element => (
  <tr>
    <td>
      <Link href={`/lists/${item.id}`}>{item.name}</Link>
    </td>
  </tr>
);

const Lists: Page = ({ domain }): JSX.Element => (
  <TableView
    domain={domain}
    objectType="lists"
    headings={['Name']}
    generateRowKey={(e: ReducedList) => e.id}
    Row={Row}
  />
);

export default Lists;

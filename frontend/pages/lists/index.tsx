import type { NextPage } from 'next';
import Link from 'next/link';

import { ReducedList } from 'lib/types';
import TableView, { RowProps } from 'views/TableView';

const Row = ({ item }: RowProps<ReducedList>): JSX.Element => (
  <tr>
    <td>
      <Link href={`/lists/${item.id}`}>{item.name}</Link>
    </td>
  </tr>
);

const Lists: NextPage = (): JSX.Element => (
  <TableView objectType="lists" headings={['Name']} generateRowKey={(e: ReducedList) => e.id} Row={Row} />
);

export default Lists;

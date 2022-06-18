import type { NextPage } from 'next';
import Link from 'next/link';

import TableView, { RowProps } from 'views/TableView';

const Row = ({ item }: RowProps<string>): JSX.Element => (
  <tr>
    <td>
      <Link href={`/tags/${item}`}>{item}</Link>
    </td>
  </tr>
);

const Tags: NextPage = (): JSX.Element => (
  <TableView objectType="tags" headings={['Name']} generateRowKey={(e: string) => e} disableCreation Row={Row} />
);

export default Tags;

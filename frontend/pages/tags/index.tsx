import Link from 'next/link';

import type { Page } from 'lib/page';
import TableView, { RowProps } from 'views/TableView';

const Row = ({ item }: RowProps<string>): JSX.Element => (
  <tr>
    <td>
      <Link href={`/tags/${item}`}>{item}</Link>
    </td>
  </tr>
);

const Tags: Page = ({ domain }): JSX.Element => (
  <TableView
    domain={domain}
    objectType="tags"
    headings={['Name']}
    generateRowKey={(e: string) => e}
    disableCreation
    Row={Row}
  />
);

export default Tags;

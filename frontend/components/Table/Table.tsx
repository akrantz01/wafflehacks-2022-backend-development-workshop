import { HTMLTable } from '@blueprintjs/core';
import { ReactNode } from 'react';

import styles from './table.module.css';

interface Props {
  headings: string[];
  children?: ReactNode;
}

const Table = ({ headings, children }: Props): JSX.Element => (
  <HTMLTable className={styles.table} striped>
    <thead>
      <tr>
        {headings.map((heading) => (
          <th key={heading} scope="col" className={styles.heading}>
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </HTMLTable>
);

export default Table;

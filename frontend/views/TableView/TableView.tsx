import {
  AnchorButton,
  Button,
  ButtonGroup,
  Card,
  Elevation,
  H2,
  Intent,
  NonIdealState,
  Spinner,
} from '@blueprintjs/core';
import Link from 'next/link';
import React, { ElementType, ReactNode } from 'react';

import Table from 'components/Table';
import useFetch from 'lib/useFetch';

import styles from './table.module.css';

interface FullRowProps {
  span: number;
  children: ReactNode;
}

const FullRow = ({ children, span }: FullRowProps): JSX.Element => (
  <tr>
    <td colSpan={span}>{children}</td>
  </tr>
);

export interface RowProps<T> {
  domain: string;
  item: T;
}

interface Props<T> {
  domain: string;
  objectType: string;
  headings: string[];
  generateRowKey: (e: T) => string | number;
  disableCreation?: boolean;
  Row: ElementType<RowProps<T>>;
}

const TableView = <T,>({
  domain,
  objectType,
  headings,
  generateRowKey,
  disableCreation,
  Row,
}: Props<T>): JSX.Element => {
  const { data, isLoading, refresh } = useFetch<T[]>(domain, '/' + objectType);

  const createButton = (
    <Link href={`/${objectType}/new`} passHref>
      <AnchorButton intent={Intent.SUCCESS} icon="plus">
        New
      </AnchorButton>
    </Link>
  );

  return (
    <Card className={styles.card} elevation={Elevation.ONE}>
      <H2 className={styles.title}>{objectType}</H2>

      <div className={styles.actions}>
        <ButtonGroup>
          <Button intent={Intent.PRIMARY} icon="refresh" onClick={refresh} loading={isLoading}>
            Refresh
          </Button>
          {!disableCreation && createButton}
        </ButtonGroup>
      </div>

      <Table headings={headings}>
        {isLoading && (
          <FullRow span={headings.length}>
            <Spinner size={50} />
          </FullRow>
        )}
        {data !== undefined && data.length === 0 && (
          <FullRow span={headings.length}>
            <NonIdealState
              title={`No ${objectType} yet!`}
              description="Get started by creating one below"
              action={createButton}
            />
          </FullRow>
        )}
        {data !== undefined && data.map((e) => <Row key={generateRowKey(e)} domain={domain} item={e} />)}
      </Table>
    </Card>
  );
};

export default TableView;

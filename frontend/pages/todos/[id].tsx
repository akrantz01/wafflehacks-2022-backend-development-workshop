import { AnchorButton, Button, Card, Classes, Elevation, H2, Intent, NonIdealState, Tag } from '@blueprintjs/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSProperties, ReactNode } from 'react';

import type { Page } from '../../lib/page';
import { Todo } from '../../lib/types';
import useFetch from '../../lib/useFetch';

interface ItemProps {
  style?: CSSProperties;
  label: string;
  children: ReactNode;
}

const Item = ({ label, children, style }: ItemProps): JSX.Element => (
  <div style={{ fontSize: 'medium', ...style }}>
    <p style={{ fontWeight: 350 }}>{label}</p>
    {children}
  </div>
);

const Skeleton = (): JSX.Element => (
  <Card style={{ margin: 'auto', width: '50%' }} elevation={Elevation.ONE}>
    <H2 className={Classes.SKELETON}>&nbsp;</H2>
    <p className={Classes.SKELETON} style={{ fontSize: 'medium' }}>
      &nbsp;
    </p>

    <div style={{ marginTop: '2rem' }}>
      <Link href="/" passHref>
        <AnchorButton intent={Intent.PRIMARY} icon="arrow-left">
          Back
        </AnchorButton>
      </Link>
    </div>
  </Card>
);

const TodoDetail: Page = ({ domain }) => {
  const { query } = useRouter();
  const { id } = query;

  const { data, isLoading, isError } = useFetch<Todo>(domain, `/todos/${id}`);

  if (isLoading) return <Skeleton />;
  if (isError || data === undefined) {
    return (
      <NonIdealState
        icon="help"
        title="Todo not found"
        description="We couldn't find a todo with that ID. Please check it is correct and try again."
      />
    );
  }

  return (
    <Card style={{ margin: 'auto', width: '50%' }} elevation={Elevation.ONE}>
      <H2 className={isLoading ? Classes.SKELETON : undefined}>{data?.summary}</H2>
      <p style={{ fontSize: 'medium' }} className={isLoading ? Classes.SKELETON : undefined}>
        {data?.description}
      </p>
      {data?.list_id && <Link href={`/lists/${data.list_id}`}>View in list</Link>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', marginTop: '1rem' }}>
        <Item label="Status" style={{ marginTop: '1rem' }}>
          <Tag intent={data?.complete ? Intent.SUCCESS : Intent.DANGER}>
            {data?.complete ? 'Complete' : 'Incomplete'}
          </Tag>
        </Item>
        <Item label="Tags" style={{ marginTop: '1rem' }}>
          {data?.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Item>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" passHref>
          <AnchorButton intent={Intent.PRIMARY} icon="arrow-left">
            Back
          </AnchorButton>
        </Link>
        <Button intent={Intent.DANGER} icon="trash">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default TodoDetail;

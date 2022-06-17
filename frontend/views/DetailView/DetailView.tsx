import { AnchorButton, Button, Card, Classes, Elevation, H2, Intent, NonIdealState } from '@blueprintjs/core';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import useFetch from 'lib/useFetch';

import styles from './detail.module.css';

interface ItemProps {
  label: string;
  children: ReactNode;
}

const Item = ({ label, children }: ItemProps): JSX.Element => (
  <div className={styles.item}>
    <p className={styles.itemLabel}>{label}</p>
    {children}
  </div>
);

interface SkeletonProps {
  hasDescription: boolean;
  fields: string[];
}

const Skeleton = ({ hasDescription, fields }: SkeletonProps): JSX.Element => {
  const router = useRouter();

  return (
    <Card className={styles.card} elevation={Elevation.ONE}>
      <H2 className={Classes.SKELETON}>Loading...</H2>
      {hasDescription && <p className={classNames(Classes.SKELETON, styles.description)}>Loading...</p>}

      <div className={styles.fields}>
        {fields.map((f) => (
          <Item key={f} label={f}>
            <p className={Classes.SKELETON}>Loading...</p>
          </Item>
        ))}
      </div>

      <div className={styles.footer}>
        <Button onClick={router.back} intent={Intent.PRIMARY} icon="arrow-left">
          Back
        </Button>
      </div>
    </Card>
  );
};

interface Field<T> {
  name: string;
  key: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (item: any) => ReactNode;
}

interface Props<T> {
  domain: string;
  titleKey: keyof T;
  descriptionKey?: keyof T;
  objectType: string;
  fields?: Field<T>[];
  children?: (item: T) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailView = <T extends Record<string, any>>({
  domain,
  titleKey,
  descriptionKey,
  objectType,
  fields = [],
  children,
}: Props<T>): JSX.Element => {
  const { query, back } = useRouter();
  const { id } = query;

  const { data, isLoading, isError } = useFetch<T>(domain, `/${objectType}s/${id}`);

  if (isLoading) {
    return <Skeleton hasDescription={descriptionKey !== undefined} fields={fields.map((f) => f.name)} />;
  }
  if (isError || data === undefined) {
    const capitalized = objectType.charAt(0).toUpperCase() + objectType.slice(1);
    return (
      <NonIdealState
        icon="help"
        title={`${capitalized} not found`}
        description="We couldn't find a todo with that ID. Please check it is correct and try again."
      />
    );
  }

  return (
    <Card className={styles.card} elevation={Elevation.ONE}>
      <H2>{data[titleKey]}</H2>
      {descriptionKey !== undefined && <p className={styles.description}>{data[descriptionKey]}</p>}

      <div className={styles.fields}>
        {fields.map((f) => (
          <Item key={f.name} label={f.name}>
            {f.render(data[f.key])}
          </Item>
        ))}
      </div>

      {children && <div className={styles.extra}>{children(data)}</div>}

      <div className={styles.footer}>
        <Button onClick={back} intent={Intent.PRIMARY} icon="arrow-left">
          Back
        </Button>
        <Button intent={Intent.DANGER} icon="trash">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default DetailView;

import { AnchorButton, Card, Classes, Elevation, H2, Intent, NonIdealState } from '@blueprintjs/core';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import BackButton from 'components/BackButton';
import DeleteButton from 'components/DeleteButton';
import { Grid, Item } from 'components/Grid';
import useFetch from 'lib/useFetch';

import { buildUrl } from '../../lib/url';
import styles from './detail.module.css';

interface SkeletonProps {
  hasDescription: boolean;
  fields: string[];
}

const Skeleton = ({ hasDescription, fields }: SkeletonProps): JSX.Element => (
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
      <BackButton />
    </div>
  </Card>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunc<T> = (item: any, id: string | number, mutate: KeyedMutator<T>) => ReactNode;

interface Field<T> {
  name: string;
  key: keyof T;
  render: RenderFunc<T>;
}

interface Props<T> {
  idKey: keyof T;
  titleKey: keyof T;
  descriptionKey?: keyof T;
  objectType: string;
  disableEdit?: boolean;
  fields?: Field<T>[];
  children?: (item: T) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailView = <T extends Record<string, any>>({
  idKey,
  titleKey,
  descriptionKey,
  objectType,
  disableEdit,
  fields = [],
  children,
}: Props<T>): JSX.Element => {
  const { query } = useRouter();
  const { id } = query;

  const { data, isLoading, isError, mutate } = useFetch<T>(`/${objectType}s/${id}`);

  if (isLoading) {
    return <Skeleton hasDescription={descriptionKey !== undefined} fields={fields.map((f) => f.name)} />;
  }
  if (isError || data === undefined) {
    const capitalized = objectType.charAt(0).toUpperCase() + objectType.slice(1);
    return (
      <NonIdealState
        icon="help"
        title={`${capitalized} not found`}
        description={`We couldn't find a ${objectType} with that ID. Please check it is correct and try again.`}
      />
    );
  }

  return (
    <Card className={styles.card} elevation={Elevation.ONE}>
      <div className={styles.heading}>
        <H2>{data[titleKey]}</H2>
        {!disableEdit && (
          <Link href={`/${objectType}s/${id}/edit`} passHref>
            <AnchorButton intent={Intent.PRIMARY} icon="edit" small style={{ maxHeight: '2rem' }}>
              Edit
            </AnchorButton>
          </Link>
        )}
      </div>
      {descriptionKey !== undefined && <p className={styles.description}>{data[descriptionKey]}</p>}

      <div className={styles.fields}>
        <Grid>
          {fields.map((f) => (
            <Item key={f.name} label={f.name}>
              {f.render(data[f.key], data[idKey], mutate)}
            </Item>
          ))}
        </Grid>
      </div>

      {children && <div className={styles.extra}>{children(data)}</div>}

      <div className={styles.footer}>
        <BackButton />
        <DeleteButton url={buildUrl(`/${objectType}s/${id}`)} />
      </div>
    </Card>
  );
};

export default DetailView;

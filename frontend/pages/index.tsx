import {
  AnchorButton,
  Button,
  ButtonGroup,
  Card,
  Elevation,
  H2,
  HTMLTable,
  Intent,
  NonIdealState,
  Tag,
} from '@blueprintjs/core';
import Link from 'next/link';

import Loading from '../components/Loading';
import type { Page } from '../lib/page';
import { ReducedTodo } from '../lib/types';
import useFetch from '../lib/useFetch';
import styles from '../styles/table.module.css';

const Todos: Page = ({ domain }) => {
  const { data, isLoading, refresh } = useFetch<ReducedTodo[]>(domain, '/todos');

  const createButton = (
    <Link href="/todos/new" passHref>
      <AnchorButton intent={Intent.SUCCESS} icon="plus">
        New
      </AnchorButton>
    </Link>
  );

  return (
    <Card style={{ margin: 'auto', width: '50%' }} elevation={Elevation.ONE}>
      <H2>Todos</H2>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <ButtonGroup>
          <Button intent={Intent.PRIMARY} icon="refresh" onClick={refresh} loading={isLoading}>
            Refresh
          </Button>
          {createButton}
        </ButtonGroup>
      </div>

      <HTMLTable className={styles.table} striped>
        <thead>
          <tr>
            <th scope="col" className={styles.heading}>
              Summary
            </th>
            <th scope="col" className={styles.heading}>
              Complete
            </th>
            <th scope="col" className={styles.heading}>
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3}>
                <Loading />
              </td>
            </tr>
          )}
          {data !== undefined && data.length === 0 && (
            <tr>
              <td colSpan={3}>
                <NonIdealState
                  title="No todos yet!"
                  description="Get started by creating one below"
                  action={createButton}
                />
              </td>
            </tr>
          )}
          {data !== undefined &&
            data.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <Link href={`/todos/${todo.id}`}>{todo.summary}</Link>
                </td>
                <td>
                  <Tag round intent={todo.complete ? Intent.SUCCESS : Intent.DANGER}>
                    {todo.complete ? 'Complete' : 'Incomplete'}
                  </Tag>
                </td>
                <td>
                  {todo.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </HTMLTable>
    </Card>
  );
};

export default Todos;

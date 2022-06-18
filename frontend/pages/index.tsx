import type { NextPage } from 'next';

import TodoRow from 'components/TodoRow';
import { ReducedTodo } from 'lib/types';
import TableView from 'views/TableView';

const Todos: NextPage = () => (
  <TableView
    objectType="todos"
    headings={['Summary', 'Status', 'Tags']}
    generateRowKey={(e: ReducedTodo) => e.id}
    Row={TodoRow}
  />
);

export default Todos;

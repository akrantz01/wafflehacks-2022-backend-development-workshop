import TodoRow from 'components/TodoRow';
import type { Page } from 'lib/page';
import { ReducedTodo } from 'lib/types';
import TableView from 'views/TableView';

const Todos: Page = ({ domain }) => (
  <TableView
    domain={domain}
    objectType="todos"
    headings={['Summary', 'Status', 'Tags']}
    generateRowKey={(e: ReducedTodo) => e.id}
    Row={TodoRow}
  />
);

export default Todos;

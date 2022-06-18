import type { NextPage } from 'next';

import { List } from 'lib/types';
import FormView from 'views/FormView';

type Input = Pick<List, 'name'> & {
  todos: string;
};

const initialValues: Input = {
  name: '',
  todos: '',
};

const New: NextPage = () => (
  <FormView
    path="/lists"
    objectType="list"
    initialValues={initialValues}
    fields={[
      { type: 'short', key: 'name', label: 'Name', required: true },
      { type: 'short', key: 'todos', label: 'Todos' },
    ]}
    transformBody={(values) => ({
      name: values.name,
      todos: values.todos.length > 0 ? values.todos.split(',').map((id) => parseInt(id.trim())) : [],
    })}
    redirectTo="/lists"
  />
);

export default New;

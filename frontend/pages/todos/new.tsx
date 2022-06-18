import type { NextPage } from 'next';

import { ListSelectInput } from 'components/inputs';
import { Todo } from 'lib/types';
import { buildUrl } from 'lib/url';
import FormView from 'views/FormView';

type Input = Pick<Todo, 'summary' | 'list_id'> & {
  description: string;
};

const initialValues: Input = {
  summary: '',
  description: '',
  list_id: null,
};

const transformer = (v: Input) => ({
  summary: v.summary,
  description: v.description.length === 0 ? null : v.description,
  list: v.list_id,
});

const New: NextPage = () => (
  <FormView
    url={buildUrl('/todos')}
    objectType="todo"
    initialValues={initialValues}
    fields={[
      { type: 'short', key: 'summary', label: 'Summary', required: true },
      {
        type: 'custom',
        key: 'list_id',
        component: (props) => <ListSelectInput label="List" {...props} />,
      },
      { type: 'long', key: 'description', label: 'Description' },
    ]}
    transformBody={transformer}
    redirectTo="/"
  />
);

export default New;

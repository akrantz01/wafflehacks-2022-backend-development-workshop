import { ListSelectInput } from 'components/inputs';
import type { Page } from 'lib/page';
import { Todo } from 'lib/types';
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

const New: Page = ({ domain }) => (
  <FormView
    url={`https://${domain}/todos`}
    objectType="todo"
    initialValues={initialValues}
    fields={[
      { type: 'short', key: 'summary', label: 'Summary', required: true },
      {
        type: 'custom',
        key: 'list_id',
        component: (props) => <ListSelectInput label="List" domain={domain} {...props} />,
      },
      { type: 'long', key: 'description', label: 'Description' },
    ]}
    transformBody={transformer}
    redirectTo="/"
  />
);

export default New;

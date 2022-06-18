import type { Page } from 'lib/page';
import { List } from 'lib/types';
import FormView from 'views/FormView';

type Input = Pick<List, 'name'> & {
  todos: number[];
};

const initialValues: Input = {
  name: '',
  todos: [],
};

const New: Page = ({ domain }) => (
  <FormView
    url={`https://${domain}/lists`}
    objectType="list"
    initialValues={initialValues}
    fields={[
      { type: 'short', key: 'name', label: 'Name', required: true },
      // TODO: figure out adding todos to a list on creation
    ]}
    redirectTo="/lists"
  />
);

export default New;
import type { NextPage } from 'next';

import { List } from 'lib/types';
import { buildUrl } from 'lib/url';
import FormView from 'views/FormView';

type Input = Pick<List, 'name'> & {
  todos: number[];
};

const initialValues: Input = {
  name: '',
  todos: [],
};

const New: NextPage = () => (
  <FormView
    url={buildUrl('/lists')}
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

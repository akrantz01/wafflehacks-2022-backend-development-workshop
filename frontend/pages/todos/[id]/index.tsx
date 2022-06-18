import type { NextPage } from 'next';
import Link from 'next/link';

import { TagsInput } from 'components/inputs';
import Status from 'components/Status';
import DetailView from 'views/DetailView';

const TodoDetail: NextPage = () => (
  <DetailView
    idKey="id"
    titleKey="summary"
    descriptionKey="description"
    objectType="todo"
    fields={[
      {
        name: 'Status',
        key: 'complete',
        render: (item: boolean, id) => <Status complete={item} id={id} invalidates={`/todos/${id}`} />,
      },
      {
        name: 'Tags',
        key: 'tags',
        render: (item: string[], id, mutate) => <TagsInput id={id} values={item} mutate={mutate} />,
      },
      {
        name: 'List',
        key: 'list_id',
        render: (item: string | null) => (
          <p style={{ fontSize: 'small' }}>{item ? <Link href={`/lists/${item}`}>View</Link> : 'N/A'}</p>
        ),
      },
    ]}
  />
);

export default TodoDetail;

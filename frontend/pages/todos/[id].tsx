import { Intent, Tag } from '@blueprintjs/core';

import type { Page } from '../../lib/page';
import DetailView from '../../views/DetailView';

const TodoDetail: Page = ({ domain }) => (
  <DetailView
    domain={domain}
    returnTo="/"
    titleKey="summary"
    descriptionKey="description"
    objectType="todo"
    fields={[
      {
        name: 'Status',
        key: 'complete',
        render: (item: boolean) => (
          <Tag intent={item ? Intent.SUCCESS : Intent.DANGER}>{item ? 'Complete' : 'Incomplete'}</Tag>
        ),
      },
      { name: 'Tags', key: 'tags', render: (item: string[]) => item.map((t) => <Tag key={t}>{t}</Tag>) },
    ]}
  />
);

export default TodoDetail;

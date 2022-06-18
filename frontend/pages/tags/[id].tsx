import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Table from 'components/Table';
import TodoRow from 'components/TodoRow';
import { Tag } from 'lib/types';
import DetailView from 'views/DetailView';

const TagDetail: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <DetailView idKey="name" titleKey="name" objectType="tag" disableEdit>
      {(item: Tag) => (
        <Table headings={['Summary', 'Complete', 'Tags']}>
          {item.todos.map((t) => (
            <TodoRow key={t.id} invalidates={`/tags/${id}`} item={t} />
          ))}
        </Table>
      )}
    </DetailView>
  );
};

export default TagDetail;

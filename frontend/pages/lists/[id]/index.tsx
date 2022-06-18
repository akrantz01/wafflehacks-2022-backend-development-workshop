import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Table from 'components/Table';
import TodoRow from 'components/TodoRow';
import { List } from 'lib/types';
import DetailView from 'views/DetailView';

const ListDetail: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <DetailView idKey="id" titleKey="name" objectType="list">
      {(item: List) => (
        <Table headings={['Summary', 'Complete', 'Tags']}>
          {item.todos.map((t) => (
            <TodoRow key={t.id} invalidates={`/lists/${id}`} item={t} />
          ))}
        </Table>
      )}
    </DetailView>
  );
};

export default ListDetail;

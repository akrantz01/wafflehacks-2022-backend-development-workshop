import { useRouter } from 'next/router';

import Table from '../../components/Table';
import TodoRow from '../../components/TodoRow';
import type { Page } from '../../lib/page';
import { List } from '../../lib/types';
import DetailView from '../../views/DetailView';

const ListDetail: Page = ({ domain }) => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <DetailView domain={domain} returnTo="/lists" titleKey="name" objectType="list">
      {(item: List) => (
        <Table headings={['Summary', 'Complete', 'Tags']}>
          {item.todos.map((t) => (
            <TodoRow key={t.id} cacheKey={`/lists/${id}`} domain={domain} item={t} />
          ))}
        </Table>
      )}
    </DetailView>
  );
};

export default ListDetail;

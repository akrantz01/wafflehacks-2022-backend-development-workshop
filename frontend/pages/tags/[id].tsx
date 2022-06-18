import { useRouter } from 'next/router';

import Table from 'components/Table';
import TodoRow from 'components/TodoRow';
import type { Page } from 'lib/page';
import { Tag } from 'lib/types';
import DetailView from 'views/DetailView';

const TagDetail: Page = ({ domain }) => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <DetailView domain={domain} titleKey="name" objectType="tag" disableEdit>
      {(item: Tag) => (
        <Table headings={['Summary', 'Complete', 'Tags']}>
          {item.todos.map((t) => (
            <TodoRow key={t.id} cacheKey={`/tags/${id}`} domain={domain} item={t} />
          ))}
        </Table>
      )}
    </DetailView>
  );
};

export default TagDetail;

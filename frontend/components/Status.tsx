import { Button, Intent } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';

import { buildUrl } from '../lib/url';

interface Props {
  complete: boolean;
  domain: string;
  id: string | number;
  invalidates?: string;
}

const Status = ({ complete, domain, id, invalidates = '/todos' }: Props): JSX.Element => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const onClick = () =>
    mutate(invalidates, async (items: never) => {
      setLoading(true);
      await fetch(buildUrl(domain, `/todos/${id}/toggle`), { method: 'PUT' });
      setLoading(false);

      return items;
    });

  return (
    <Button small intent={complete ? Intent.SUCCESS : Intent.DANGER} onClick={onClick} loading={loading}>
      {complete ? 'Complete' : 'Incomplete'}
    </Button>
  );
};

export default Status;

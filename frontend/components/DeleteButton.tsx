import { Button, Intent } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { buildUrl } from '../lib/url';

interface Props {
  path: string;
}

const DeleteButton = ({ path }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await fetch(buildUrl(path), { method: 'DELETE' });
    setLoading(false);

    await router.back();
  };

  return (
    <Button intent={Intent.DANGER} icon="trash" onClick={onClick} loading={loading}>
      Delete
    </Button>
  );
};

export default DeleteButton;

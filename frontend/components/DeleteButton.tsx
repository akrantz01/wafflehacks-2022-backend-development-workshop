import { Button, Intent } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  url: string;
}

const DeleteButton = ({ url }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await fetch(url, { method: 'DELETE' });
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

import { Button, Intent } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React from 'react';

const BackButton = (): JSX.Element => {
  const router = useRouter();

  return (
    <Button onClick={router.back} intent={Intent.PRIMARY} icon="arrow-left">
      Back
    </Button>
  );
};

export default BackButton;

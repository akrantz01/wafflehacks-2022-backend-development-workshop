import { Button, NonIdealState } from '@blueprintjs/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <NonIdealState
      icon="help"
      title="Page not found"
      description="The page you are looking for couldn't be found. Please check it is correct and try again."
      action={<Button onClick={router.back}>Go back</Button>}
    />
  );
};

export default NotFound;

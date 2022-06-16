import { AnchorButton, NonIdealState } from '@blueprintjs/core';
import type { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => (
  <NonIdealState
    icon="help"
    title="Page not found"
    description="The page you are looking for couldn't be found. Please check it is correct and try again."
    action={
      <Link href="/" passHref>
        <AnchorButton>Return Home</AnchorButton>
      </Link>
    }
  />
);

export default NotFound;

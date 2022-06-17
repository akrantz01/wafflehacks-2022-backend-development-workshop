import {
  Alignment,
  AnchorButton,
  Classes,
  InputGroup,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [domain, setDomain] = useState('wafflehacks-fullstack-workshop-production.up.railway.app');

  return (
    <>
      <Head>
        <title>WaffleHacks Todo List</title>
        <meta
          name="description"
          content="A UI for testing the todo list API from the WaffleHacks 2022 backend development workshop"
        />
      </Head>

      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>WaffleHacks Todo List</NavbarHeading>
          <NavbarDivider />
          <Link href="/" passHref>
            <AnchorButton className={Classes.MINIMAL} icon="properties">
              Todos
            </AnchorButton>
          </Link>
          <Link href="/lists" passHref>
            <AnchorButton className={Classes.MINIMAL} icon="list">
              Lists
            </AnchorButton>
          </Link>
          <Link href="/tags" passHref>
            <AnchorButton className={Classes.MINIMAL} icon="tag">
              Tags
            </AnchorButton>
          </Link>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <InputGroup
            placeholder="Domain"
            style={{ width: '200%', marginLeft: '-100%' }}
            fill
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </NavbarGroup>
      </Navbar>

      <main style={{ paddingTop: '3rem' }}>
        <Component {...pageProps} domain={domain} />
      </main>
    </>
  );
};

export default App;

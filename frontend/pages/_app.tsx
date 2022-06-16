import { Alignment, AnchorButton, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>WaffleHacks Todo List</title>
      <meta
        name="description"
        content="A UI for testing the todo list API from the WaffleHacks 2022 backend development workshop"
      />
      <link rel="icon" href="/favicon.ico" />
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
    </Navbar>

    <main style={{ paddingTop: '3rem' }}>
      <Component {...pageProps} />
    </main>
  </>
);

export default App;

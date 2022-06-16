import type { NextPage } from 'next';

interface PageProps {
  domain: string;
}

export type Page = NextPage<PageProps>;

import useSWR, { KeyedMutator } from 'swr';

import { buildUrl } from './url';

class FetchError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetcher = (domain: string) => async (path: string, init: RequestInit) => {
  const response = await fetch(buildUrl(domain, path), init);
  const body = await response.json();

  if (response.ok) return body;
  else throw new FetchError(body.message, response.status);
};

interface Response<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isError: boolean;
  refresh: () => void;
  mutate: KeyedMutator<T>;
}

const useFetch = <T>(domain: string, path: string): Response<T> => {
  const { data, error, mutate } = useSWR<T, Error>(path, fetcher(domain));

  return {
    data,
    error,
    isLoading: !data && !error,
    isError: !!error,
    refresh: () => mutate(),
    mutate,
  };
};

export default useFetch;

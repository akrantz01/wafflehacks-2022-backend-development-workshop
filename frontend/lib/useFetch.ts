import useSWR from 'swr';

const fetcher = (domain: string) => (path: string, init: RequestInit) =>
  fetch(`https://${domain}${path}`, init).then((res) => res.json());

interface Response<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isError: boolean;
  refresh: () => void;
}

const useFetch = <T>(domain: string, path: string): Response<T> => {
  const { data, error, mutate } = useSWR<T, Error>(path, fetcher(domain));

  return {
    data,
    error,
    isLoading: !data && !error,
    isError: !!error,
    refresh: () => mutate(),
  };
};

export default useFetch;

import useSWR from 'swr';

const fetcher = (input: RequestInfo, init: RequestInit) => fetch(input, init).then((res) => res.json());

interface Response<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isError: boolean;
  refresh: () => void;
}

const useFetch = <T>(domain: string, path: string): Response<T> => {
  const { data, error, mutate } = useSWR<T, Error>(`https://${domain}${path}`, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
    isError: !!error,
    refresh: () => mutate(),
  };
};

export default useFetch;

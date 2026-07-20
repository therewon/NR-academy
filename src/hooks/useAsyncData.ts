import { useEffect, useState } from 'react';

interface UseAsyncDataState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function useAsyncData<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<UseAsyncDataState<T>>({
    data: undefined,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetcher()
      .then((data) => {
        if (isMounted) setState({ data, isLoading: false, error: null });
      })
      .catch((error: Error) => {
        if (isMounted) setState({ data: undefined, isLoading: false, error });
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return state;
}

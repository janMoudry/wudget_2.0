import { useEffect, useState } from "react";

const useFetch = <T, P>(
  endpoint: (params: P | null) => T,
  params: P | null = null
): {
  isLoading: boolean;
  isFetching: boolean;
  data: T extends Promise<infer U> ? U : T | null;
  error: unknown;
  isData: boolean;
  refetch: () => void;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<T extends Promise<infer U> ? U : T | null>(
    null as T extends Promise<infer U> ? U : T | null
  );
  const [error, setError] = useState<unknown>(null);

  const depArray = params ? [params] : [];

  const refetch = async () => {
    setIsLoading(true);
    setIsFetching(true);

    const res = (await endpoint(params)) as T extends Promise<infer U> ? U : T;

    setData(res);
    setIsLoading(false);
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsFetching(true);

      try {
        const res = (await endpoint(params)) as T extends Promise<infer U>
          ? U
          : T;

        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    fetchData();

    return () => {
      setIsLoading(false);
      setIsFetching(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, ...depArray]);

  return {
    isLoading,
    isFetching,
    data,
    isData: !!data,
    error,
    refetch,
  };
};

export default useFetch;

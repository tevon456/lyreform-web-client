import { useEffect } from "react";
import { useRender } from ".";
import useRestResponse from "./useRestResponse";

/**
 * A hook for calling apis
 * @param apiCall - async axios or fetch function
 * @param initial - initial data to use before api returns data
 */
function useAPI(apiCall = async () => {}, initial) {
  const [watch, refetch] = useRender();
  const { data, setData, loading, setLoading, error, setError } =
    useRestResponse(initial);

  useEffect(() => {
    apiCall()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return { loading, data, error, refetch, setData };
}

export default useAPI;

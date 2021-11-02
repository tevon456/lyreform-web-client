import { useState, useEffect } from "react";

/**
 * A hook for handling rest responses
 * @param initial - initial data to set data as
 */
function useRestResponse(initial) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, setLoading, data, setData, error, setError };
}

export default useRestResponse;

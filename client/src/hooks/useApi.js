import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { HTTP_CONSTANTS } from '../utils/constants';

export function useApi(url, method = HTTP_CONSTANTS.GET, params, invokeOnLoad = true) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setError(error);
    setLoading(false);
  }

  const handleSuccess = (res) => {
    setData(res.data);
    setLoading(false);
  }

  const callApi = useCallback((params, payload, id) => {
    const URL = id ? `${url}/${id}` : url;
    setLoading(true);
    axios.request({
      url: URL,
      method,
      params: params,
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: HTTP_CONSTANTS.TIMEOUT
    }).then(handleSuccess).catch(handleError)
  }, [url]);

  useEffect(() => {
    if (method === HTTP_CONSTANTS.GET && invokeOnLoad) {
      callApi();
    }
  }, [callApi]);

  return { data, loading, error, refetch: callApi }
}
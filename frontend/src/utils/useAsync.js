import React from 'react';

export const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  status: Status.IDLE,
};

export function useAsync() {
  const [{ status, data, error }, setState] = React.useState(initialState);

  async function run(promise) {
    setState({ status: Status.LOADING, error: null });

    try {
      const data = await promise;

      setState({ status: Status.SUCCESS, data });
    } catch (error) {
      setState({ status: Status.ERROR, error });
    }
  }

  function reset() {
    setState(initialState);
  }

  return {
    status,
    data,
    error,
    run,
    reset,
  };
}

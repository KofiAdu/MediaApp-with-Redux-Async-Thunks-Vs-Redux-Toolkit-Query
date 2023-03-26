import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

//creating a custom hooks to use my thunks
//takes a thunk as a parameter
function useThunk(thunk) {
  //creaing states to use fetchUsers thunk
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //calling dispatch to be able to use the thunks
  const dispatch = useDispatch();

  //running thunk
  //warp in a useCallback
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

export { useThunk };

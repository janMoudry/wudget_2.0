import { useState } from "react";

const useBooleanState = (
  initialState: boolean
): [
  boolean,
  () => void,
  {
    setTrue: () => void;
    setFalse: () => void;
  }
] => {
  const [state, setState] = useState(initialState);

  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  const switchState = () => setState((prevState) => !prevState);

  return [
    state,
    switchState,
    {
      setTrue,
      setFalse,
    },
  ];
};

export default useBooleanState;

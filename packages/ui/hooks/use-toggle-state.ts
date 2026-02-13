import { useState } from "react";

type ToggleStateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useToggleState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const close = () => {
    setState(false);
  };

  const open = () => {
    setState(true);
  };

  const toggle = () => {
    setState((prev) => !prev);
  };

  const toggleStateReturn = [state, open, close, toggle] as ToggleStateType;
  toggleStateReturn.state = state;
  toggleStateReturn.open = open;
  toggleStateReturn.close = close;
  toggleStateReturn.toggle = toggle;
  return toggleStateReturn;
};

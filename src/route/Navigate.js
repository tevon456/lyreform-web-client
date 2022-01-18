import { useHistory } from "react-router-dom";
import React from "react";

export default function Navigate({ to, rest }) {
  const history = useHistory();
  history.push(to);
  return <></>;
}

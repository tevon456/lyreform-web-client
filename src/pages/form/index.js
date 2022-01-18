import React from "react";
import { Switch } from "react-router-dom";
import { useNavbar } from "../../hooks";
import { ProtectedRoute } from "../../route";
import { FormNavigation } from "./components";

export default function Form() {
  useNavbar(false);
  return (
    <main>
      <FormNavigation />
      <Switch>
        <ProtectedRoute exact path="/" component={<div>ddddddddd</div>} />
      </Switch>
    </main>
  );
}

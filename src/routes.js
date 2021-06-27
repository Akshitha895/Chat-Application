import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ChatApp from "./app/containers/ChatApp";

function Routes() {
  return (
    <Suspense>
      <Switch>
        {/* Route without auth, basically the default page of application which renders chat application */}
        <Route exact path="/" component={ChatApp} />
      </Switch>
    </Suspense>
  );
}

export default Routes;

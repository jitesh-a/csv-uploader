import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ExistingUploads from './screens/ExistingUploads';
import GetStarted from './screens/GetStarted';
import Home from './screens/Home';
import ViewData from './screens/ViewData';

function Routes() {
  return (
    <Switch>
      <Route path="/get-started">
        <GetStarted />
      </Route>
      <Route path="/existing-uploads">
        <ExistingUploads />
      </Route>
      <Route path="/view-data/:id">
        <ViewData />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes;
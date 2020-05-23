import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Payments from '../pages/Payments';
import Students from '../pages/Students'


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/pagamentos" component={Payments} isPrivate />
      <Route path="/alunos" component={Students} isPrivate />

      <Route path="/" component={() => <h1>404 - Page not found</h1>} />
    </Switch>
  );
}
/* Libraries */
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from "react-router-dom";

/* Components */
import { LoginPage } from './Pages/LoginPage'
import { MapPage } from './Pages/MapPage'

/* Redux */
import store from './StateManagement/store'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/map" component={MapPage} />
        </Switch>
      </BrowserRouter>
    </Provider> 
  );
}

export default App;

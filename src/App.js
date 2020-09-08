import React from 'react';
import { Provider } from 'react-redux';

import { MapComponent } from './Map/MapComponent'
import store from './StateManagement/store'


function App() {
  return (
    <Provider store={store}>
      <MapComponent/>
    </Provider> 
  );
}

export default App;

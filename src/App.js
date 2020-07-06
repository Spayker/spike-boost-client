import React from 'react';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './components/common/navigator/appNavigator';

console.disableYellowBox = true;

const AppContainer = createAppContainer(AppNavigator); 

class App extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
          <AppContainer/>
      );
    }
}


export default App;
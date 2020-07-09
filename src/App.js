import React from 'react';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './components/common/navigator/appNavigator';

console.disableYellowBox = true;

// Main app container is going to be created with AppNavigator component which defines all available 
// screens in app
const AppContainer = createAppContainer(AppNavigator); 

/**
 * Main app component from where everything begins.
 * Renders just one AppContainer component with predefined AppNavigator
 */
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
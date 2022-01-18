import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import Theme from './Theme';
import './global.css';
import './App.css';

class App extends React.Component {

  render () {
    return(
      <ThemeProvider theme={Theme}>
        <div id="app">
          <Routes />
        </div>
      </ThemeProvider> 
    )
}
}

export default App;

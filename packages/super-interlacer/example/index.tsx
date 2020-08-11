import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SuperInterlacer from '../src/index';

const App = () => {
  return <SuperInterlacer />;
};

ReactDOM.render(<App />, document.getElementById('root'));

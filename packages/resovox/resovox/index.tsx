import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Resovox from '../src';

const App = () => {
  return (
    <div>
      <Resovox />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

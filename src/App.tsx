import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/home';
import './App.css';
import './style/resetAntd.scss';

function App() {
  return (
    <Suspense>
      <Router>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;

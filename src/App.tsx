import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './views/home/index';
import './App.less';
import './style/resetAntd.less';

function App() {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router>
        <Switch>
            <Route path="/" component={home} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;

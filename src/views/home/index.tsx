import React, { useState, useEffect } from 'react';
import './index.scss';
import Logo from '../../static/img/logo.png';
import Claim from './../claim';
import Template from './../template';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { moduleActive } from '../../store/atom';
import { useRecoilState } from 'recoil';

export default function Home(props: RouteComponentProps) {

  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  useEffect(() => {
    setComp(props.location.pathname);
  }, []);

  const routerTo = (str: string) => {
    props.history.push(`/${str}`);
    setComp(str);
  };

  const setComp = (str: string) => {
    if (str.includes('template')) {
      setActiveTabStr('templateList')
    } else {
      setActiveTabStr('claimList')
    }
  };

  return (
    <div className="page-home">
      <div className="page-left-content">
        <div className="page-left-content-info">
          <div className="page-left-content-info-head">
            <img src={Logo} alt=""></img>
          </div>
          <div>
            <div className="page-left-content-info-name">
              KNN3 Network
            </div>
            <div className="page-left-content-info-email">
              account@knn3.xyz
            </div>
          </div>
        </div>
        <div className="page-left-router">
          <div onClick={() => routerTo('template')} className={props.location.pathname === '/template' || props.location.pathname === '/' ? 'active' : ''}>
            Template
          </div>
          <div onClick={() => routerTo('claim')} className={props.location.pathname === '/claim' ? 'active' : ''}>Claim</div>
        </div>
      </div>
      <div className="page-right-content" key={props.location.key}>
        <Router>
          <Switch>
            <Route path="/claim" component={Claim} />
            <Route path="/template" component={Template} />
            <Redirect to="/template" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

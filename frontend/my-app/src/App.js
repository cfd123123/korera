import React, { Component } from 'react';
import logo from './logo.svg';
import SideBar from './components/SideBar/SideBar'
import Help from './components/Help'
import { BrowserRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link, Switch, Redirect,  withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import asyncComponent from './hoc/asyncComponent';
import * as actions from './store/antions/index';


const AsyncResource = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./containers/Resource/Resource'); //import: dynamic import, we import the url here rather than at the beginning of component. 
});

const AsyncProject = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./containers/Project/Project'); //import: dynamic import, we import the url here rather than at the beginning of component. 
});

const AsyncLogin = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./containers/Login/Login'); //import: dynamic import, we import the url here rather than at the beginning of component. 
});


const AsyncHelp = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./components/Help');
});


const AsyncSignup = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./containers/Login/Signup');
});

const AsyncLogout = asyncComponent(() => {  //asyncComponent is higher order component because the parameter is a function.
  return import('./containers/Login/LogOut');
});


class App extends Component {
  componentDidMount () {
    /*
    console.log("-----------------------------------------");
    console.log(this.props);
    this.props.onTryAutoSignup();            //checkTimeExpiration
    */
  }
  render () {
    let routes = (
      <Switch>
        <Route exact path = "/login"  component = {AsyncLogin} />
        <Route exact path = "/help"  component = {AsyncHelp} /> 
        <Route exact path = "/signup"  component = {AsyncSignup} /> 
        <Redirect to="/" />
      </Switch>
    );
    if(localStorage.getItem('token') !== null) {
        routes = (
          <Switch>
                <Route exact path="/resource" component={AsyncResource} />
                <Route exact path="/project" component={AsyncProject} />
                <Route exact path="/logout" component={AsyncLogout} />  
                {/* <Redirect to="/" /> */}
          </Switch>
        )   
    }
    return (
      <BrowserRouter>
        <div className="App">
          <SideBar />
        </div>
          {routes} 
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

/*
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};
*/

export default withRouter( connect(  mapStateToProps, null )( App ) );

//export default App;

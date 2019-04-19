import React, { Component } from 'react';
import Books from './components/Books';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';
import 'react-bootstrap';
import {BrowserRouter as Router , Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <ToastContainer/>
      <Route exact path="/" component={SignUp}/>
      <Route exact path="/login" component={Login}/>
      <PrivateRoute exact path="/addBook" component={AddBook}/>
      <PrivateRoute exact path="/showBook" component={Books}/>
      <PrivateRoute exact path="/updateBook/:id" component={UpdateBook}/>
      </div>
      </Router>
    );
  }
}

export default App;

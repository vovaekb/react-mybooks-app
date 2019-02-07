import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css'
import BooksStore from './BooksStore';
import Search from './components/Search';
import Index from './components/Index';

const store = new BooksStore();

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={() => <Index store={store}/>} />
          <Route path="/search" component={() => <Search store={store}/>} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default BooksApp

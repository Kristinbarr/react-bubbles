import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className='App'>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/protected' component={BubblePage} />
        {/* Build a PrivateRoute component that will display BubblePage when you're authenticated */}
        <div className='nav'>
          <Link to='/login'>Login</Link><br/>
          <Link to='/protected'>Protected Page</Link>
        </div>
      </div>
    </Router>
  )
}

export default App;

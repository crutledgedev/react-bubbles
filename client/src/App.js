import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

import Login from "./components/Login";
import PrivateRoute from './utils/PrivateRoute';
import BubblePage from './components/BubblePage';
import "./styles.scss";




function App() {
  return (
    <Router>
      <div className="App">
        
          {/* <div>
            <NavLink to="/login">Login</NavLink>
          
          
            <NavLink to="/protected">Protected Page</NavLink>
            </div> */}
        
        <Switch>
          <PrivateRoute path="/bubblepage" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;



















// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Route exact path="/" component={Login} />
//         {/* 
//           Build a PrivateRoute component that will 
//           display BubblePage when you're authenticated 
//         */}
//       </div>
//     </Router>
//   );
// }

// export default App;

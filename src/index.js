import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { RouteTag, AuthProvider, User } from './Context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <User>
        <AuthProvider>
          <RouteTag>
            <App />
          </RouteTag>
        </AuthProvider>
      </User>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

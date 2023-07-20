import React from 'react';
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Billing from './POS/Billing/Billing';
import Header from './POS/Header/Header';
import Dashboard from './POS/Dashboard/Dashboard';

const DefaultLayout = ({ children }) => (
  <div className="default-layout">
    <Header/>
    {children}
    
  </div>
);
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route  path='/pos-billing' element={<DefaultLayout><Billing/></DefaultLayout>}/>
          <Route path="*" element={<h1 style={{ marginTop: "5rem" }}>404 Not Found</h1>} />
          <Route path='/dashboard' element={<DefaultLayout><Dashboard/></DefaultLayout>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

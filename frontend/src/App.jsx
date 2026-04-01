import { BrowserRouter as Routes, Route, Router } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }/>

        <Route path="/projects/:id"
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }/>
        </Routes>
    </Router>
  );
}

export default App;

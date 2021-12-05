import logo from './logo.svg';
import './App.css';

import ApplicationList, {} from "./Components/applicationList";
import Login from './Components/login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login></Login>} />
        <Route exact path="/applications" element={<ApplicationList></ApplicationList>}/>
      </Routes>
    </Router>
  );
}

export default App;

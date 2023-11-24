
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from './store/userCredentials';
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from './pages/Dashboard';
function App() {
  return (
  <>
   <UserState>
  <BrowserRouter>
  <Routes>
   
      <Route index element ={<Login />} />
      <Route path='/dashboard' element= {<Dashboard />} />
      <Route path="*" element={<NoPage />} />
    
  </Routes>
  </BrowserRouter>
  </UserState>
  </>
  );
}

export default App;

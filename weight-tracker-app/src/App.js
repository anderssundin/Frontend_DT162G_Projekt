
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from './store/userCredentials';
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from './pages/Dashboard';
import AllLogs from './pages/AllLogs';
import NewWeight from './pages/NewWeight';
import MyAccount from './pages/MyAccount';
import Signup from './pages/Signup';
function App() {
  return (
  <>
   <UserState>
  <BrowserRouter>
  <Routes>
   
      <Route index element ={<Login />} />
      <Route path='/signup' element= {<Signup />} />
      <Route path='/dashboard' element= {<Dashboard />} />
      <Route path='/account' element= {<MyAccount />} />
      <Route path='/all-logs' element= {<AllLogs />} />
      <Route path='/new-weight' element= {<NewWeight />} />
      <Route path="*" element={<NoPage />} />
    
  </Routes>
  </BrowserRouter>
  </UserState>
  </>
  );
}

export default App;

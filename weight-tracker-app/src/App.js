
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
   
      <Route index element ={<Login />} />
      <Route path="*" element={<NoPage />} />
    
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

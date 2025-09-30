import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';
import Principal from './pages/Principal';

const Rotas = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Routes>
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/principal" element={<Principal/>} />
            <Route path="/" element={<Home/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
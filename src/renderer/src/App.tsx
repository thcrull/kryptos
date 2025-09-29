import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Vault from "./pages/Vault/Vault";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

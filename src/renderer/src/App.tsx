import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Vault from "./pages/Vault/Vault";
import AppLayout from "./layout/AppLayout";
import Register from "./pages/Register/Register";
import Locked from "./pages/Locked/Locked";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Locked />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vault" element={<Vault />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;

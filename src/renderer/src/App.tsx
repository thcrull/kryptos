import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Vault from "./pages/Vault/Vault";
import AppLayout from "./layout/AppLayout";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vault" element={<Vault />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;

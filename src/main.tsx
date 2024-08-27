import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from '../src/pages/Layout/layout';
import SignInRegister from "./pages/SignInRegisterPage/SignInRegisterPage";
import { AppProvider } from "./contexts/AppContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <AppProvider>
          <Routes>
            {/* <Route index element={<SignUp />}></Route> */}
            <Route path="/" element={<Layout />}>
              <Route path="/register" element={<SignInRegister reg={true} />}></Route>
              <Route path="/login" element={<SignInRegister reg={false} />}></Route>
              {/* <Route path="/home" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/transactions" element={<Transactions />}></Route> */}
            </Route>
          </Routes>
      </AppProvider>
      </BrowserRouter>
  </StrictMode>
)

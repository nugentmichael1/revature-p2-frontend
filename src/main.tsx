import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from '../src/pages/Layout/layout';
import Discussion from "./components/Discussions/Discussion";
import DiscussionBoard from "./components/Discussions/DiscussionBoard";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            {/* <Route index element={<SignUp />}></Route> */}
            <Route path="/discussion" element={<DiscussionBoard />}>
              {/* <Route path="/home" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/transactions" element={<Transactions />}></Route> */}
            </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>
)

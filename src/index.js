import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";

import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";

import Join from "./pages/Join";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Routing from './pages/Routing'
import ConfirmEmail from "./pages/ConfirmEmail";
import PinPage from "./pages/PinPage";


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route exact path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="searchresults" element={<SearchResults />} />

            <Route path="join" element={<Join />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>

            <Route path="onboarding" element={<Onboarding />}></Route>
            <Route path="pinpage" element={<PinPage />}></Route>
            <Route path="routing" element={<Routing />}></Route>
            <Route path="confirmEmail" element={<ConfirmEmail />}></Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

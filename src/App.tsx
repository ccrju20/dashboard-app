import React from "react";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import MainDash from "./MainDash";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Users from "./components/Users/Users";
import Main from "./components/MainPage/MainPage";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainDash />}>
            <Route path="/" element={<Main />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

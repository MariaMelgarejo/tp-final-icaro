import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Store from "./pages/Store";

import "./App.css";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="registro" element={<Register />} />
                        <Route path="tienda" element={<Store />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

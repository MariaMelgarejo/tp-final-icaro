import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Store from "./pages/Store";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wish from "./pages/Wish";

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
                        <Route
                            path="tienda/producto/:id"
                            element={<Product />}
                        />
                        <Route path="contacto" element={<Contact />} />
                        <Route path="favoritos" element={<Wish />} />
                        <Route path="carrito" element={<Cart />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

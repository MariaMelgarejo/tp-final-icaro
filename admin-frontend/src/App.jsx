import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Client from "./pages/Client";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="categorias" element={<Category />} />
                    <Route path="productos" element={<Product />} />
                    <Route path="clientes" element={<Client />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

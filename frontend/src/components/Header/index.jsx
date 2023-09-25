import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import useEcommerceStore from "../../stores/ecommerceStore";
import "./styles.css";

import CartImg from "../../assets/images/cart.svg";
import WishListImg from "../../assets/images/wishlist.svg";

const Header = () => {
    const auth = JSON.parse(localStorage.getItem("authStore"));
    const { user, logout, isLoggedIn } = useAuthStore((state) => {
        return {
            user: state.user,
            logout: state.logout,
            isLoggedIn: state.isLoggedIn,
        };
    });
    const { categories, getCategories } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
        };
    });

    const catRef = useRef(categories);

    const navigate = useNavigate();
    useEffect(() => {
        if (user == null || !isLoggedIn) {
            navigate("/");
        }
    }, [user, isLoggedIn]);

    useEffect(() => {
        getCategories();
    }, [catRef.current]);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">
                        M&D-Ecommerce
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-lg-5 me-auto mb-2 mb-lg-0 gap-15">
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white active"
                                    aria-current="page"
                                    href="/"
                                >
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white"
                                    href="/store"
                                >
                                    Tienda
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link text-white dropdown-toggle bg-transparent border-0"
                                    href="#"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span className="me-4">Categorías</span>
                                </button>
                                <ul className="dropdown-menu">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className="dropdown-item"
                                        >
                                            <Link
                                                className="text-white"
                                                to={`/tienda/categorias/${category.title
                                                    .replace(/\s+/g, "")
                                                    .toLowerCase()}`}
                                            >
                                                {category.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white"
                                    href="/contacto"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2 px-3"
                                type="search"
                                placeholder="Buscar..."
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success pe-lg-5"
                                type="submit"
                            >
                                Buscar
                            </button>
                        </form>
                        {auth.state.user ? (
                            <div className="d-flex justify-content-between align-items-center ms-lg-2 mt-lg-0 mt-3">
                                <div className="ms-lg-3 me-lg-4">
                                    <Link
                                        to="/favoritos"
                                        className="d-flex justify-content-around align-items-center gap-2 text-white"
                                    >
                                        <img
                                            src={WishListImg}
                                            alt="favoritos"
                                        />
                                        <p className="mb-0">Favoritos</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/carrito"
                                        className="d-flex align-items-center gap-2 text-white me-lg-2"
                                    >
                                        <img src={CartImg} alt="carrito" />
                                        <div className="d-flex flex-column">
                                            <span className="badge bg-white text-dark">
                                                0
                                            </span>
                                            <p className="mb-0">$ 500</p>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-danger ms-lg-4 mb-0"
                                        onClick={logout}
                                    >
                                        Salir
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-outline-warning ms-lg-2 mt-lg-0 mt-3"
                                type="submit"
                            >
                                Iniciar Sesión / Registrarse
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

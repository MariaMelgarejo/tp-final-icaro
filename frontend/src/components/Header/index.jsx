import { useEffect, useRef, useState } from "react";
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
    const {
        categories,
        getCategories,
        cart,
        getCart,
        cartQuantity,
        setCartQuantity,
    } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
            cart: state.cart,
            getCart: state.getCart,
            cartQuantity: state.cartQuantity,
            setCartQuantity: state.setCartQuantity,
        };
    });

    const catRef = useRef(categories);
    const cartRef = useRef(cart);

    const navigate = useNavigate();
    useEffect(() => {
        if (user == null || !isLoggedIn) {
            navigate("/");
        }
    }, [user, isLoggedIn]);

    useEffect(() => {
        getCategories();
        getCart();
    }, [catRef.current, cartRef.current]);

    useEffect(() => {
        let quantity = 0;
        if (cart.length !== 0 && cart.message !== "El carrito no existe") {
            let products = JSON.parse(cart.products);
            products.map((product) => {
                quantity += product.quantity;
            });
            setCartQuantity(quantity);
        }
    }, [cart]);

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
                                <Link
                                    className="nav-link text-white active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="tienda"
                                >
                                    Tienda
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link text-white dropdown-toggle bg-transparent border-0"
                                    id="categoriesDropdown"
                                    href="#"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <span className="me-4">Categorías</span>
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="categoriesDropdown"
                                >
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
                                <Link
                                    className="nav-link text-white"
                                    to="contacto"
                                >
                                    Contacto
                                </Link>
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
                                className="btn btn-outline-success pe-lg-5 mb-0"
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
                                                {cartQuantity}
                                            </span>
                                            <p className="mb-0">
                                                ${" "}
                                                {cart.totalPrice
                                                    ? cart.totalPrice
                                                    : 0}
                                            </p>
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
                                className="btn btn-outline-warning ms-lg-2 mt-lg-0 mt-3 mb-0"
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

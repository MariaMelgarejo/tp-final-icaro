import { Link } from "react-router-dom";
import "./styles.css";

import CartImg from "../../assets/images/cart.svg";
import WishListImg from "../../assets/images/wishlist.svg";

const Header = () => {
    const auth = JSON.parse(localStorage.getItem("authStore"));

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
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Something else here
                                        </a>
                                    </li>
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
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Buscar
                            </button>
                        </form>
                        {auth.state.user ? (
                            <div className="d-flex justify-content-between align-items-center ms-xxl-2 mt-xxl-0 mt-3">
                                <div className="ms-xxl-3 me-xxl-4">
                                    <Link
                                        to="/favoritos"
                                        className="d-flex justify-content-around align-items-center gap-10 text-white"
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
                                        className="d-flex align-items-center gap-10 text-white"
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
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-outline-warning ms-xxl-2 mt-xxl-0 mt-3"
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

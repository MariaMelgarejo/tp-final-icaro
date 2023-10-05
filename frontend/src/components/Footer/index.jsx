import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import "./styles.css";

import NewsletterImg from "../../assets/images/newsletter.png";

const Footer = () => {
    return (
        <div className="">
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-md-12">
                            <div className="footer-top-data d-flex gap-30 align-items-center">
                                <img src={NewsletterImg} alt="" />
                                <h2 className="mb-0 text-white">
                                    Suscribite al newsletter
                                </h2>
                            </div>
                        </div>
                        <div className="col-xl-7 col-md-12 mt-xxl-0 mt-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control px-3"
                                    placeholder="Ingresa tu email"
                                    aria-describedby="basic-addon2"
                                />
                                <span
                                    className="input-group-text p-3"
                                    id="basic-addon2"
                                >
                                    Suscribirse
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-around align-items-center">
                        <div className="col-xl-6 col-md-12 px-5 d-flex flex-column align-items-center">
                            <h4 className="text-white">Contacto</h4>
                            <div>
                                <address className="text-white fs-6">
                                    Av. Ricardo Balbin 1234 <br />
                                    San Miguel, Buenos Aires <br />
                                    CP: 1663
                                </address>
                                <a
                                    className="text-white mb-2 d-block"
                                    href="tel:+5491111001100"
                                >
                                    +54 9 11-1100-1100
                                </a>
                                <a
                                    className="text-white"
                                    href="mailto:info@tech-solutions.com.ar"
                                >
                                    info@md-ecommerce.com.ar
                                </a>
                                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                                    <a className="text-white" href="">
                                        <BsInstagram className="fs-4" />
                                    </a>
                                    <a className="text-white" href="">
                                        <BsFacebook className="fs-4" />
                                    </a>
                                    <a className="text-white" href="">
                                        <BsTwitter className="fs-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12 px-5 mt-xxl-0 mt-5 d-flex flex-column align-items-center">
                            <h4 className="text-white">Cuenta</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white mb-1 py-2">
                                    Mi Cuenta
                                </Link>
                                <Link className="text-white mb-1 py-2">
                                    Mis Favoritos
                                </Link>
                                <Link
                                    to="ordenes"
                                    className="text-white mb-1 py-2"
                                >
                                    Mis Compras
                                </Link>
                                <Link className="text-white mb-1 py-2">
                                    Salir
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy; {new Date().getFullYear()} Hecho por
                                Melgarejo & Paduani
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

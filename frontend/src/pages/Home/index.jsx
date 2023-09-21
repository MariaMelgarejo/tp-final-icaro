import { Link } from "react-router-dom";
import MainBanner from "../../assets/images/main-banner.jpg";
import CatBanner01 from "../../assets/images/catbanner-01.jpg";
import CatBanner02 from "../../assets/images/catbanner-02.jpg";
import CatBanner03 from "../../assets/images/catbanner-03.jpg";
import CatBanner04 from "../../assets/images/catbanner-04.jpg";
import "./styles.css";

const Home = () => {
    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="main-banner position-relative">
                                <img
                                    src={MainBanner}
                                    alt="main-banner"
                                    className="img-fluid rounded-3"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>MÚSICA EN ALTA CALIDAD</h4>
                                    <h5 className="d-none d-lg-block">
                                        Oferta Especial
                                    </h5>
                                    <p className="mb-0">A sólo $10.000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="d-flex flex-wrap gap-15 justify-content-between align-items-center">
                                        <div className="small-banner position-relative">
                                            <img
                                                src={CatBanner01}
                                                className="img-fluid rounded-3"
                                                alt="main banner"
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>MÚSICA EN ALTA CALIDAD</h4>
                                                <h5>Oferta Especial</h5>
                                                <p className="mb-0">
                                                    A sólo $10.000
                                                </p>
                                                <Link className="button">
                                                    Comprar
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="small-banner position-relative">
                                            <img
                                                src={CatBanner02}
                                                className="img-fluid rounded-3"
                                                alt="main banner"
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>MÚSICA EN ALTA CALIDAD</h4>
                                                <h5>Oferta Especial</h5>
                                                <p>A sólo $10.000</p>
                                                <Link className="button">
                                                    Comprar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="d-flex flex-wrap gap-15 justify-content-between align-items-center">
                                        <div className="small-banner position-relative">
                                            <img
                                                src={CatBanner03}
                                                className="img-fluid rounded-3"
                                                alt="main banner"
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>MÚSICA EN ALTA CALIDAD</h4>
                                                <h5>Oferta Especial</h5>
                                                <p>A sólo $10.000</p>
                                                <Link className="button">
                                                    Comprar
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="small-banner position-relative">
                                            <img
                                                src={CatBanner04}
                                                className="img-fluid rounded-3"
                                                alt="main banner"
                                            />
                                            <div className="small-banner-content position-absolute">
                                                <h4>MÚSICA EN ALTA CALIDAD</h4>
                                                <h5>Oferta Especial</h5>
                                                <p>A sólo $10.000</p>
                                                <Link className="button">
                                                    Comprar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

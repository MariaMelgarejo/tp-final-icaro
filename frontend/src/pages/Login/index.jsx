import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import "./styles.css";

const Login = () => {
    return (
        <>
            <Meta title="Iniciar Sesión" />
            <Breadcrumb title="Iniciar Sesión" />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-4 col-md-8 col-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                        Iniciar Sesión
                                    </h4>
                                </div>
                            </div>
                            <form className="d-flex flex-column gap-15 px-5">
                                <div className="form-group mt-3">
                                    <input
                                        id="email"
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                    />
                                </div>
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                />
                                <div className="d-grid gap-2 col-lg-8 col-md-12 mx-auto">
                                    <button className="btn btn-info">
                                        Entrar
                                    </button>
                                    <Link
                                        to="/registro"
                                        className="btn btn-success"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

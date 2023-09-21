import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import "./styles.css";

const Register = () => {
    return (
        <>
            <Meta title="Registro" />
            <Breadcrumb title="Registro" />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-8 col-md-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                        Registrarse
                                    </h4>
                                </div>
                            </div>
                            <form className="d-flex flex-column gap-15 px-5 mt-3">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-lg-6 col-md-12 d-flex flex-column gap-15">
                                        <h5>Datos Personales</h5>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="text"
                                                placeholder="Nombre"
                                                name="firstname"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="text"
                                                placeholder="Apellido"
                                                name="lastname"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="tel"
                                                placeholder="Telefono"
                                                name="phone"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="tel"
                                                placeholder="Telefono Celular"
                                                name="mobile"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 d-flex flex-column gap-15">
                                        <h5>Datos De Envio</h5>
                                        <div className="row d-flex-justify-content-between">
                                            <div className="col-lg-8 col-md-12">
                                                <input
                                                    className="form-control px-3"
                                                    type="text"
                                                    placeholder="Calle"
                                                    name="street"
                                                />
                                            </div>
                                            <div className="col-lg-4 col-md-12">
                                                <input
                                                    className="form-control px-3"
                                                    type="text"
                                                    placeholder="N°"
                                                    name="number"
                                                />
                                            </div>
                                        </div>
                                        <div className="row d-flex-justify-content-between">
                                            <div className="col-lg-6 col-md-12">
                                                <input
                                                    className="form-control px-3"
                                                    type="text"
                                                    placeholder="Piso / Depto"
                                                    name="appartment"
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <input
                                                    className="form-control px-3"
                                                    type="text"
                                                    placeholder="Codigo Postal"
                                                    name="zipcode"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="text"
                                                placeholder="Localidad"
                                                name="city"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="text"
                                                placeholder="Provincia"
                                                name="province"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                className="form-control px-3"
                                                type="text"
                                                placeholder="País"
                                                name="country"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="d-flex justify-content-center gap-15 align-items-center ">
                                    <div className="mt-2">
                                        <input
                                            className="form-control px-3"
                                            type="password"
                                            name="password"
                                            placeholder="Contraseña"
                                        />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-lg-8 col-md-12 mx-auto">
                                    <button className="btn btn-success">
                                        Registrarse
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../stores/authStore";
import "./styles.css";

const Login = () => {
    const { login, user, isLoggedIn, isSuccess, isError, message } =
        useAuthStore((state) => {
            return {
                login: state.login,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                isSuccess: state.isSuccess,
                isError: state.isError,
                message: state.message,
            };
        });

    const navigate = useNavigate();
    let schema = Yup.object().shape({
        email: Yup.string()
            .email("No es una dirección de email válida")
            .required("Email es requerido"),
        password: Yup.string().required("Password es requerido"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("submit");
            login(values);
        },
    });

    useEffect(() => {
        if (!user == null || isSuccess) {
            navigate("/");
        } else {
            navigate("");
        }
    }, [user, isLoggedIn, isError, isSuccess, message]);

    return (
        <>
            <Meta title="Iniciar Sesión" />
            <Breadcrumb title="Iniciar Sesión" />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                        Iniciar Sesión
                                    </h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="bg-gradient-danger text-white border-radius-lg text-center">
                                    {isError ? message : ""}
                                </div>
                                <form
                                    className="d-flex flex-column gap-15 px-5 text-start"
                                    role="form"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="form-group mt-3">
                                        <input
                                            id="email"
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange(
                                                "email"
                                            )}
                                        />
                                    </div>
                                    {formik.errors.email &&
                                    formik.touched.email ? (
                                        <div className="text-bg-danger text-white text-center mt-1">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                    <div className="form-group mt-3">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            name="password"
                                            placeholder="Contraseña"
                                            value={formik.values.password}
                                            onChange={formik.handleChange(
                                                "password"
                                            )}
                                        />
                                    </div>
                                    {formik.errors.password &&
                                    formik.touched.password ? (
                                        <div className="text-bg-danger text-white text-center mt-1">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                    <div className="d-grid gap-2 col-lg-8 col-md-12 mx-auto">
                                        <button
                                            className="btn btn-info"
                                            type="submit"
                                        >
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
            </div>
        </>
    );
};

export default Login;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../stores/authStore";

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
            navigate("admin");
        } else {
            navigate("");
        }
    }, [user, isLoggedIn, isError, isSuccess, message]);

    return (
        <div className="bg-gray-200">
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                            <div className="container-fluid ps-2 pe-0">
                                <p className="navbar-brand font-weight-bolder ms-lg-0 ms-3">
                                    Ecommerce
                                </p>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <main className="main-content  mt-0">
                <div
                    className="page-header align-items-start min-vh-100"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
                    }}
                >
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container my-auto">
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
                                    <div className="card-body">
                                        <div className="bg-gradient-danger text-white border-radius-lg text-center">
                                            {isError ? message : ""}
                                        </div>
                                        <form
                                            role="form"
                                            className="text-start"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className="input-group input-group-outline my-3">
                                                <input
                                                    placeholder="Email"
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange(
                                                        "email"
                                                    )}
                                                />
                                            </div>
                                            {formik.errors.email &&
                                            formik.touched.email ? (
                                                <div>{formik.errors.email}</div>
                                            ) : null}
                                            <div className="input-group input-group-outline mb-3">
                                                <input
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={
                                                        formik.values.password
                                                    }
                                                    onChange={formik.handleChange(
                                                        "password"
                                                    )}
                                                />
                                            </div>
                                            {formik.errors.password &&
                                            formik.touched.password ? (
                                                <div>
                                                    {formik.errors.password}
                                                </div>
                                            ) : null}
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn bg-gradient-info w-100 my-4 mb-2"
                                                >
                                                    Iniciar Sesión
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;

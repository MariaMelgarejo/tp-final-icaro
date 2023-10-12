import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../stores/authStore";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import "./styles.css";

const Register = () => {
    const { register, user, isLoggedIn, isSuccess, isError, message } =
        useAuthStore((state) => {
            return {
                register: state.register,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                isSuccess: state.isSuccess,
                isError: state.isError,
                message: state.message,
            };
        });

    const navigate = useNavigate();
    let schema = Yup.object().shape({
        firstname: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
        email: Yup.string()
            .email("Email inválido")
            .required("El email es requerido"),
        password: Yup.string().required("El password es requerido"),
    });
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "user",
            phone: "",
            mobile: "",
            street: "",
            number: "",
            apartment: "",
            zipcode: "",
            city: "",
            province: "",
            country: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            register(values);
        },
    });

    useEffect(() => {
        if (!user == null || isSuccess) {
            navigate("/");
        }
    }, [user, isLoggedIn, isError, isSuccess, message]);

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
                            <div className="card-body">
                                <div className="bg-gradient-danger text-white border-radius-lg text-center">
                                    {isError ? message : ""}
                                </div>
                                <form
                                    className="d-flex flex-column gap-15 px-5 mt-3"
                                    role="form"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-lg-6 col-md-12 d-flex flex-column gap-15">
                                            <h5>Datos Personales</h5>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="text"
                                                    placeholder="Nombre"
                                                    name="firstname"
                                                    value={
                                                        formik.values.firstname
                                                    }
                                                    onChange={formik.handleChange(
                                                        "firstname"
                                                    )}
                                                />
                                                {formik.errors.firstname &&
                                                formik.touched.firstname ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {
                                                            formik.errors
                                                                .firstname
                                                        }
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="text"
                                                    placeholder="Apellido"
                                                    name="lastname"
                                                    value={
                                                        formik.values.lastname
                                                    }
                                                    onChange={formik.handleChange(
                                                        "lastname"
                                                    )}
                                                />
                                                {formik.errors.lastname &&
                                                formik.touched.lastname ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.lastname}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange(
                                                        "email"
                                                    )}
                                                />
                                                {formik.errors.email &&
                                                formik.touched.email ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.email}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="tel"
                                                    placeholder="Telefono"
                                                    name="phone"
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange(
                                                        "phone"
                                                    )}
                                                />
                                                {formik.errors.phone &&
                                                formik.touched.phone ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.phone}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="tel"
                                                    placeholder="Telefono Celular"
                                                    name="mobile"
                                                    value={formik.values.mobile}
                                                    onChange={formik.handleChange(
                                                        "mobile"
                                                    )}
                                                />
                                                {formik.errors.mobile &&
                                                formik.touched.mobile ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.mobile}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 d-flex flex-column gap-15">
                                            <h5>Datos De Envio</h5>
                                            <div className="row d-flex-justify-content-between">
                                                <div className="col-lg-8 col-md-12">
                                                    <input
                                                        className="form-control px-3 bg-light"
                                                        type="text"
                                                        placeholder="Calle"
                                                        name="street"
                                                        value={
                                                            formik.values.street
                                                        }
                                                        onChange={formik.handleChange(
                                                            "street"
                                                        )}
                                                    />
                                                    {formik.errors.street &&
                                                    formik.touched.street ? (
                                                        <div className="text-bg-danger text-white text-center mt-1">
                                                            {
                                                                formik.errors
                                                                    .street
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                    <input
                                                        className="form-control px-3 bg-light"
                                                        type="text"
                                                        placeholder="N°"
                                                        name="number"
                                                        value={
                                                            formik.values.number
                                                        }
                                                        onChange={formik.handleChange(
                                                            "number"
                                                        )}
                                                    />
                                                    {formik.errors.number &&
                                                    formik.touched.number ? (
                                                        <div className="text-bg-danger text-white text-center mt-1">
                                                            {
                                                                formik.errors
                                                                    .number
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex-justify-content-between">
                                                <div className="col-lg-6 col-md-12">
                                                    <input
                                                        className="form-control px-3 bg-light"
                                                        type="text"
                                                        placeholder="Piso / Depto"
                                                        name="apartment"
                                                        value={
                                                            formik.values
                                                                .apartment
                                                        }
                                                        onChange={formik.handleChange(
                                                            "apartment"
                                                        )}
                                                    />
                                                    {formik.errors.apartment &&
                                                    formik.touched.apartment ? (
                                                        <div className="text-bg-danger text-white text-center mt-1">
                                                            {
                                                                formik.errors
                                                                    .apartment
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="col-lg-6 col-md-12">
                                                    <input
                                                        className="form-control px-3 bg-light"
                                                        type="text"
                                                        placeholder="Codigo Postal"
                                                        name="zipcode"
                                                        value={
                                                            formik.values
                                                                .zipcode
                                                        }
                                                        onChange={formik.handleChange(
                                                            "zipcode"
                                                        )}
                                                    />
                                                    {formik.errors.zipcode &&
                                                    formik.touched.zipcode ? (
                                                        <div className="text-bg-danger text-white text-center mt-1">
                                                            {
                                                                formik.errors
                                                                    .zipcode
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="text"
                                                    placeholder="Localidad"
                                                    name="city"
                                                    value={formik.values.city}
                                                    onChange={formik.handleChange(
                                                        "city"
                                                    )}
                                                />
                                                {formik.errors.city &&
                                                formik.touched.city ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.city}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="text"
                                                    placeholder="Provincia"
                                                    name="province"
                                                    value={
                                                        formik.values.province
                                                    }
                                                    onChange={formik.handleChange(
                                                        "province"
                                                    )}
                                                />
                                                {formik.errors.province &&
                                                formik.touched.province ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.province}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <input
                                                    className="form-control px-3 bg-light"
                                                    type="text"
                                                    placeholder="País"
                                                    name="country"
                                                    value={
                                                        formik.values.country
                                                    }
                                                    onChange={formik.handleChange(
                                                        "country"
                                                    )}
                                                />
                                                {formik.errors.country &&
                                                formik.touched.country ? (
                                                    <div className="text-bg-danger text-white text-center mt-1">
                                                        {formik.errors.country}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="d-flex justify-content-center gap-15 align-items-center ">
                                        <div className="mt-2">
                                            <input
                                                className="form-control px-3 bg-light"
                                                type="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                value={formik.values.password}
                                                onChange={formik.handleChange(
                                                    "password"
                                                )}
                                            />
                                            {formik.errors.password &&
                                            formik.touched.password ? (
                                                <div className="text-bg-danger text-white text-center mt-1">
                                                    {formik.errors.password}
                                                </div>
                                            ) : null}
                                        </div>
                                        <input
                                            type="hidden"
                                            name="role"
                                            value={formik.values.role}
                                            onChange={formik.handleChange(
                                                "role"
                                            )}
                                        />
                                    </div>
                                    <div className="d-grid gap-2 col-lg-8 col-md-12 mx-auto">
                                        <button
                                            className="btn btn-success"
                                            type="submit"
                                        >
                                            Registrarse
                                        </button>
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

export default Register;

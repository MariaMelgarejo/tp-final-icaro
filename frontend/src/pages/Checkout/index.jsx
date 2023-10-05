import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../stores/authStore";
import useEcommerceStore from "../../stores/ecommerceStore";
import { MdArrowBackIosNew } from "react-icons/md";

import "./styles.css";

const Checkout = () => {
    const { user, getLoggedUser } = useAuthStore((state) => {
        return { user: state.user, getLoggedUser: state.getLoggedUser };
    });
    const userRef = useRef(user);

    useEffect(() => {
        getLoggedUser();
    }, [userRef.current]);

    const {
        cart,
        getCart,
        deleteCart,
        createOrder,
        deleteSuccess,
        setDeleteSuccess,
    } = useEcommerceStore((state) => {
        return {
            cart: state.cart,
            getCart: state.getCart,
            deleteCart: state.deleteCart,
            createOrder: state.createOrder,
            deleteSuccess: state.deleteSuccess,
            setDeleteSuccess: state.setDeleteSuccess,
        };
    });

    const [productsCart, setProductsCart] = useState([]);

    const cartRef = useRef(cart);

    useEffect(() => {
        getCart();
    }, [cartRef.current, deleteSuccess]);

    useEffect(() => {
        if (cart.length !== 0 && cart.message !== "El carrito no existe") {
            setProductsCart(JSON.parse(cart.products));
        }
    }, [cart]);

    let schema = Yup.object().shape({
        firstname: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
        street: Yup.string().required("La dirección es requerida"),
        number: Yup.number().required("La numeración es requerida"),
        city: Yup.string().required("La ciudad es requerida"),
        province: Yup.string().required("La provincia es requerida"),
        zipcode: Yup.string().required("El código postal es requerido"),
        country: Yup.string().required("El país es requerido"),
    });
    const formik = useFormik({
        initialValues: {
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            street: user.Address.street || "",
            number: user.Address.number || "",
            apartment: user.Address.apartment || "",
            city: user.Address.city || "",
            province: user.Address.province || "",
            zipcode: user.Address.zipcode || "",
            country: user.Address.country || "",
            total: cart.totalPrice || "",
            products: cartRef.current.products || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            values.total = cart.totalPrice;
            values.products = cart.products;
            createOrder(values);
            formik.resetForm();
            deleteCart();
        },
    });

    return (
        <>
            <Meta title="Checkout" />
            <Breadcrumb title="Checkout" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <h4 className="title total">Información de Contacto</h4>
                        <p className="user-details total">
                            {user.firstname} {user.lastname} ({user.email})
                        </p>
                        <h4 className="mb-4">Datos de Envío</h4>
                        <form
                            role="form"
                            className="d-flex flex-wrap gap-3 justify-content-between"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="flex-grow-1">
                                <label htmlFor="firstname">Nombre</label>
                                <input
                                    id="firstname"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Nombre"
                                    name="firstname"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <label htmlFor="lastname">Apellido</label>
                                <input
                                    id="lastname"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Apellido"
                                    name="lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                />
                            </div>
                            <div className="row d-flex justify-content-between flex-grow-1">
                                <div className="col-lg-6 col-md-12">
                                    <label htmlFor="street">Dirección</label>
                                    <input
                                        id="street"
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Dirección"
                                        name="street"
                                        value={formik.values.street}
                                        onChange={formik.handleChange("street")}
                                    />
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label htmlFor="number">N°</label>
                                    <input
                                        id="number"
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="N°"
                                        name="number"
                                        value={formik.values.number}
                                        onChange={formik.handleChange("number")}
                                    />
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label htmlFor="apartment">
                                        Piso / Depto
                                    </label>
                                    <input
                                        id="apartment"
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Piso / Depto"
                                        name="apartment"
                                        value={formik.values.apartment}
                                        onChange={formik.handleChange(
                                            "apartment"
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <label htmlFor="city">Localidad</label>
                                <input
                                    id="city"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Localidad"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange("city")}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <label htmlFor="province">Provincia</label>
                                <input
                                    id="province"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Provincia"
                                    name="province"
                                    value={formik.values.province}
                                    onChange={formik.handleChange("province")}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <label htmlFor="zipcode">Código Postal</label>
                                <input
                                    id="zipcode"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Código Postal"
                                    name="zipcode"
                                    value={formik.values.zipcode}
                                    onChange={formik.handleChange("zipcode")}
                                />
                            </div>
                            <div className="w-100">
                                <label htmlFor="country">País</label>
                                <input
                                    id="country"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="País"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange("country")}
                                />
                            </div>
                            <div className="w-100 mt-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link
                                        to="/carrito"
                                        className="btn btn-warning"
                                    >
                                        <MdArrowBackIosNew className="me-2" />
                                        Volver al Carrito
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                            <input
                                type="hidden"
                                name="products"
                                value={formik.values.products}
                                onChange={formik.handleChange("products")}
                            />
                            <input
                                type="hidden"
                                name="total"
                                value={formik.values.total}
                                onChange={formik.handleChange("total")}
                            />
                        </form>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <h4 className="mb-4">Detalle de la Compra</h4>
                        <div className="border-bottom py-4">
                            {productsCart &&
                                productsCart.map((product, index) => (
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        key={index}
                                    >
                                        <h5 className="total-price">
                                            {product.title} X {product.quantity}
                                        </h5>
                                        <h5 className="total">
                                            $ {product.price * product.quantity}
                                        </h5>
                                    </div>
                                ))}
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Subtotal</p>
                                <p className="total-price">
                                    $ {parseInt(cart.totalPrice)}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Envio</p>
                                <p className="mb-0 total-price">$ 1000</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">
                                $ {parseInt(cart.totalPrice) + 1000}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;

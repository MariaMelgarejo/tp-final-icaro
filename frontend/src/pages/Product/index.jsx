import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import { useFormik } from "formik";
import ReactStars from "react-rating-stars-component";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import useEcommerceStore from "../../stores/ecommerceStore";
import useAuthStore from "../../stores/authStore";
import "./styles.css";

import WatchImg from "../../assets/images/watch.jpg";
import { ShoppingCartOutlined, AppstoreAddOutlined } from "@ant-design/icons";

const Product = () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    const { id } = useParams();

    const [isWished, setIsWished] = useState(false);
    const [orderedProduct, setOrderedProduct] = useState(false);
    const {
        product,
        getProduct,
        wishes,
        getWishes,
        updateWishes,
        createOrUpdateCart,
        editSuccess,
        setEditSuccess,
        message,
        setMessage,
    } = useEcommerceStore((state) => {
        return {
            product: state.product,
            getProduct: state.getProduct,
            wishes: state.wishes,
            getWishes: state.getWishes,
            updateWishes: state.updateWishes,
            createOrUpdateCart: state.createOrUpdateCart,
            editSuccess: state.editSuccess,
            setEditSuccess: state.setEditSuccess,
            message: state.message,
            setMessage: state.setMessage,
        };
    });

    const prodRef = useRef(product);
    const wishRef = useRef(wishes);

    useEffect(() => {
        getProduct(id);
        getWishes();
        checkWish();
    }, [prodRef.current, wishRef.current, editSuccess, isWished]);

    const checkWish = () => {
        if (wishes.filter((wish) => wish.productId === product.id).length > 0) {
            setIsWished(true);
        } else {
            setIsWished(false);
        }
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, messageParam) => {
        api[type]({
            message: messageParam,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        if (editSuccess) {
            openNotificationWithIcon("success", message);
        }
        return () => {
            setEditSuccess(false);
            setMessage(null);
        };
    }, [editSuccess]);

    const handleAddWish = (id) => {
        formik.setValues({
            productId: id,
        });
        formik.handleSubmit();
    };

    const formik = useFormik({
        initialValues: {
            productId: "",
        },
        onSubmit: (values) => {
            updateWishes(values);
            formik.resetForm();
        },
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleAddToCart = (item) => {
        let quantity = document.querySelector("#productQuantity").value;
        createOrUpdateCart({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: quantity,
            rating: item.rating,
            image: item.image,
            discount: item.discount,
        });
    };

    return (
        <>
            <Meta title="Tienda" />
            <Breadcrumb title={product?.title} />
            <div className="container py-5">
                <div className="row">
                    {contextHolder}
                    <div className="col-lg-6 col-md-12">
                        <div className="main-product-image">
                            <div>
                                <img
                                    src={WatchImg}
                                    alt="watch"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{product?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {product?.price}</p>
                                <div className="d-flex align-items-center gap-3">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={product?.rating}
                                        edit={false}
                                    />
                                    <p className="mb-0 t-review">
                                        ( 2 Calificaciones )
                                    </p>
                                </div>
                                {orderedProduct && (
                                    <a className="review-btn" href="#review">
                                        Dejá tu calificación
                                    </a>
                                )}
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-3 align-items-center ">
                                    <h3 className="product-heading">
                                        Categoría:
                                    </h3>
                                    <p className="product-data">
                                        {product?.Category.title}
                                    </p>
                                </div>
                                <div className="d-flex gap-3 align-items-center ">
                                    <h3 className="product-heading">
                                        Disponibilidad:
                                    </h3>
                                    <p className="product-data">
                                        {product?.stock > 0
                                            ? "En Stock"
                                            : "Sin Stock"}
                                    </p>
                                </div>
                                <div className="d-flex gap-3 flex-row mt-2 mb-3 align-items-center ">
                                    <h3 className="product-heading">
                                        Cantidad:
                                    </h3>
                                    <div>
                                        <input
                                            type="number"
                                            name=""
                                            id="productQuantity"
                                            defaultValue={1}
                                            min={1}
                                            max={10}
                                            className="form-control px-3"
                                            style={{
                                                width: "80px",
                                                height: "40px",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start gap-3">
                                    <button
                                        className={`btn btn-info border-0 ${
                                            !isLoggedIn ? "disabled" : ""
                                        }`}
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                handleAddToCart(product);
                                            }
                                        }}
                                    >
                                        <ShoppingCartOutlined className="me-3" />
                                        Agregar
                                    </button>
                                    <button
                                        className={`btn btn-success border-0 ${
                                            !isLoggedIn ? "disabled" : ""
                                        }`}
                                    >
                                        <AppstoreAddOutlined className="me-3" />
                                        Comprar
                                    </button>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div>
                                        <button
                                            className="links border-0"
                                            type="submit"
                                            onClick={() => {
                                                handleAddWish(product?.id);
                                            }}
                                        >
                                            <AiOutlineHeart
                                                className={`fs-5 me-2 ${
                                                    isWished ? "svg-filter" : ""
                                                }`}
                                            />
                                            {isWished
                                                ? "Quitar de Favoritos"
                                                : "Agregar a Favoritos"}
                                        </button>
                                    </div>
                                    <div className="ms-5">
                                        <button
                                            className="links border-0"
                                            onClick={() => {
                                                copyToClipboard(location.href);
                                            }}
                                        >
                                            <AiOutlineShareAlt className="fs-5 me-2" />
                                            Compartir
                                        </button>
                                    </div>
                                </div>
                                <form role="form" className="text-start">
                                    <input
                                        type="hidden"
                                        name="productId"
                                        value={formik.values.productId}
                                        onChange={formik.handleChange(
                                            "productId"
                                        )}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container description-wrapper py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Descripción del producto</h4>
                        <div className="bg-white p-3">
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container reviews-wrapper py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Reseñas</h4>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">
                                        Reseñas de clientes
                                    </h4>
                                    <div className="d-flex gap-3 align-items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={product?.rating}
                                            edit={false}
                                        />
                                        <p className="mb-0">
                                            (2 calificaciones)
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {orderedProduct && (
                                        <a
                                            className="text-dark text-decoration-underline"
                                            href=""
                                        >
                                            Dejá tu reseña
                                        </a>
                                    )}
                                </div>
                            </div>
                            {orderedProduct && (
                                <div className="review-form">
                                    <h4 className="mb-2 mt-3">
                                        Escribe tu reseña
                                    </h4>
                                    <form
                                        action=""
                                        method="get"
                                        className="d-flex flex-column gap-3"
                                    >
                                        <div>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                activeColor="#ffd700"
                                                value={3}
                                                edit={true}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-3">
                                                <textarea
                                                    className="form-control ps-3 w-100"
                                                    name="comments"
                                                    placeholder="Comentarios"
                                                    id=""
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end ">
                                            <button className="btn btn-info border-0">
                                                Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex align-items-center gap-3">
                                        <h6 className="mb-0">María</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={4}
                                            edit={false}
                                        />
                                    </div>
                                    <p className="mt-3">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Doloribus veniam
                                        voluptatibus fuga nobis, modi qui
                                        repellendus dolores, libero enim,
                                        deleniti sapiente vero blanditiis
                                        inventore ea. Aperiam sequi enim neque
                                        assumenda?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;

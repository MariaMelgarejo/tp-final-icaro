import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";

import { LoadingOutlined } from "@ant-design/icons";
import { AiFillDelete } from "react-icons/ai";
import { Spin } from "antd";

import WatchImg from "../../assets/images/watch.jpg";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {
        createOrUpdateCart,
        cart,
        getCart,
        deleteCart,
        editSuccess,
        setEditSuccess,
        deleteSuccess,
        setDeleteSuccess,
    } = useEcommerceStore((state) => {
        return {
            createOrUpdateCart: state.createOrUpdateCart,
            cart: state.cart,
            getCart: state.getCart,
            deleteCart: state.deleteCart,
            editSuccess: state.editSuccess,
            setEditSuccess: state.setEditSuccess,
            deleteSuccess: state.deleteSuccess,
            setDeleteSuccess: state.setDeleteSuccess,
        };
    });

    const [productsCart, setProductsCart] = useState([]);

    const cartRef = useRef(cart);

    useEffect(() => {
        getCart();
        setIsLoading(false);
    }, [cartRef.current, editSuccess, deleteSuccess]);

    useEffect(() => {
        if (cart.length !== 0 && cart.message !== "El carrito no existe") {
            setProductsCart(JSON.parse(cart.products));
        }
    }, [cart]);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        if (deleteSuccess) {
            openNotificationWithIcon(
                "error",
                useEcommerceStore.getState().message
            );
        }
        if (editSuccess) {
            openNotificationWithIcon(
                "success",
                useEcommerceStore.getState().message
            );
        }
        return () => {
            setEditSuccess(false);
            setDeleteSuccess(false);
        };
    }, [deleteSuccess, editSuccess]);

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    const handleDelete = (id) => {
        let filterProducts = productsCart.filter(
            (product) => product.id !== id
        );
        cartRef.current.products = JSON.stringify(filterProducts);
        if (filterProducts.length > 0) {
            createOrUpdateCart({
                products: cartRef.current.products,
            });
        } else {
            deleteCart();
        }
    };

    const handleQuantity = (e, id) => {
        let updateProducts = productsCart.map((product) =>
            product.id === id
                ? { ...product, quantity: e.target.value }
                : product
        );
        cartRef.current.products = JSON.stringify(updateProducts);
        createOrUpdateCart({
            products: cartRef.current.products,
        });
    };

    return (
        <>
            <Meta title="Carrito" />
            <Breadcrumb title="Carrito" />
            <div className="container py-5">
                {contextHolder}
                {isLoading ? (
                    <div className="row">
                        <div className="col-12 text-center">
                            <Spin indicator={antIcon} />
                        </div>
                    </div>
                ) : cart.products ? (
                    <div className="row">
                        <div className="col-12">
                            {productsCart.map((item) => (
                                <div key={item.id} className="row mb-3">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body row d-flex justify-content-between align-items-center">
                                                <div className="col-md-2">
                                                    <img
                                                        src={WatchImg}
                                                        className="img-fluid w-60"
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="col-md-6 d-flex flex-column ">
                                                    <h5>{item.title}</h5>
                                                    <p>$ {item.price}</p>
                                                </div>
                                                <div className="col-md-4 d-flex justify-content-between align-items-center">
                                                    <div className="d-flex justify-content-around align-items-center">
                                                        <label
                                                            htmlFor="quantity"
                                                            className="mb-0 me-3"
                                                        >
                                                            Cantidad
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            defaultValue={
                                                                item.quantity
                                                            }
                                                            id="quantity"
                                                            min={1}
                                                            max={10}
                                                            onChange={(e) =>
                                                                handleQuantity(
                                                                    e,
                                                                    item.id
                                                                )
                                                            }
                                                            className="form-control px-3"
                                                            style={{
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                    <button
                                                        className="btn btn-danger btn-round mb-0"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <AiFillDelete />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 py-2 mt-4">
                            <div className="row d-flex justify-content-between align-items-lg-baseline align-items-md-center">
                                <div className="col-lg-3 col-md-12 d-flex flex-column align-items-lg-start align-items-md-center">
                                    <Link to="/tienda" className="btn btn-info">
                                        Seguir Comprando
                                    </Link>
                                </div>
                                <div className="col-lg-9 col-md-12">
                                    <div className="d-flex flex-column align-items-lg-end align-items-md-center mt-lg-0 mt-3">
                                        <h4>SubTotal: $ {cart.totalPrice}</h4>
                                        <p>
                                            El costo de envio se calcula al
                                            momento del checkout
                                        </p>
                                        <Link
                                            to="/checkout"
                                            className="btn btn-success"
                                        >
                                            Finalizar Compra
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-secondary" role="alert">
                                <p className="text-white text-center mb-0">
                                    No posee productos en el carrito
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;

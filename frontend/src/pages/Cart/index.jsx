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
    const { product, getProduct, cart, getCart, editSuccess, setEditSuccess } =
        useEcommerceStore((state) => {
            return {
                product: state.product,
                getProduct: state.getProduct,
                cart: state.cart,
                getCart: state.getCart,
                // updateWishes: state.updateWishes,
                editSuccess: state.editSuccess,
                setEditSuccess: state.setEditSuccess,
            };
        });

    const [productsCart, setProductsCart] = useState([]);

    const cartRef = useRef(cart);

    useEffect(() => {
        getCart();
    }, [cartRef.current, editSuccess]);

    useEffect(() => {
        const isCart = useEcommerceStore.getState().cart;
        if (isCart.length !== 0) {
            let products = JSON.parse(isCart.products);
            products.map((item) => {
                getProduct(item.productId);
            });
        }
    }, [cart]);

    useEffect(() => {
        let newProduct = useEcommerceStore.getState().product;
        if (newProduct != null) {
            setProductsCart((state) => [...state, newProduct]);
        }
        return () => {
            setIsLoading(false);
        };
    }, [product]);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

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
                ) : (
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
                                                            defaultValue={1}
                                                            id="quantity"
                                                            min={1}
                                                            max={10}
                                                            className="form-control px-3"
                                                            style={{
                                                                width: "80px",
                                                            }}
                                                        />
                                                    </div>
                                                    <button className="btn btn-danger btn-round mb-0">
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
                                        <h4>SubTotal: $ 1000</h4>
                                        <p>
                                            El costo de envio se calcula al
                                            momento del checkout
                                        </p>
                                        <Link
                                            to="/checkout"
                                            className="btn btn-success "
                                        >
                                            Finalizar Compra
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;

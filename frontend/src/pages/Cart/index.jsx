import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

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
        const getProductsCart = async () => {
            await getCart();

            let products = JSON.parse(cart?.products);
            await products.forEach(async (item) => {
                await getProduct(item.productId);
                setProductsCart([...productsCart, product]);
            });
        };
        getProductsCart();
        setIsLoading(false);
    }, [cartRef.current, editSuccess]);

    // useEffect(() => {
    //     let products = JSON.parse(cart.products);
    //     products.forEach((item) => {
    //         getProduct(item.productId);
    //         setProductsCart([...productsCart, product]);
    //     });
    // }, [cart]);

    console.log("productsCart", productsCart);

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
                <div className="row">
                    {contextHolder}
                    {isLoading ? (
                        <div className="col-12 text-center">
                            <Spin indicator={antIcon} />
                        </div>
                    ) : (
                        <div className="col-12">Contenido Listo</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;

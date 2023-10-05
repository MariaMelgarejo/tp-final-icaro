import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";
import { notification } from "antd";

const Orders = () => {
    const { orders, getOrdersByLoggedUser, createSuccess, setCreateSuccess } =
        useEcommerceStore((state) => {
            return {
                orders: state.orders,
                getOrdersByLoggedUser: state.getOrdersByLoggedUser,
                createSuccess: state.createSuccess,
                setCreateSuccess: state.setCreateSuccess,
            };
        });

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    const ordersRef = useRef(orders);

    useEffect(() => {
        getOrdersByLoggedUser();
    }, [ordersRef.current]);

    return (
        <>
            <Meta title="Mis Compras" />
            <Breadcrumb title="Mis Compras" />
            <div className="container py-5">
                {contextHolder}
                <div className="row">
                    <div className="col-12">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <Link
                                    to={`/ordenes/${order.id}`}
                                    className="card mb-3"
                                    key={order.id}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Orden #{order.id}
                                        </h5>
                                        <p className="card-text">
                                            {order.status}
                                        </p>
                                        <p className="card-text">
                                            $ {order.total}
                                        </p>
                                        <p className="card-text">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center">
                                <h1>No hay ordenes</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;

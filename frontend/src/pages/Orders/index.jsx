import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";
import { notification, Tag } from "antd";

const Orders = () => {
    const {
        orders,
        getOrdersByLoggedUser,
        createSuccess,
        setCreateSuccess,
        setCartQuantity,
        deleteCart,
    } = useEcommerceStore((state) => {
        return {
            orders: state.orders,
            getOrdersByLoggedUser: state.getOrdersByLoggedUser,
            createSuccess: state.createSuccess,
            setCreateSuccess: state.setCreateSuccess,
            setCartQuantity: state.setCartQuantity,
            deleteCart: state.deleteCart,
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

    useEffect(() => {
        if (createSuccess) {
            openNotificationWithIcon(
                "success",
                "La compra se ha realizado con éxito"
            );
            deleteCart();
        }
        return () => {
            setCreateSuccess(false);
            setCartQuantity(0);
        };
    }, [createSuccess]);

    return (
        <>
            <Meta title="Mis Compras" />
            <Breadcrumb title="Mis Compras" />
            <div className="container py-5">
                {contextHolder}
                <div className="d-flex flex-wrap gap-2">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div className="col-lg-4 col-12" key={order.id}>
                                <Link
                                    to={`/ordenes/${order.id}`}
                                    className="card mb-3"
                                >
                                    <div className="card-body">
                                        <div className="row d-flex justify-content-between align-content-center">
                                            <h5 className="card-title col-6">
                                                Orden #{order.id}
                                            </h5>
                                            <p className="card-text col-6 text-end">
                                                <Tag
                                                    color={
                                                        order.status ==
                                                        "pending"
                                                            ? "warning"
                                                            : order.status ==
                                                              "delivered"
                                                            ? "processing"
                                                            : order.status ==
                                                              "returned"
                                                            ? "error"
                                                            : "success"
                                                    }
                                                >
                                                    {order.status == "pending"
                                                        ? "En Preparación"
                                                        : order.status ==
                                                          "delivered"
                                                        ? "Enviado"
                                                        : order.status ==
                                                          "returned"
                                                        ? "Rechazado"
                                                        : "Entregado"}
                                                </Tag>
                                            </p>
                                        </div>
                                        <div className="row d-flex justify-content-between align-content-center">
                                            <p className="card-text col-6 text-dark-emphasis ">
                                                Total:
                                            </p>
                                            <p className="card-text col-6 text-end">
                                                $ {order.total}
                                            </p>
                                        </div>
                                        <div className="row d-flex justify-content-between align-content-center">
                                            <p className="card-text col-6">
                                                Fecha:{" "}
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="card-text col-6 text-end">
                                                Hora:{" "}
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <h1>No hay ordenes</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;

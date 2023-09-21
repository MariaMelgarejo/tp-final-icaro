import { useEffect, useRef, useState } from "react";
import useEcommerceStore from "../../stores/ecommerceStore";
import { Table, Tag } from "antd";

const Order = () => {
    const { orders, getOrders } = useEcommerceStore((state) => {
        return {
            orders: state.orders,
            getOrders: state.getOrders,
        };
    });

    const ordersRef = useRef(orders);

    useEffect(() => {
        getOrders();
    }, [ordersRef.current]);

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Cliente", dataIndex: "client", key: "client" },
        { title: "Total", dataIndex: "total", key: "total" },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            render: (_, { key, status }) => {
                let color;
                let text;
                switch (status) {
                    case "pending":
                        color = "orange";
                        text = "En Preparación";
                        break;
                    case "delivered":
                        color = "blue";
                        text = "Enviado";
                        break;
                    case "returned":
                        color = "red";
                        text = "Rechazado";
                        break;

                    default:
                        color = "green";
                        text = "Entregado";
                        break;
                }
                return (
                    <>
                        <Tag
                            className="text-center"
                            color={color}
                            style={{ width: "120px", cursor: "pointer" }}
                            onClick={() => {
                                console.log("hola");
                            }}
                        >
                            {text}
                        </Tag>
                    </>
                );
            },
        },
        {
            title: "Fecha",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    const dataSource = [];
    orders.forEach((order) => {
        dataSource.push({
            key: order.id,
            client: order.User.firstname + " " + order.User.lastname,
            total: `$ ${order.total}`,
            status: order.status,
            createdAt: new Date(order.createdAt).toLocaleDateString(),
        });
    });

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">
                                    Ventas
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <Table dataSource={dataSource} columns={columns} />
                            {/* {contextHolder} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;

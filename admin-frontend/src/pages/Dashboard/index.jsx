import { useEffect, useRef } from "react";
import DashboardCard from "../../components/Cards/DashboardCard";
import useUserStore from "../../stores/userStore";
import useEcommerceStore from "../../stores/ecommerceStore";
import { Table, Tag } from "antd";
import {
    MdOutlineCategory,
    MdAccessTime,
    MdProductionQuantityLimits,
    MdStorefront,
    MdAttachMoney,
} from "react-icons/md";
import "./styles.css";

const Dashboard = () => {
    const { clients, getClients } = useUserStore((state) => {
        return {
            clients: state.clients,
            getClients: state.getClients,
        };
    });
    const { orders, getOrders } = useEcommerceStore((state) => {
        return {
            orders: state.orders,
            getOrders: state.getOrders,
        };
    });

    const clientsRef = useRef(clients);
    const ordersRef = useRef(orders);

    useEffect(() => {
        getClients();
        getOrders();
    }, [clientsRef.current, ordersRef.current]);

    const columnsOrders = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Fecha", dataIndex: "date", key: "date" },
        { title: "Cliente", dataIndex: "client", key: "client" },
        { title: "Total", dataIndex: "total", key: "total" },
        { title: "Estado", dataIndex: "status", key: "status" },
    ];
    const columnsClients = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Cliente", dataIndex: "client", key: "client" },
        { title: "Fecha", dataIndex: "date", key: "date" },
    ];
    const dataSourceOrders = [];
    const dataSourceClients = [];
    clients.slice(0, 6).map((client) => {
        dataSourceClients.push({
            key: client.id,
            client: `${client.firstname} ${client.lastname}`,
            date: new Date(client.createdAt).toLocaleDateString(),
        });
    });
    orders.slice(0, 6).map((order) => {
        dataSourceOrders.push({
            key: order.id,
            date: new Date(order.createdAt).toLocaleDateString(),
            client: `${order.User.firstname} ${order.User.lastname}`,
            total: order.total,
            status: order.status,
        });
    });

    return (
        <div className="container-fluid py-4">
            <div className="row mt-3 mb-3">
                <DashboardCard
                    title="7"
                    subtitle="Categorías"
                    footerIcon={<MdAccessTime />}
                    footerText="en el último mes"
                    icon={<MdOutlineCategory className="text-white" />}
                    color="dark"
                />
                <DashboardCard
                    title="50"
                    subtitle="Productos"
                    footerIcon={<MdAccessTime />}
                    footerText="en el último mes"
                    icon={<MdProductionQuantityLimits className="text-white" />}
                    color="info"
                />
                <DashboardCard
                    title="152"
                    subtitle="Ventas"
                    footerIcon={<MdAccessTime />}
                    footerText="en el último mes"
                    icon={<MdStorefront className="text-white" />}
                    color="primary"
                />
                <DashboardCard
                    title="$ 1500000"
                    subtitle="Ingresos"
                    footerIcon={<MdAccessTime />}
                    footerText="en el último mes"
                    icon={<MdAttachMoney className="text-white" />}
                    color="success"
                />
            </div>
            <div className="row mb-4">
                <div className="col-lg-6 col-md-6 mb-md-0 mb-4">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">
                                    Últimas Ventas
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <Table
                                dataSource={dataSourceOrders}
                                columns={columnsOrders}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-md-0 mb-4">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">
                                    Últimos Clientes
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <Table
                                dataSource={dataSourceClients}
                                columns={columnsClients}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import DashboardCard from "../../components/Cards/DashboardCard";
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
    const columnsSales = [
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
    const dataSourceSales = [
        {
            key: 1,
            date: "2023-09-01",
            client: "Juan Perez",
            total: "100000",
            status: "Entregado",
        },
        {
            key: 2,
            date: "2023-09-02",
            client: "Maria Lopez",
            total: "120000",
            status: "Enviado",
        },
        {
            key: 3,
            date: "2023-09-03",
            client: "Pedro Castro",
            total: "10000",
            status: "Entregado",
        },
        {
            key: 4,
            date: "2023-09-04",
            client: "Diego Rivas",
            total: "100320",
            status: "En Preparacion",
        },
    ];
    const dataSourceClients = [
        {
            key: 1,
            client: "Juan Perez",
            date: "2023-09-01",
        },
        {
            key: 2,
            client: "Maria Lopez",
            date: "2023-09-02",
        },
        {
            key: 3,
            client: "Pedro Castro",
            date: "2023-09-03",
        },
        {
            key: 4,
            client: "Diego Rivas",
            date: "2023-09-04",
        },
    ];
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
                                dataSource={dataSourceSales}
                                columns={columnsSales}
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

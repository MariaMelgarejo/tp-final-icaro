import { useEffect, useRef } from "react";
import useUserStore from "../../stores/userStore";
import { Table, Tag, notification } from "antd";

const Client = () => {
    const { clients, getClients, activateUser, editSuccess, setEditSuccess } =
        useUserStore((state) => {
            return {
                clients: state.clients,
                getClients: state.getClients,
                activateUser: state.activateUser,
                editSuccess: state.editSuccess,
                setEditSuccess: state.setEditSuccess,
            };
        });

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        if (editSuccess) {
            openNotificationWithIcon("success", "Usuario actualizado!");
        }
        return () => {
            setEditSuccess(false);
        };
    }, [editSuccess]);

    const clientsRef = useRef(clients);

    useEffect(() => {
        getClients();
    }, [clientsRef.current]);

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nombre", dataIndex: "fullname", key: "fullname" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Estado",
            dataIndex: "active",
            key: "active",
            render: (_, { key, active }) => (
                <>
                    <Tag
                        className="text-center"
                        color={active ? "green" : "red"}
                        style={{ width: "120px", cursor: "pointer" }}
                        onClick={() => {
                            activateUser({ id: key, active: !active });
                        }}
                    >
                        {active ? "Activado" : "Desactivado"}
                    </Tag>
                </>
            ),
        },
        {
            title: "Fecha de Registro",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    const dataSource = [];
    clients.forEach((client) => {
        dataSource.push({
            key: client.id,
            fullname: client.firstname + " " + client.lastname,
            email: client.email,
            active: client.active,
            createdAt: new Date(client.createdAt).toLocaleDateString(),
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
                                    Clientes
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <Table dataSource={dataSource} columns={columns} />
                            {contextHolder}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client;

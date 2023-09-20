import { useEffect, useRef, useState } from "react";
import useUserStore from "../../stores/userStore";
import { Table, Tag, notification, Modal } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";

const Admin = () => {
    const {
        admins,
        getAdmins,
        activateUser,
        createSuccess,
        setCreateSuccess,
        editSuccess,
        setEditSuccess,
        createAdmin,
    } = useUserStore((state) => {
        return {
            admins: state.admins,
            getAdmins: state.getAdmins,
            activateUser: state.activateUser,
            createSuccess: state.createSuccess,
            setCreateSuccess: state.setCreateSuccess,
            editSuccess: state.editSuccess,
            setEditSuccess: state.setEditSuccess,
            createAdmin: state.createAdmin,
        };
    });

    const [openModal, setOpenModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    const showModal = () => setOpenModal(true);

    const handleCancel = () => setOpenModal(false);
    const handleOk = () => formik.handleSubmit();

    useEffect(() => {
        if (createSuccess) {
            openNotificationWithIcon("success", "Administrador Creado!");
        }
        if (editSuccess) {
            openNotificationWithIcon("success", "Usuario actualizado!");
        }
        return () => {
            setCreateSuccess(false);
            setEditSuccess(false);
        };
    }, [createSuccess, editSuccess]);

    const adminsRef = useRef(admins);

    useEffect(() => {
        getAdmins();
    }, [adminsRef.current]);

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
        { title: "Acciones", dataIndex: "actions", key: "actions" },
    ];

    const dataSource = [];
    admins.forEach((client) => {
        dataSource.push({
            key: client.id,
            fullname: client.firstname + " " + client.lastname,
            email: client.email,
            active: client.active,
            createdAt: new Date(client.createdAt).toLocaleDateString(),
            actions: (
                <div className="td-actions d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-warning btn-sm btn-round"
                        onClick={(e) => handleEdit(e, client)}
                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        className="btn btn-danger btn-sm btn-round"
                        onClick={(e) => handleDelete(e, client)}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            ),
        });
    });

    let schema = Yup.object().shape({
        firstname: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
        email: Yup.string()
            .email("Email inválido")
            .required("El email es requerido"),
        password: Yup.string().required("El password es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "admin",
            address: {},
        },
        validationSchema: schema,
        onSubmit: (values) => {
            createAdmin(values);
            formik.resetForm();
            setOpenModal(false);
        },
    });

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">
                                    Administradores
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="d-flex justify-content-end mx-3">
                                <button
                                    className="btn btn-info"
                                    onClick={showModal}
                                >
                                    Crear Administrador
                                </button>
                            </div>
                            <Table dataSource={dataSource} columns={columns} />
                            {contextHolder}
                            <Modal
                                title="Crear Administrador"
                                open={openModal}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <form role="form">
                                    <div className="mt-3">
                                        <label htmlFor="firstname">
                                            Nombre
                                        </label>
                                        <input
                                            id="firstname"
                                            type="text"
                                            name="firstname"
                                            label="Nombre"
                                            className="form-control bg-light px-2"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange(
                                                "firstname"
                                            )}
                                        />
                                        {formik.errors.firstname &&
                                        formik.touched.firstname ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.firstname}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="lastname">
                                            Apellido
                                        </label>
                                        <input
                                            id="lastname"
                                            type="text"
                                            name="lastname"
                                            label="Nombre"
                                            className="form-control bg-light px-2"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange(
                                                "lastname"
                                            )}
                                        />
                                        {formik.errors.lastname &&
                                        formik.touched.lastname ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.lastname}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            name="email"
                                            label="Nombre"
                                            className="form-control bg-light px-2"
                                            value={formik.values.email}
                                            onChange={formik.handleChange(
                                                "email"
                                            )}
                                        />
                                        {formik.errors.email &&
                                        formik.touched.email ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3 mb-5">
                                        <label htmlFor="password">
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            label="Nombre"
                                            className="form-control bg-light px-2"
                                            value={formik.values.password}
                                            onChange={formik.handleChange(
                                                "password"
                                            )}
                                        />
                                        {formik.errors.password &&
                                        formik.touched.password ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange("role")}
                                    />
                                    <input
                                        type="hidden"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange(
                                            "address"
                                        )}
                                    />
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

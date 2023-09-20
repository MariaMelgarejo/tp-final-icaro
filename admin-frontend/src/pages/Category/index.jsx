import { useEffect, useRef, useState } from "react";
import { Table, Tag, notification, Modal } from "antd";
import useEcommerceStore from "../../stores/ecommerceStore";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CreateModal from "../../components/Modals/Category/CreateModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles.css";

const Category = () => {
    const {
        categories,
        getCategories,
        createSuccess,
        setCreateSuccess,
        editSuccess,
        setEditSuccess,
        deleteSuccess,
        setDeleteSuccess,
        setCategory,
        updateCategory,
        deleteCategory,
    } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
            createSuccess: state.createSuccess,
            setCreateSuccess: state.setCreateSuccess,
            editSuccess: state.editSuccess,
            setEditSuccess: state.setEditSuccess,
            deleteSuccess: state.deleteSuccess,
            setDeleteSuccess: state.setDeleteSuccess,
            setCategory: state.setCategory,
            updateCategory: state.updateCategory,
            deleteCategory: state.deleteCategory,
        };
    });

    const cat = useRef(categories);

    const [openModal, setOpenModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        getCategories();
    }, [cat.current]);

    useEffect(() => {
        if (createSuccess) {
            openNotificationWithIcon("success", "Categoría creada!");
        }
        if (editSuccess) {
            openNotificationWithIcon("success", "Categoría actualizada!");
        }
        if (deleteSuccess) {
            openNotificationWithIcon("error", "Categoría eliminada!");
        }
        return () => {
            setCreateSuccess(false);
            setEditSuccess(false);
            setDeleteSuccess(false);
        };
    }, [createSuccess, editSuccess, deleteSuccess]);

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nombre", dataIndex: "title", key: "title" },
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
                            updateCategory({ id: key, active: !active });
                        }}
                    >
                        {active ? "Activado" : "Desactivado"}
                    </Tag>
                </>
            ),
        },
        { title: "Acciones", dataIndex: "actions", key: "actions" },
    ];

    let schema = Yup.object().shape({
        title: Yup.string().required("El nombre es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            id: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            updateCategory(values);
            formik.resetForm();
        },
    });

    const handleEdit = (e, itemCategory) => {
        e.preventDefault();
        setCategory(itemCategory);
        formik.setValues({
            title: itemCategory.title,
            id: itemCategory.id,
        });
        setOpenModal(true);
    };
    const handleDelete = (e, itemCategory) => {
        e.preventDefault();
        Modal.confirm({
            title: "Está seguro de eliminar esta categoría?",
            icon: <AiOutlineDelete />,
            okText: "Si, eliminar",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteCategory(itemCategory.id);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleOk = () => {
        setOpenModal(false);
        formik.handleSubmit();
    };
    const handleCancel = () => {
        setOpenModal(false);
    };

    const dataSource = [];
    categories.forEach((itemCategory) => {
        dataSource.push({
            key: itemCategory.id,
            title: itemCategory.title,
            active: itemCategory.active,
            actions: (
                <div className="td-actions d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-warning btn-round"
                        onClick={(e) => handleEdit(e, itemCategory)}
                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        className="btn btn-danger btn-round"
                        onClick={(e) => handleDelete(e, itemCategory)}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            ),
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
                                    Categorías
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="d-flex justify-content-end mx-3">
                                <button
                                    className="btn btn-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#newCategory"
                                >
                                    Nueva Categoría
                                </button>
                            </div>
                            <Table dataSource={dataSource} columns={columns} />
                            {contextHolder}
                            <CreateModal />
                            <Modal
                                title="Editar Categoría"
                                open={openModal}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <form role="form">
                                    <input
                                        type="text"
                                        name="title"
                                        label="Nombre"
                                        className="form-control bg-light px-2"
                                        value={formik.values.title}
                                        onChange={formik.handleChange("title")}
                                    />
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={formik.values.id}
                                        onChange={formik.handleChange("id")}
                                    />
                                    {formik.errors.title &&
                                    formik.touched.title ? (
                                        <div>{formik.errors.title}</div>
                                    ) : null}
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;

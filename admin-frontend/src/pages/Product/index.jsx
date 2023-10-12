import { useEffect, useRef, useState } from "react";
import { Table, Tag, notification, Modal } from "antd";
import useEcommerceStore from "../../stores/ecommerceStore";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";

const Product = () => {
    const {
        categories,
        getCategories,
        products,
        getProducts,
        createSuccess,
        setCreateSuccess,
        editSuccess,
        setEditSuccess,
        deleteSuccess,
        setDeleteSuccess,
        setProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
            products: state.products,
            getProducts: state.getProducts,
            createSuccess: state.createSuccess,
            setCreateSuccess: state.setCreateSuccess,
            editSuccess: state.editSuccess,
            setEditSuccess: state.setEditSuccess,
            deleteSuccess: state.deleteSuccess,
            setDeleteSuccess: state.setDeleteSuccess,
            setProduct: state.setProduct,
            createProduct: state.createProduct,
            updateProduct: state.updateProduct,
            deleteProduct: state.deleteProduct,
        };
    });

    const cat = useRef(products);

    const [createState, setCreateState] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    const showModal = () => setOpenModal(true);

    useEffect(() => {
        getCategories();
        getProducts();
    }, [cat.current]);

    useEffect(() => {
        if (createSuccess) {
            openNotificationWithIcon("success", "Producto creado!");
        }
        if (editSuccess) {
            openNotificationWithIcon("success", "Producto actualizado!");
        }
        if (deleteSuccess) {
            openNotificationWithIcon("error", "Producto eliminado!");
        }
        return () => {
            setCreateSuccess(false);
            setEditSuccess(false);
            setDeleteSuccess(false);
        };
    }, [createSuccess, editSuccess, deleteSuccess]);

    let schema = Yup.object().shape({
        title: Yup.string().required("El nombre es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            description: "",
            price: "",
            categoryId: "",
            stock: 0,
            discount: 0,
            image: null,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (createState) {
                delete values.id;
                createProduct(values);
            } else {
                updateProduct(values);
            }
            formik.resetForm();
            setOpenModal(false);
            setCreateState(false);
        },
    });

    const handleEdit = (e, itemProduct) => {
        e.preventDefault();
        setProduct(itemProduct);
        formik.setValues({
            title: itemProduct.title,
            description: itemProduct.description,
            price: itemProduct.price,
            categoryId: itemProduct.categoryId,
            stock: itemProduct.stock,
            discount: itemProduct.discount,
            id: itemProduct.id,
        });
        setOpenModal(true);
    };
    const handleDelete = (e, itemProduct) => {
        e.preventDefault();
        Modal.confirm({
            title: "Está seguro de eliminar este producto?",
            icon: <AiOutlineDelete />,
            okText: "Si, eliminar",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteProduct(itemProduct.id);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleOk = () => {
        formik.handleSubmit();
    };
    const handleCancel = () => {
        setOpenModal(false);
    };

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nombre", dataIndex: "title", key: "title" },
        { title: "Precio", dataIndex: "price", key: "price" },
        { title: "Stock", dataIndex: "stock", key: "stock" },
        { title: "Descuento", dataIndex: "discount", key: "discount" },
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
                            updateProduct({ id: key, active: !active });
                        }}
                    >
                        {active ? "Activado" : "Desactivado"}
                    </Tag>
                </>
            ),
        },
        { title: "Acciones", dataIndex: "actions", key: "actions" },
    ];

    const dataSource = [];
    products.forEach((itemProduct) => {
        dataSource.push({
            key: itemProduct.id,
            title: itemProduct.title,
            price: `$ ${itemProduct.price}`,
            stock: itemProduct.stock,
            discount: `${itemProduct.discount}%`,
            active: itemProduct.active,
            actions: (
                <div className="td-actions d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-warning btn-round btn-sm"
                        onClick={(e) => handleEdit(e, itemProduct)}
                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        className="btn btn-danger btn-round btn-sm"
                        onClick={(e) => handleDelete(e, itemProduct)}
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
                                    Productos
                                </h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="d-flex justify-content-end mx-3">
                                <button
                                    className="btn btn-info"
                                    onClick={() => {
                                        setCreateState(true);
                                        showModal();
                                    }}
                                >
                                    Crear Producto
                                </button>
                            </div>
                            <Table dataSource={dataSource} columns={columns} />
                            {contextHolder}
                            <Modal
                                title={
                                    createState
                                        ? "Crear Producto"
                                        : "Editar Producto"
                                }
                                open={openModal}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <form role="form" encType="multipart/form-data">
                                    <div className="mt-3">
                                        <label htmlFor="title">Nombre</label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            label="Nombre"
                                            className="form-control bg-light px-2"
                                            value={formik.values.title}
                                            onChange={formik.handleChange(
                                                "title"
                                            )}
                                        />
                                        {formik.errors.title &&
                                        formik.touched.title ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.title}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="description">
                                            Descripción
                                        </label>
                                        <textarea
                                            id="description"
                                            type="text"
                                            name="description"
                                            label="Descripcion"
                                            className="form-control bg-light px-2"
                                            value={formik.values.description}
                                            onChange={formik.handleChange(
                                                "description"
                                            )}
                                        ></textarea>
                                        {formik.errors.description &&
                                        formik.touched.description ? (
                                            <div className="text-bg-danger text-white text-center mt-1">
                                                {formik.errors.description}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <label htmlFor="price">
                                                Precio
                                            </label>
                                            <input
                                                id="price"
                                                type="text"
                                                name="price"
                                                label="Precio"
                                                className="form-control bg-light px-2"
                                                value={formik.values.price}
                                                onChange={formik.handleChange(
                                                    "price"
                                                )}
                                            />
                                            {formik.errors.price &&
                                            formik.touched.price ? (
                                                <div className="text-bg-danger text-white text-center mt-1">
                                                    {formik.errors.price}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="categoryId">
                                                Categoría
                                            </label>
                                            <select
                                                id="categoryId"
                                                name="categoryId"
                                                className="form-control bg-light px-2"
                                                onChange={formik.handleChange(
                                                    "categoryId"
                                                )}
                                                value={formik.values.categoryId}
                                            >
                                                <option value="">
                                                    Seleccione una categoría
                                                </option>
                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-5">
                                        <div className="col-6">
                                            <label htmlFor="stock">Stock</label>
                                            <input
                                                id="stock"
                                                type="text"
                                                name="stock"
                                                label="stock"
                                                className="form-control bg-light px-2"
                                                value={formik.values.stock}
                                                onChange={formik.handleChange(
                                                    "stock"
                                                )}
                                            />
                                            {formik.errors.stock &&
                                            formik.touched.stock ? (
                                                <div className="text-bg-danger text-white text-center mt-1">
                                                    {formik.errors.stock}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="discount">
                                                Descuento
                                            </label>
                                            <input
                                                id="discount"
                                                type="text"
                                                name="discount"
                                                label="Descuento"
                                                className="form-control bg-light px-2"
                                                value={formik.values.discount}
                                                onChange={formik.handleChange(
                                                    "discount"
                                                )}
                                            />
                                            {formik.errors.discount &&
                                            formik.touched.discount ? (
                                                <div className="text-bg-danger text-white text-center mt-1">
                                                    {formik.errors.discount}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="image">
                                                Imagen
                                            </label>
                                            <input
                                                id="image"
                                                type="file"
                                                name="image"
                                                className="form-control bg-light px-2"
                                                onChange={(event) => {
                                                    formik.setFieldValue(
                                                        "image",
                                                        event.target.files[0]
                                                    );
                                                    formik.setFieldTouched(
                                                        "image",
                                                        true
                                                    );
                                                }}
                                            />
                                            {formik.errors.image &&
                                            formik.touched.image ? (
                                                <div className="text-bg-danger text-white text-center mt-1">
                                                    {formik.errors.image}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={formik.values.id}
                                        onChange={formik.handleChange("id")}
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

export default Product;

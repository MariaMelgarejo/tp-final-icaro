import { useEffect, useRef } from "react";
import { Table, Tag } from "antd";
import useEcommerceStore from "../../stores/ecommerceStore";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import CreateModal from "../../components/Modals/Category/CreateModal";
import EditModal from "../../components/Modals/Category/EditModal";
import DeleteModal from "../../components/Modals/Category/DeleteModal";
import "./styles.css";

const Category = () => {
    const { categories, getCategories } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
        };
    });

    const cat = useRef(categories);

    useEffect(() => {
        getCategories();
    }, [cat.current]);

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nombre", dataIndex: "title", key: "title" },
        {
            title: "Estado",
            dataIndex: "active",
            key: "active",
            render: (_, { active }) => (
                <>
                    <Tag
                        className="text-center"
                        color={active ? "green" : "red"}
                        style={{ width: "120px" }}
                    >
                        {active ? "Activado" : "Desactivado"}
                    </Tag>
                </>
            ),
        },
        { title: "Acciones", dataIndex: "actions", key: "actions" },
    ];

    const handleEdit = (e, category) => {
        e.preventDefault();
        console.log(category);
    };
    const handleDelete = (e, category) => {
        e.preventDefault();
        console.log(category);
    };

    const dataSource = [];
    categories.forEach((category) => {
        dataSource.push({
            key: category.id,
            title: category.title,
            active: category.active,
            actions: (
                <div className="td-actions d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-warning btn-round"
                        onClick={(e) => handleEdit(e, category)}
                    >
                        <AiOutlineEdit />
                    </button>
                    <button
                        className="btn btn-danger btn-round"
                        onClick={(e) => handleDelete(e, category)}
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
                            <CreateModal />
                            <EditModal />
                            <DeleteModal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;

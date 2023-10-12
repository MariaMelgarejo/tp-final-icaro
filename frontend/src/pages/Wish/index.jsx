import { useEffect, useRef } from "react";
import { notification } from "antd";
import { useFormik } from "formik";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";

const Wish = () => {
    const auth = JSON.parse(localStorage.getItem("authStore"));

    const { wishes, getWishes, updateWishes, editSuccess, setEditSuccess } =
        useEcommerceStore((state) => {
            return {
                wishes: state.wishes,
                getWishes: state.getWishes,
                updateWishes: state.updateWishes,
                editSuccess: state.editSuccess,
                setEditSuccess: state.setEditSuccess,
            };
        });

    const wishRef = useRef(wishes);

    useEffect(() => {
        getWishes();
    }, [wishRef.current, editSuccess]);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        if (editSuccess) {
            openNotificationWithIcon("error", "Favorito eliminado!");
        }
        return () => {
            setEditSuccess(false);
        };
    }, [editSuccess]);

    const handleDelete = (id) => {
        formik.setValues({
            productId: id,
        });
        formik.handleSubmit();
    };

    const handleAddCart = (e, id) => {
        console.log(id);
    };

    const formik = useFormik({
        initialValues: {
            productId: "",
        },
        onSubmit: (values) => {
            updateWishes(values);
            formik.resetForm();
        },
    });

    return (
        <>
            <Meta title="Favoritos" />
            <Breadcrumb title="Favoritos" />
            <div className="container py-5">
                <div className="row">
                    {contextHolder}
                    {wishes.length > 0 ? (
                        wishes.map((wish) => (
                            <div key={wish?.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <img
                                        src={wish?.Product?.image}
                                        className="card-img-top rounded"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {wish?.Product?.title}
                                        </h5>
                                        <p className="card-text">
                                            $ {wish?.Product?.price}
                                        </p>
                                        <hr className="dark horizontal my-0" />
                                        <form
                                            role="form"
                                            className="text-start"
                                        >
                                            <input
                                                type="hidden"
                                                name="productId"
                                                value={formik.values.productId}
                                                onChange={formik.handleChange(
                                                    "productId"
                                                )}
                                            />
                                        </form>
                                        <div className="card-footer d-flex justify-content-between align-items-center">
                                            <button
                                                className="btn btn-danger"
                                                type="submit"
                                                onClick={() =>
                                                    handleDelete(
                                                        wish?.productId
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    handleAddCart(
                                                        wish?.productId
                                                    )
                                                }
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center alert alert-secondary">
                            <h3 className="text-white">No posee favoritos</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Wish;

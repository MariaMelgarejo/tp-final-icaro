import React from "react";
import useEcommerceStore from "../../../stores/ecommerceStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateModal = () => {
    const { createCategory } = useEcommerceStore((state) => {
        return {
            createCategory: state.createCategory,
        };
    });

    let schema = Yup.object().shape({
        title: Yup.string().required("El nombre es requerido"),
    });

    let modalCategory = bootstrap.Modal.getInstance(
        document.getElementById("newCategory")
    );

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            createCategory(values);
            formik.resetForm();
            modalCategory.hide();
        },
    });
    return (
        <div
            className="modal fade"
            id="newCategory"
            tabIndex={-1}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h5 className="modal-title text-white">
                            Crear Categoría
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <form role="form" onSubmit={formik.handleSubmit}>
                        <div className="modal-body">
                            <input
                                type="text"
                                name="title"
                                label="Nombre"
                                className="form-control bg-light px-2"
                                value={formik.values.title}
                                onChange={formik.handleChange("title")}
                            />
                            {formik.errors.title && formik.touched.title ? (
                                <div>{formik.errors.title}</div>
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button type="submit" className="btn btn-info">
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;

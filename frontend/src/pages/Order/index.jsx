import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useEcommerceStore from "../../stores/ecommerceStore";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";

const Order = () => {
    const { id } = useParams();
    const { order, getOrder } = useEcommerceStore((state) => {
        return {
            getOrder: state.getOrder,
        };
    });

    const orderRef = useRef(order);
    const [productsOrder, setProductsOrder] = useState([]);

    useEffect(() => {
        getOrder(id);
    }, [orderRef.current]);

    useEffect(() => {
        const newOrder = useEcommerceStore.getState().order;
        console.log("order", newOrder);

        // if (order.length !== 0) {
        //     setProductsOrder(JSON.parse(order.products));
        // }
    }, [order]);

    // console.log("order", order);
    // console.log("productsOrder", productsOrder);

    return (
        <>
            <Meta title={`Orden N° ${id}`} />
            <Breadcrumb title={`Orden N° ${id}`} />
            <div className="container py-5">
                {/* {contextHolder} */}
                <div className="row">
                    <div className="col-12">
                        {productsOrder.map((item) => (
                            <div key={item.id} className="row mb-3">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2">
                                                <img
                                                    src={WatchImg}
                                                    className="img-fluid w-60"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="col-md-6 d-flex flex-column ">
                                                <h5>{item.title}</h5>
                                                <p>$ {item.price}</p>
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-between align-items-center">
                                                <div className="d-flex justify-content-around align-items-center">
                                                    <label
                                                        htmlFor="quantity"
                                                        className="mb-0 me-3"
                                                    >
                                                        Cantidad
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        defaultValue={
                                                            item.quantity
                                                        }
                                                        id="quantity"
                                                        min={1}
                                                        max={10}
                                                        onChange={(e) =>
                                                            handleQuantity(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                        className="form-control px-3"
                                                        style={{
                                                            width: "80px",
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-round mb-0"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <AiFillDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="row d-flex justify-content-between align-items-lg-baseline align-items-md-center">
                            <div className="col-lg-3 col-md-12 d-flex flex-column align-items-lg-start align-items-md-center">
                                <Link to="/ordenes" className="btn btn-info">
                                    Volver
                                </Link>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="d-flex flex-column align-items-lg-end align-items-md-center mt-lg-0 mt-3">
                                    {/* <h4>SubTotal: $ {order.total}</h4> */}
                                    <p>
                                        El costo de envio se calcula al momento
                                        del checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

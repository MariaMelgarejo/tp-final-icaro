import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";

import "./styles.css";

const Checkout = () => {
    return (
        <>
            <Meta title="Checkout" />
            <Breadcrumb title="Checkout" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <h4 className="title total">Información de Contacto</h4>
                        <p className="user-details total">
                            María Melgarejo (mariamelgarejo@gmail.com)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;

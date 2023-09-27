import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";

const Cart = () => {
    return (
        <>
            <Meta title="Carrito" />
            <Breadcrumb title="Carrito" />
        </>
    );
};

export default Cart;

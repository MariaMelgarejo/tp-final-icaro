import { create } from "zustand"
import { categorySlice } from "./ecommerce/categorySlice";
import { productSlice } from "./ecommerce/productSlice";
import { cartSlice } from "./ecommerce/cartSlice";
import { orderSlice } from "./ecommerce/orderSlice";
import { wishSlice } from "./ecommerce/wishSlice";
import { stateSlice } from "./ecommerce/stateSlice";

const useEcommerceStore = create((...a) => ({
    ...stateSlice(...a),
    ...categorySlice(...a),
    ...productSlice(...a),
    ...cartSlice(...a),
    ...orderSlice(...a),
    ...wishSlice(...a),
}))

export default useEcommerceStore;
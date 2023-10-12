import axios from "axios"
import { base_url } from "../../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('authStore'));

export const cartSlice = (set) => ({
    cart: [],
    cartQuantity: 0,
    setCartQuantity: (value) => set({ cartQuantity: value }),
    getCart: async () => {
        await axios.get(`${base_url}cart`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ cart: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createOrUpdateCart: async (values) => {
        await axios.post(`${base_url}cart`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    cart: res.data.cart,
                    editSuccess: true,
                    message: res.data.message
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    deleteCartItem: async (values) => {
        await axios.post(`${base_url}cart/delete-item`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    cart: res.data.cart,
                    deleteSuccess: true,
                    message: res.data.message
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    deleteCart: async (id) => {
        await axios.delete(`${base_url
            }cart`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}
                `
            }
        })
            .then(res => {
                set(state => ({
                    cart: [],
                    deleteSuccess: true,
                    message: res.data.message
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
})
import axios from "axios"
import { base_url } from "../../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('authStore'));

export const orderSlice = (set) => ({
    orders: [],
    order: [],
    getOrders: async () => {
        await axios.get(`${base_url}orders`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ orders: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getOrder: async (id) => {
        await axios.get(`${base_url}orders/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ order: res.data.order })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getOrdersByLoggedUser: async () => {
        await axios.get(`${base_url}orders/myOrders`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ orders: res.data.orders })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createOrder: async (values) => {
        await axios.post(`${base_url}orders`, values, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set(state => ({
                    createSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            })
    },
})
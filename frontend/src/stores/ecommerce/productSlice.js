import axios from "axios"
import { base_url } from "../../utils/baseUrl"

export const productSlice = (set) => ({
    products: [],
    productsByRating: [],
    product: null,
    totalProducts: null,
    setProduct: (value) => set({ product: value }),
    setProducts: (value) => set({ products: value }),
    getProducts: async () => {
        await axios.get(`${base_url}products`)
            .then(res => {
                set({ products: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getProductsByRating: async () => {
        await axios.get(`${base_url}products/rating`)
            .then(res => {
                set({ productsByRating: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getProductsWithPagination: async (values) => {
        const { page, limit } = values
        await axios.get(`${base_url}products/paginated?page=${page}&limit=${limit}`)
            .then(res => {
                set({ products: res.data.data.data, totalProducts: res.data.data.total })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getProductsByCategory: async (category) => {
        await axios.get(`${base_url}products/categories/${category}`)
            .then(res => {
                set({ products: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getProduct: async (id) => {
        await axios.get(`${base_url}products/${id}`)
            .then(res => {
                set({ product: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
})
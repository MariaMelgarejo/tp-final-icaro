import axios from "axios"
import { base_url } from "../../utils/baseUrl"

export const categorySlice = (set) => ({
    categories: [],
    category: null,
    getCategories: async () => {
        await axios.get(`${base_url}categories`)
            .then(res => {
                set({ categories: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getCategory: async (id) => {
        await axios.get(`${base_url}categories/${id}`)
            .then(res => {
                set({ category: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
})
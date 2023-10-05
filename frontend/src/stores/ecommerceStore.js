import axios from "axios"
import { create } from "zustand"
import { base_url } from "../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('authStore'));

const useEcommerceStore = create((set, get) => ({
    categories: [],
    category: null,
    products: [],
    productsByRating: [],
    product: null,
    cart: [],
    cartQuantity: 0,
    orders: [],
    wishes: [],
    createSuccess: false,
    editSuccess: false,
    deleteSuccess: false,
    message: null,
    setMessage: (value) => set({ message: value }),
    setCartQuantity: (value) => set({ cartQuantity: value }),
    setCreateSuccess: (value) => set({ createSuccess: value }),
    setEditSuccess: (value) => set({ editSuccess: value }),
    setDeleteSuccess: (value) => set({ deleteSuccess: value }),
    setCategory: (value) => set({ category: value }),
    setProduct: (value) => set({ product: value }),
    // Categories
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
    createCategory: async (values) => {
        await axios.post(`${base_url}categories`, values, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set(state => ({
                    categories: [...state.categories, res.data.category
                    ],
                    createSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateCategory: async (values) => {
        await axios.put(`${base_url
            }categories/${values.id}`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    categories: state.categories.map(category => {
                        if (category.id === res.data.category.id) {
                            return res.data.category
                        }
                        return category
                    }),
                    editSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    deleteCategory: async (id) => {
        await axios.delete(`${base_url
            }categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}
                `
            }
        })
            .then(res => {
                set(state => ({
                    categories: state.categories.filter(category => category.id !== id),
                    deleteSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    // Products
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
    getProduct: async (id) => {
        await axios.get(`${base_url}products/${id}`)
            .then(res => {
                set({ product: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createProduct: async (values) => {
        await axios.post(`${base_url}products`, values, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set(state => ({
                    products: [...state.products, res.data.product
                    ],
                    createSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateProduct: async (values) => {
        await axios.put(`${base_url
            }products/${values.id}`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    products: state.products.map(product => {
                        if (product.id === res.data.product.id) {
                            return res.data.product
                        }
                        return product
                    }),
                    editSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    deleteProduct: async (id) => {
        await axios.delete(`${base_url
            }products/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}
                `
            }
        })
            .then(res => {
                set(state => ({
                    products: state.products.filter(product => product.id !== id),
                    deleteSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    // Orders
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
    // Wishes
    getWishes: async () => {
        await axios.get(`${base_url}wishes`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ wishes: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateWishes: async (values) => {
        await axios.put(`${base_url
            }wishes`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    wishes: state.wishes.map(wish => {
                        if (wish.id === res.data.wish.id) {
                            return res.data.wish
                        }
                        return wish
                    }),
                    editSuccess: true,
                    message: res.data.message
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    // Cart
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
}))

export default useEcommerceStore;
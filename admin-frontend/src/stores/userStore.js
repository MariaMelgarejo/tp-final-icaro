import axios from "axios"
import { create } from "zustand"
import { base_url } from "../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('auth'));

const useUserStore = create(set => ({
    users: [],
    user: null,
    clients: [],
    admins: [],
    admin: null,
    setAdmin: (value) => set({ admin: value }),
    createSuccess: false,
    editSuccess: false,
    deleteSuccess: false,
    setCreateSuccess: (value) => set({ createSuccess: value }),
    setEditSuccess: (value) => set({ editSuccess: value }),
    setDeleteSuccess: (value) => set({ deleteSuccess: value }),
    getUsers: async () => {
        await axios.get(`${base_url}users`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ users: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getClients: async () => {
        await axios.get(`${base_url}users/clients`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ clients: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getAdmins: async () => {
        await axios.get(`${base_url}users/admins`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ admins: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createAdmin: async (values) => {
        await axios.post(`${base_url}register`, values)
            .then(res => {
                set(state => ({
                    admins: [...state.admins, res.data.user
                    ],
                    createSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateUser: async (values) => {
        await axios.put(`${base_url
            }users/${values.id}`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    clients: state.clients.map(client => {
                        if (client.id === res.data.user.id) {
                            return res.data.user
                        }
                        return client
                    }),
                    admins: state.admins.map(admin => {
                        if (admin.id === res.data.user.id) {
                            return res.data.user
                        }
                        return admin
                    }),
                    editSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    deleteUser: async (id) => {
        await axios.delete(`${base_url
            }users/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    clients: state.clients.filter(client => client.id !== id),
                    admins: state.admins.filter(admin => admin.id !== id),
                    deleteSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    activateUser: async (values) => {
        await axios.put(`${base_url
            }users/activate/${values.id}`, values,
            {
                headers: {
                    'Authorization': `Bearer ${auth.state.token}
                    `
                }
            })
            .then(res => {
                set(state => ({
                    clients: state.clients.map(client => {
                        if (client.id === res.data.user.id) {
                            return res.data.user
                        }
                        return client
                    }),
                    admins: state.admins.map(admin => {
                        if (admin.id === res.data.user.id) {
                            return res.data.user
                        }
                        return admin
                    }),
                    editSuccess: true
                }))
            })
            .catch(err => {
                console.log(err)
            }
            )
    },
    getAdmins: async () => {
        await axios.get(`${base_url}users/admins`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ admins: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getUser: async (id) => {
        await axios.get(`${base_url}users/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.state.token}`
            }
        })
            .then(res => {
                set({ user: res.data }
                )
            })
            .catch(err => {
                console.log(err)
            })
    }
}))

export default useUserStore
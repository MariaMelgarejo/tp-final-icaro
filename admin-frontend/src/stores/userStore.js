import axios from "axios"
import { create } from "zustand"
import { base_url } from "../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('auth'));

const useUserStore = create(set => ({
    users: null,
    user: null,
    clients: null,
    admins: null,
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
    getUser: (id) => {
        axios.get(`${base_url}users/${id}`, {
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
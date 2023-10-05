import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { base_url } from "../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('authStore'));

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            message: null,
            isLoggedIn: false,
            isError: null,
            isSuccess: null,
            token: null,
            register: async (values) => {
                await axios.post(`${base_url}register`, values)
                    .then(res => {
                        set({
                            isLoggedIn: true,
                            user: res.data.user,
                            token: res.data.token,
                            message: res.data.message,
                            isError: false,
                            isSuccess: true
                        })
                    })
                    .catch(err => {
                        set({
                            message: err.response.data.message,
                            isError: true
                        })
                    })
            },
            login: async (values) => {
                await axios.post(`${base_url}login`, values)
                    .then(res => {
                        set({
                            isLoggedIn: true,
                            user: res.data.user,
                            token: res.data.token,
                            message: res.data.message,
                            isError: false,
                            isSuccess: true
                        })
                    })
                    .catch(err => {
                        set({
                            message: err.response.data.message,
                            isError: true
                        })
                    })

            },
            logout: () => {
                set({
                    isLoggedIn: false,
                    user: null,
                    token: null,
                    message: null,
                    isError: null,
                    isSuccess: null,
                })
            },
            getLoggedUser: async () => {
                await axios.get(`${base_url}users/logged`, {
                    headers: {
                        'Authorization': `Bearer ${auth.state.token}`
                    }
                })
                    .then(res => {
                        set({ user: res.data })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        }),
        {
            name: 'authStore',
            storage: createJSONStorage(() => localStorage)
        }
    ))

export default useAuthStore
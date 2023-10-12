import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { base_url } from "../utils/baseUrl"

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            message: null,
            isLoggedIn: false,
            isError: null,
            isSuccess: null,
            token: null,
            login: async (values) => {
                await axios.post(`${base_url}admin-login`, values)
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
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => localStorage)
        }
    ))

export default useAuthStore
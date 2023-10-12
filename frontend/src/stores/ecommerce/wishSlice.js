import axios from "axios"
import { base_url } from "../../utils/baseUrl"

const auth = JSON.parse(localStorage.getItem('authStore'));

export const wishSlice = (set) => ({
    wishes: [],
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
})
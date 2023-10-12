export const stateSlice = (set) => ({
    createSuccess: false,
    editSuccess: false,
    deleteSuccess: false,
    message: null,
    setMessage: (value) => set({ message: value }),
    setCreateSuccess: (value) => set({ createSuccess: value }),
    setEditSuccess: (value) => set({ editSuccess: value }),
    setDeleteSuccess: (value) => set({ deleteSuccess: value }),
})
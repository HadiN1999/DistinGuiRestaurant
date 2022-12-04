import { api } from "./mainApi";

export const getCategories = async (data) => {
    return await api.get("/fetchCategory").then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const createCategories = async (data) => {
    return await api.post("/createCategory",data).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const createItem = async (data) => {
    return await api.post(`/createItem/${data.category}`,data).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const deleteCategory = async (id) => {
    return await api.delete(`/deleteCategory/${id}`).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const deleteItem = async (id,itemId) => {
    return await api.delete(`/deleteItem/${id}/${itemId}`).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const updateCategory = async (id, payload) => {
    return await api.put(`/updateCategory/${id}`, payload).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};

export const updateItem = async (id, payload) => {
    return await api.put(`/updateItem/${id}`, payload).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};


export const getItems = async (id) => {
    return await api.get(`/fetchCategory/${id}`).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};
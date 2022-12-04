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
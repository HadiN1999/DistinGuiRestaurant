import { api } from "./mainApi";

export const login = async (data) => {
    return await api.post("/login", data).then(({data}) => {
        return data;
    }).catch(err=> console.log(err));
};
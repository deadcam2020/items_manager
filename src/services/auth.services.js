import { Api } from "./api.js";


export const loginAction = async ({ email, password }) => {
    const { data } = await Api.post('/api/login/', { email, password });
  
    const { token, ...user } = data;

    return { token, user };

};


export const signUpAction = async ({ name, email, password }) => {
    const { data } = await Api.post('/api/users/', { name, email, password });
    return data;

};


export const updateUserAction = async (userData) => {
    // El interceptor de la instancia 'Api' ya añade el Token automáticamente
    const { data } = await Api.put('/api/users/update', userData);
    return data;

};


export const createReportAction = async (finalReport) => {
    const { data } = await Api.post('/api/users/create_report', finalReport);
    return data;

};
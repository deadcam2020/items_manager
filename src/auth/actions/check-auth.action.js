import { Api } from "@/services/api.js";


export const checkAuthAction = async () => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const { data } = await Api.get('/api/auth/check-status')
      //  console.log(data);
        
        localStorage.setItem('token', data.token);

        return { user: data.user, token: data.token };

    } catch (error) {
        localStorage.removeItem('token')
        throw new Error('token expired or not valid')
    }
}
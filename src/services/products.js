
const BASE_URL = import.meta.env.VITE_API_URL


export const fetchUserProductsAction = async (uid) => {

    const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}/api/products/userProducts/${uid}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    return await response.json();
};


export const fetchGetProductAction = async (id) => {

    const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}/api/products/product/${id}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    return await response.json();
};
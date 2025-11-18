
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
      throw new Error('Error en fetchGetProductAction');
    }

    return response.json();
};

export const deleteProductAction = async (id) => {

    const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}/api/products/deleteProduct/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error en deleteProductAction');
    }

    return await response.json();
};


export const updateProductAction = async ({ id, productData, oldImageId }) => {
  const token = localStorage.getItem('token');

  const body = {
    ...productData,
    oldImageId   // <-- aquí va el public_id anterior
  };

  try {
    const res = await fetch(`${BASE_URL}/api/products/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al actualizar producto');
    }

    return await res.json();
  } catch (error) {
    console.error('Error en updateProductAction:', error);
    throw error;
  }
};


export const fetchGetAllProductsAction = async () => {


    const response = await fetch(`${BASE_URL}/api/products/products`, {
      method: 'GET'
   });

    if (!response.ok) {
      throw new Error('Error en fetchGetProductAction');
    }

    return await response.json();
};



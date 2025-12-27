
const BASE_URL = import.meta.env.VITE_API_URL


export const createProductAction = async (finalProduct) => {

  const { title, description, price, category, imageurl, imageid, seller, stock, status } = finalProduct
  const token = localStorage.getItem('token');


  try {

    const res = await fetch(`${BASE_URL}/api/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, price, category, imageurl, imageid, seller, stock, status }),
    })

    if (!res) throw new Error;


    const data = await res.json()

    return data

  } catch (error) {
    console.log(error);

  }


};


export const createSaleAction = async (saleData) => {

  const token = localStorage.getItem('token');
  
  try {

    const res = await fetch(`${BASE_URL}/api/products/sale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    })

    if (!res) throw new Error;


    const data = await res.json()

    return data

  } catch (error) {
    console.log(error);

  }


};


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
  console.log("action: ", productData.stock);

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


export const fetchGetAllProductsAction = async (id) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/products/products?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error en fetchGetProductAction');
  }

  return await response.json();
};


export const fetchUserPurchasedProductsAction = async (buyer_id) => {

  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/users/myPurchases/${buyer_id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Credenciales inválidas');
  }

  return await response.json();
};

export const searchproductsAction = async ({ query, min, max, status }) => {

  const token = localStorage.getItem('token');
  console.log("status", status);

  const response = await fetch(
    `${BASE_URL}/api/products/search?query=${query}&min=${min}&max=${max}&status=${status}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }

  return await response.json();
};

export const addToCartAction = async ({ id, uid, quantity }) => {

  const token = localStorage.getItem('token');

  const response = await fetch(
    `${BASE_URL}/api/products/saveToCart`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, uid, quantity})
    }
  );

  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }

  return await response.json();
};


export const getCartItems = async () => {

  
  const token = localStorage.getItem('token');

  const response = await fetch(
    `${BASE_URL}/api/products/getCart`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      
    }
  );

  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }

  return await response.json();
};


export const deleteProductFromCartACtion = async (id) => {

  
  const token = localStorage.getItem('token');

  const response = await fetch(
    `${BASE_URL}/api/products/deleteFromCart/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      
    }
  );

  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }

  return await response.json();
};
const BASE_URL = import.meta.env.VITE_API_URL


export async function uploadProfileImageAction({ file, oldProfileImageId }) {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('oldProfileImageId', oldProfileImageId || "");

    const token = localStorage.getItem('token');

    const body = {
      ...formData,
      oldProfileImageId,
    }

    const res = await fetch(`${BASE_URL}/api/upload/profileImage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al subir la imagen');
    }

    const resultJson = await res.json();
    return resultJson;
  } catch (error) {
    console.error('Error en uploadProfileImageAction:', error);
    throw error;
  }
}


export async function uploadProductImageAction(file) {
  try {
    const formData = new FormData();
    formData.append('productImage', file); // 👈 usa el mismo nombre que en el backend

    const token = localStorage.getItem('token');


    const res = await fetch(`${BASE_URL}/api/upload/productImage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al subir la imagen');
    }

    const resultJson = await res.json();
    return resultJson;
  } catch (error) {
    console.error('Error en uploadProductImageAction:', error);
    throw error;
  }
}


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
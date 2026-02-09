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


export async function uploadReportImageAction(file) {
  try {
    const formData = new FormData();
    formData.append('reportImage', file); 

    const token = localStorage.getItem('token');


    const res = await fetch(`${BASE_URL}/api/upload/reportImage`, {
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


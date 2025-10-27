const BASE_URL = import.meta.env.VITE_API_URL


export const uploadImageAction = async (image) => {
  try {
    const response = await fetch(`${BASE_URL}/api/upload/postImage`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();

    // Extraemos el token y el resto de los datos del usuario
    const { token, ...user } = data;
    //console.log('data login:', token , user);

    return { token, user };

  } catch (error) {
    console.error('Error en loginAction:', error);
    throw error;
  }
};


const BASE_URL = import.meta.env.VITE_API_URL


export const loginAction = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login/`, {
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



export const signUpAction = async ({ name, email, password }) => {

  try {

    const res = await fetch(`${BASE_URL}/api/users/`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res) throw new Error;


    const data = await res.json()

    return data

  } catch (error) {
    console.log(error);

  }


};

export const updateUserAction = async (userData) => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${BASE_URL}/api/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    // Validar respuesta del servidor
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al actualizar usuario');
    }

    const updatedUser = await res.json();
    return updatedUser;
  } catch (error) {
    console.error(' Error en updateUserAction:', error.message);
    throw error;
  }



};





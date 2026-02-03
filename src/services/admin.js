const BASE_URL = import.meta.env.VITE_API_URL


export const getUsersgeneralInfoAction = async () => {

  const token = localStorage.getItem('token');


  try {

    const res = await fetch(`${BASE_URL}/api/admin/users_info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!res) throw new Error;
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);

  }
};

export const countProductsByCategory = async () => {

  const token = localStorage.getItem('token');


  try {

    const res = await fetch(`${BASE_URL}/api/admin/products_by_category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!res) throw new Error;


    const data = await res.json()

    return data

  } catch (error) {
    console.log(error);

  }


};

export const dashboardStatsAction = async () => {

  const token = localStorage.getItem('token');


  try {

    const res = await fetch(`${BASE_URL}/api/admin/dashboard_stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!res) throw new Error;


    const data = await res.json()

    return data

  } catch (error) {
    console.log(error);

  }


};